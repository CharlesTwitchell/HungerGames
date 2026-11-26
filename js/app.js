/* Odds in Your Favor — practice app.
 * Courses register themselves in window.STATS.courses (see js/courses/*.js).
 * Problem schema:
 *   { id, topic, level: 1|2|3, title, prompt (HTML + LaTeX),
 *     answers?: [{ label, value, tol? }],      // numeric parts, checked within tolerance
 *     choices?: [html...], correct?: index,    // multiple choice
 *     hint?, solution }
 */
(function () {
  'use strict';

  const COURSES = (window.STATS && window.STATS.courses ? window.STATS.courses : [])
    .slice().sort((a, b) => a.order - b.order);
  const byId = Object.fromEntries(COURSES.map(c => [c.id, c]));
  const LEVELS = { 1: 'Intro', 2: 'Core', 3: 'Advanced' };
  const app = document.getElementById('app');

  /* ---------- storage (best-effort) ---------- */
  const KEY = 'odds-progress-v1';
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { progress = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) { /* ignore */ } }
  const isDone = (pid) => !!progress[pid];
  const pid = (course, p) => course.id + ':' + p.id;

  /* ---------- theme ---------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem('odds-theme'); if (t) root.dataset.theme = t; } catch (e) { /* ignore */ }
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('odds-theme', root.dataset.theme); } catch (e) { /* ignore */ }
  });
  document.getElementById('reset-progress').addEventListener('click', () => {
    if (confirm('Clear all saved progress in this browser?')) { progress = {}; save(); route(); }
  });

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function typeset(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false
      });
    }
  }
  function courseStats(c) {
    const done = c.problems.filter(p => isDone(pid(c, p))).length;
    return { done, total: c.problems.length, pct: c.problems.length ? Math.round(100 * done / c.problems.length) : 0 };
  }
  function bar(s) {
    return `<div class="bar"><i style="width:${s.pct}%"></i></div><div class="bar-label">${s.done} / ${s.total} solved</div>`;
  }

  /* Parse "0.25", "1/4", "25%", "-3.2e-2". Percent is converted to a proportion when the target is a proportion. */
  function parseAnswer(raw, target) {
    let s = String(raw).trim().replace(/,/g, '').replace(/\s+/g, '');
    if (!s) return NaN;
    let pct = false;
    if (s.endsWith('%')) { pct = true; s = s.slice(0, -1); }
    let v;
    const frac = s.match(/^(-?[\d.]+(?:e-?\d+)?)\/(-?[\d.]+(?:e-?\d+)?)$/i);
    if (frac) v = parseFloat(frac[1]) / parseFloat(frac[2]);
    else if (/^-?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) v = parseFloat(s);
    else return NaN;
    if (pct && Math.abs(target) <= 1) v /= 100;
    return v;
  }
  function close(v, a) {
    const tol = a.tol != null ? a.tol : Math.max(0.01 * Math.abs(a.value), 1e-4);
    return Math.abs(v - a.value) <= tol + 1e-12;
  }

  /* ---------- views ---------- */
  function home() {
    const minor = COURSES.filter(c => c.section === 'minor');
    const history = COURSES.filter(c => c.section === 'history');
    const degree = COURSES.filter(c => c.section === 'degree');
    const all = COURSES.reduce((s, c) => { const k = courseStats(c); s.done += k.done; s.total += k.total; return s; }, { done: 0, total: 0 });

    const featureHtml = (list) => list.map(c => `
      <div class="feature">
        <div class="card-code" style="color:var(--accent);font-size:.8rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase">${esc(c.code)}</div>
        <h3><a href="#/c/${c.id}" style="color:inherit;text-decoration:none">${esc(c.title)}</a></h3>
        <p>${c.description}</p>
        <div class="chip-list">${c.topics.map(t =>
          `<a class="chip" href="#/c/${c.id}?topic=${t.id}">${esc(t.title)}<span class="n">${c.problems.filter(p => p.topic === t.id).length}</span></a>`).join('')}
        </div>
        <div style="margin-top:14px;max-width:360px">${bar(courseStats(c))}</div>
      </div>`).join('');

    const years = [...new Set(degree.map(c => c.year))];
    const degreeHtml = years.map(y => `
      <div class="year-label">${esc(y)}</div>
      <div class="grid">${degree.filter(c => c.year === y).map(c => `
        <a class="card" href="#/c/${c.id}">
          <div class="code">${esc(c.code)}</div>
          <h3>${esc(c.title)}</h3>
          <p>${c.description}</p>
          ${bar(courseStats(c))}
        </a>`).join('')}
      </div>`).join('');

    app.innerHTML = `
      <section class="hero">
        <h1>Statistics &amp; Probability Practice</h1>
        <p>Worked problems from a stats minor through a full undergraduate statistics degree. Each problem has a hint and a full solution, and you can check your answers instantly.</p>
        <p class="tagline">May the odds be ever in your favor.</p>
        <div class="stats-row">
          <div class="stat"><b>${all.total}</b><span>problems</span></div>
          <div class="stat"><b>${COURSES.length}</b><span>courses</span></div>
          <div class="stat"><b>${all.done}</b><span>solved by you</span></div>
        </div>
      </section>
      <h2 id="minor">Stats Minor Essentials</h2>
      ${featureHtml(minor)}
      <h2 id="degree">Statistics Degree Courses</h2>
      <p style="color:var(--muted);margin:0">Roughly in the order a statistics major takes them.</p>
      ${degreeHtml}
      <h2 id="history">History of Stats &amp; Probability</h2>
      ${featureHtml(history)}`;
    typeset(app);
  }

  function course(c, params) {
    const topic = params.get('topic') || 'all';
    const level = params.get('level') || 'all';
    const hideSolved = params.get('hide') === '1';
    const shuffle = params.get('shuffle');

    let list = c.problems.map((p, i) => ({ p, n: i + 1 }));
    if (topic !== 'all') list = list.filter(x => x.p.topic === topic);
    if (level !== 'all') list = list.filter(x => String(x.p.level) === level);
    if (hideSolved) list = list.filter(x => !isDone(pid(c, x.p)));
    if (shuffle) {
      let seed = parseInt(shuffle, 10) || 1;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
    }

    const link = (changes) => {
      const q = new URLSearchParams(params);
      Object.entries(changes).forEach(([k, v]) => (v == null || v === 'all' || v === '' ? q.delete(k) : q.set(k, v)));
      const s = q.toString();
      return `#/c/${c.id}${s ? '?' + s : ''}`;
    };
    const topicChips = [{ id: 'all', title: 'All topics' }, ...c.topics].map(t => {
      const n = t.id === 'all' ? c.problems.length : c.problems.filter(p => p.topic === t.id).length;
      return `<a class="chip ${topic === t.id ? 'active' : ''}" href="${link({ topic: t.id })}">${esc(t.title)}<span class="n">${n}</span></a>`;
    }).join('');
    const levelChips = [['all', 'Any level'], ['1', 'Intro'], ['2', 'Core'], ['3', 'Advanced']].map(([v, l]) =>
      `<a class="chip ${level === v ? 'active' : ''}" href="${link({ level: v })}">${l}</a>`).join('');
    const topicTitle = Object.fromEntries(c.topics.map(t => [t.id, t.title]));

    app.innerHTML = `
      <div class="crumbs"><a href="#/">Home</a> / ${esc(c.code)}</div>
      <div class="course-head">
        <h1>${esc(c.title)}</h1>
        <p>${c.description}</p>
        <div style="max-width:360px">${bar(courseStats(c))}</div>
      </div>
      <div class="toolbar">
        <div class="toolbar-row"><span class="label">Topic</span>${topicChips}</div>
        <div class="toolbar-row"><span class="label">Level</span>${levelChips}
          <span class="spacer"></span>
          <a class="chip ${hideSolved ? 'active' : ''}" href="${link({ hide: hideSolved ? null : '1' })}">Hide solved</a>
          <a class="chip ${shuffle ? 'active' : ''}" href="${link({ shuffle: shuffle ? null : String(1 + Math.floor(Math.random() * 1e6)) })}">Shuffle</a>
        </div>
      </div>
      <div id="plist">${list.length ? '' : '<p class="empty">No problems match these filters.</p>'}</div>`;

    const plist = document.getElementById('plist');
    list.forEach(({ p, n }) => plist.appendChild(problemEl(c, p, n, topicTitle[p.topic] || p.topic)));
    typeset(app);
  }

  function problemEl(c, p, n, topicName) {
    const id = pid(c, p);
    const el = document.createElement('article');
    el.className = 'problem' + (isDone(id) ? ' solved' : '');
    el.id = 'p-' + p.id;

    let answerHtml = '';
    if (p.answers && p.answers.length) {
      answerHtml = `<div class="answers">${p.answers.map((a, i) => `
        <div class="ans-row">
          <label for="${esc(p.id)}-a${i}">${a.label}</label>
          <input id="${esc(p.id)}-a${i}" inputmode="decimal" autocomplete="off" placeholder="e.g. 0.25 or 1/4">
        </div>`).join('')}
        <div class="ans-row"><button class="btn primary js-check" type="button">Check</button><span class="feedback" aria-live="polite"></span></div>
      </div>`;
    } else if (p.choices) {
      answerHtml = `<div class="choices">${p.choices.map((ch, i) => `
        <label class="choice"><input type="radio" name="${esc(p.id)}-mc" value="${i}"><span>${ch}</span></label>`).join('')}
        <div class="ans-row"><button class="btn primary js-check" type="button">Check</button><span class="feedback" aria-live="polite"></span></div>
      </div>`;
    }

    el.innerHTML = `
      <div class="p-head">
        <span class="p-num">#${n}</span>
        <h3 class="p-title">${p.title}</h3>
        <span class="tag">${esc(topicName)}</span>
        <span class="tag l${p.level}">${LEVELS[p.level] || ''}</span>
        <span class="tag done js-done-tag" ${isDone(id) ? '' : 'hidden'}>✓ Solved</span>
      </div>
      <div class="prompt">${p.prompt}</div>
      ${answerHtml}
      <div class="p-actions">
        ${p.hint ? '<button class="btn js-hint" type="button">Show hint</button>' : ''}
        <button class="btn js-sol" type="button">Show solution</button>
        <button class="btn js-mark" type="button">${isDone(id) ? 'Mark unsolved' : 'Mark solved'}</button>
      </div>
      ${p.hint ? `<div class="reveal hint" hidden><h4>Hint</h4>${p.hint}</div>` : ''}
      <div class="reveal solution" hidden><h4>Solution</h4>${p.solution}</div>`;

    const setDone = (v) => {
      if (v) progress[id] = Date.now(); else delete progress[id];
      save();
      el.classList.toggle('solved', v);
      el.querySelector('.js-done-tag').hidden = !v;
      el.querySelector('.js-mark').textContent = v ? 'Mark unsolved' : 'Mark solved';
      const head = document.querySelector('.course-head > div[style]');
      if (head) head.innerHTML = bar(courseStats(c));
    };
    const toggle = (btn, sel, show, hide) => {
      const box = el.querySelector(sel);
      box.hidden = !box.hidden;
      btn.textContent = box.hidden ? show : hide;
    };

    const hintBtn = el.querySelector('.js-hint');
    if (hintBtn) hintBtn.addEventListener('click', () => toggle(hintBtn, '.reveal.hint', 'Show hint', 'Hide hint'));
    const solBtn = el.querySelector('.js-sol');
    solBtn.addEventListener('click', () => toggle(solBtn, '.reveal.solution', 'Show solution', 'Hide solution'));
    el.querySelector('.js-mark').addEventListener('click', () => setDone(!isDone(id)));

    const checkBtn = el.querySelector('.js-check');
    if (checkBtn) {
      const fb = el.querySelector('.feedback');
      const check = () => {
        let allOk = true;
        if (p.answers) {
          p.answers.forEach((a, i) => {
            const inp = el.querySelector(`#${CSS.escape(p.id)}-a${i}`);
            const v = parseAnswer(inp.value, a.value);
            const ok = !isNaN(v) && close(v, a);
            inp.classList.toggle('ok', ok);
            inp.classList.toggle('no', !ok && inp.value.trim() !== '');
            if (!ok) allOk = false;
          });
          fb.textContent = allOk ? 'Correct!' : (p.answers.length > 1 ? 'Not all parts are right yet.' : 'Not quite. Try again.');
        } else {
          const sel = el.querySelector(`input[name="${CSS.escape(p.id)}-mc"]:checked`);
          el.querySelectorAll('.choice').forEach(ch => ch.classList.remove('ok', 'no'));
          if (!sel) { fb.textContent = 'Pick an option first.'; fb.className = 'feedback'; return; }
          allOk = Number(sel.value) === p.correct;
          sel.closest('.choice').classList.add(allOk ? 'ok' : 'no');
          fb.textContent = allOk ? 'Correct!' : 'Not quite. Try again.';
        }
        fb.className = 'feedback ' + (allOk ? 'ok' : 'no');
        if (allOk && !isDone(id)) setDone(true);
      };
      checkBtn.addEventListener('click', check);
      el.querySelectorAll('.ans-row input').forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); }));
    }
    return el;
  }

  /* ---------- routing ---------- */
  function route() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const m = path.match(/^\/c\/([\w-]+)/);
    if (m && byId[m[1]]) {
      course(byId[m[1]], new URLSearchParams(qs || ''));
      window.scrollTo(0, 0);
      document.title = byId[m[1]].title + ' — Odds in Your Favor';
    } else {
      home();
      document.title = 'Odds in Your Favor — Statistics & Probability Practice';
      const anchor = path.match(/^\/#?(\w+)$/);
      const target = anchor && document.getElementById(anchor[1]);
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }
  window.addEventListener('hashchange', route);
  // KaTeX loads with defer; re-typeset once it is available.
  window.addEventListener('load', () => typeset(app));
  route();
})();
