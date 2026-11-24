(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'categorical',
    order: 50,
    section: 'degree',
    year: 'Year 3 — Core Methods',
    code: 'STAT 350',
    title: 'Categorical Data Analysis',
    description: 'Contingency tables, relative risk and odds ratios, exact and matched-pairs tests, likelihood-ratio statistics, and Poisson regression.',
    topics: [
      { id: 'measures', title: 'RR & odds ratios' },
      { id: 'tests', title: 'Table tests' },
      { id: 'paradox', title: "Simpson's paradox" },
      { id: 'glm', title: 'Count models' }
    ],
    problems: [
      {
        id: 'cd1', topic: 'measures', level: 1, title: 'Relative risk and odds ratio',
        prompt: r`<table><tr><th></th><th>Disease</th><th>No disease</th></tr><tr><th>Exposed</th><td>30</td><td>70</td></tr><tr><th>Unexposed</th><td>10</td><td>90</td></tr></table><p>Compute the relative risk and the odds ratio.</p>`,
        answers: [{ label: 'RR', value: 3 }, { label: 'OR', value: 3.857143 }],
        solution: r`\[ RR = \frac{30/100}{10/100} = 3,\qquad OR = \frac{30\cdot90}{70\cdot10} = 3.857. \]<p>The OR approximates RR only when the disease is rare.</p>`
      },
      {
        id: 'cd2', topic: 'measures', level: 2, title: 'CI for an odds ratio',
        prompt: r`<p>Using the same table, construct a 95% CI for the OR via the log scale (Woolf method).</p>`,
        answers: [{ label: 'Lower', value: 1.76658, tol: 0.01 }, { label: 'Upper', value: 8.42168, tol: 0.04 }],
        solution: r`\[ SE(\ln OR) = \sqrt{\tfrac1{30}+\tfrac1{70}+\tfrac1{10}+\tfrac1{90}} = 0.3984 \]\[ \ln 3.857 \pm 1.96(0.3984) = 1.350 \pm 0.781 \Rightarrow (e^{0.569}, e^{2.131}) = (1.77,\ 8.42). \]`
      },
      {
        id: 'cd3', topic: 'tests', level: 2, title: 'Pearson X² vs likelihood-ratio G²',
        prompt: r`<p>For the exposure table above (30, 70 / 10, 90), compute Pearson's \(X^2\) and the likelihood-ratio statistic \(G^2 = 2\sum O\ln(O/E)\).</p>`,
        answers: [{ label: 'X²', value: 12.5 }, { label: 'G²', value: 12.9715 }],
        solution: r`<p>Expected counts: 20, 80 / 20, 80.</p>\[ X^2 = \tfrac{100}{20}+\tfrac{100}{80}+\tfrac{100}{20}+\tfrac{100}{80} = 12.5 \]\[ G^2 = 2[30\ln1.5 + 70\ln0.875 + 10\ln0.5 + 90\ln1.125] \approx 12.97. \]`
      },
      {
        id: 'cd4', topic: 'tests', level: 2, title: "McNemar's test",
        prompt: r`<p>The same 100 people try two diets. 15 succeed on A only and 5 succeed on B only (the rest agree). Compute McNemar's statistic (no continuity correction).</p>`,
        answers: [{ label: 'χ²', value: 5 }],
        solution: r`<p>Only discordant pairs matter.</p>\[ \chi^2 = \frac{(b-c)^2}{b+c} = \frac{100}{20} = 5,\quad df = 1,\quad p \approx 0.025. \]`
      },
      {
        id: 'cd5', topic: 'tests', level: 3, title: "Fisher's exact test",
        prompt: r`<p>Table: [[3, 1], [1, 3]] with all margins equal to 4. Under \(H_0\) the top-left count is hypergeometric. Find the probability of the observed table and the one-sided p-value \(P(X \ge 3)\).</p>`,
        answers: [{ label: 'P(observed)', value: 16 / 70 }, { label: 'One-sided p', value: 17 / 70 }],
        solution: r`\[ P(X=3) = \frac{\binom43\binom41}{\binom84} = \frac{16}{70},\quad P(X=4) = \frac1{70},\quad p = \frac{17}{70} \approx 0.243. \]`
      },
      {
        id: 'cd6', topic: 'paradox', level: 2, title: "Simpson's paradox",
        prompt: r`<p>Treatment success rates by case severity:</p>
<table><tr><th></th><th>Mild</th><th>Severe</th><th>Overall</th></tr>
<tr><th>Treatment A</th><td>81/87</td><td>192/263</td><td>273/350</td></tr>
<tr><th>Treatment B</th><td>234/270</td><td>55/80</td><td>289/350</td></tr></table>
<p>Compute the overall success rates of A and B. Which treatment is better?</p>`,
        answers: [{ label: 'Overall A', value: 0.78 }, { label: 'Overall B', value: 0.825714 }],
        solution: r`<p>Overall: A 78%, B 82.6%. Yet A wins within <em>each</em> severity group (93% vs 87%, 73% vs 69%). A was given mostly to severe cases. Severity confounds the comparison, so <span class="final">A is better</span> once you condition on severity.</p>`
      },
      {
        id: 'cd7', topic: 'glm', level: 2, title: 'Poisson regression',
        prompt: r`<p>\(\log\mu = 0.5 + 0.2x\). Give the rate ratio for a one-unit increase in \(x\) and the expected count at \(x = 5\).</p>`,
        answers: [{ label: 'Rate ratio', value: 1.221403 }, { label: 'μ at x = 5', value: 4.481689 }],
        solution: r`\[ e^{0.2} \approx 1.221,\qquad \mu(5) = e^{1.5} \approx 4.48. \]`
      },
      {
        id: 'cd8', topic: 'glm', level: 3, title: 'Overdispersion',
        prompt: r`<p>A Poisson regression has residual deviance 180 on 60 df. What does this suggest?</p>`,
        choices: [
          'The model fits well.',
          'Overdispersion: consider quasi-Poisson or negative binomial.',
          'Underdispersion: use a binomial model.',
          'The sample size is too small.'
        ],
        correct: 1,
        solution: r`<p>Deviance/df = 3, far above 1. SEs from the Poisson model are too small, so switch to quasi-Poisson (estimate the dispersion) or a negative binomial.</p>`
      },
      {
        id: 'cd9', topic: 'tests', level: 1, title: 'Degrees of freedom for a table',
        prompt: r`<p>A chi-square test of independence on a 4 × 3 table has how many degrees of freedom?</p>`,
        answers: [{ label: 'df', value: 6, tol: 0 }],
        solution: r`<p>\((4-1)(3-1) = 6\).</p>`
      }
    ]
  });
})();
