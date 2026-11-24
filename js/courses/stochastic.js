(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'stochastic',
    order: 90,
    section: 'degree',
    year: 'Year 4 — Advanced Electives',
    code: 'STAT 440',
    title: 'Stochastic Processes',
    description: 'Markov chains, random walks, Poisson processes, queues, branching processes, and Brownian motion.',
    topics: [
      { id: 'markov', title: 'Markov chains' },
      { id: 'poisson', title: 'Poisson processes & queues' },
      { id: 'other', title: 'Branching & Brownian motion' }
    ],
    problems: [
      {
        id: 'sp1', topic: 'markov', level: 1, title: 'Two-step transition',
        prompt: r`<p>A two-state chain has \(P = \begin{pmatrix}0.9 & 0.1\\ 0.5 & 0.5\end{pmatrix}\). Find \(P(X_2 = 1 \mid X_0 = 0)\) (states labeled 0, 1).</p>`,
        answers: [{ label: 'Probability', value: 0.14 }],
        solution: r`\[ (P^2)_{01} = 0.9(0.1) + 0.1(0.5) = 0.14. \]`
      },
      {
        id: 'sp2', topic: 'markov', level: 1, title: 'Stationary distribution',
        prompt: r`<p>For the same chain, find the stationary probability of state 0.</p>`,
        answers: [{ label: 'π₀', value: 5 / 6 }],
        solution: r`<p>Balance: \(\pi_0(0.1) = \pi_1(0.5)\), so \(\pi_0 = 5\pi_1\) and \(\pi_0 = 5/6 \approx 0.833\).</p>`
      },
      {
        id: 'sp3', topic: 'markov', level: 2, title: "Gambler's ruin",
        prompt: r`<p>Starting with $3, you bet $1 each round until you reach $10 or go broke. Find \(P(\text{reach } 10)\) for (a) a fair game and (b) win probability \(p = 0.4\).</p>`,
        answers: [{ label: '(a) fair', value: 0.3 }, { label: '(b) p = 0.4', value: 0.041913 }],
        solution: r`<p>(a) Fair: \(i/N = 3/10\).</p><p>(b) With \(r = q/p = 1.5\):</p>\[ \frac{r^i - 1}{r^N - 1} = \frac{1.5^3 - 1}{1.5^{10} - 1} = \frac{2.375}{56.665} \approx 0.0419. \]`
      },
      {
        id: 'sp4', topic: 'markov', level: 2, title: 'Expected hitting time',
        prompt: r`<p>States 0, 1, 2 with 2 absorbing. From 0 you always go to 1. From 1 you go to 0 or 2 with probability 1/2 each. Starting at 0, what is the expected number of steps to absorption?</p>`,
        answers: [{ label: 'E[steps]', value: 4 }],
        solution: r`<p>First-step analysis: \(h_0 = 1 + h_1\) and \(h_1 = 1 + \tfrac12h_0\). Substituting gives \(h_1 = 1.5 + \tfrac12h_1\), so \(h_1 = 3\) and \(h_0 = 4\).</p>`
      },
      {
        id: 'sp5', topic: 'markov', level: 2, title: 'Classifying states',
        prompt: r`<p>A finite, irreducible Markov chain with \(P_{00} > 0\) is:</p>`,
        choices: ['transient and periodic', 'positive recurrent and aperiodic', 'null recurrent', 'reducible'],
        correct: 1,
        solution: r`<p>Finite and irreducible implies positive recurrent. A self-loop makes the period 1. So the chain has a unique limiting distribution.</p>`
      },
      {
        id: 'sp6', topic: 'poisson', level: 1, title: 'Counts and waiting times',
        prompt: r`<p>Arrivals follow a Poisson process with rate 3 per hour. Find P(exactly 2 arrivals in 30 minutes) and the expected time until the 5th arrival (hours).</p>`,
        answers: [{ label: 'P(N(0.5) = 2)', value: 0.251021 }, { label: 'E[T₅]', value: 5 / 3 }],
        solution: r`\[ N(0.5)\sim\text{Pois}(1.5):\ \frac{e^{-1.5}1.5^2}{2} \approx 0.251,\qquad T_5 \sim \text{Gamma}(5, 3),\ E = 5/3. \]`
      },
      {
        id: 'sp7', topic: 'poisson', level: 2, title: 'Thinning',
        prompt: r`<p>Customers arrive at rate 10/hour and each independently buys something with probability 0.3. What is the probability of no purchases in an hour?</p>`,
        answers: [{ label: 'Probability', value: 0.049787 }],
        solution: r`<p>Purchases form a Poisson process with rate 3, so \(P = e^{-3} \approx 0.0498\).</p>`
      },
      {
        id: 'sp8', topic: 'poisson', level: 2, title: 'M/M/1 queue',
        prompt: r`<p>Arrival rate λ = 4/hr, service rate μ = 5/hr. Find utilization ρ, mean number in system L, mean time in system W (hours), and mean wait in queue \(W_q\).</p>`,
        answers: [{ label: 'ρ', value: 0.8 }, { label: 'L', value: 4 }, { label: 'W', value: 1 }, { label: 'W_q', value: 0.8 }],
        solution: r`\[ \rho = 0.8,\quad L = \frac{\rho}{1-\rho} = 4,\quad W = \frac1{\mu-\lambda} = 1,\quad W_q = W - \frac1\mu = 0.8. \]<p>Check Little's law: \(L = \lambda W = 4\).</p>`
      },
      {
        id: 'sp9', topic: 'other', level: 2, title: 'Extinction probability',
        prompt: r`<p>A branching process has offspring distribution \(P(0) = 0.25\), \(P(1) = 0.25\), \(P(2) = 0.5\). Find the mean offspring and the extinction probability starting from one individual.</p>`,
        answers: [{ label: 'Mean', value: 1.25 }, { label: 'Extinction prob', value: 0.5 }],
        solution: r`<p>Mean = 0.25 + 1 = 1.25 > 1, so extinction is not certain. Solve \(s = 0.25 + 0.25s + 0.5s^2\), i.e. \(s^2 - 1.5s + 0.5 = 0\), with roots \(s = 0.5, 1\). The smallest root gives <span class="final">0.5</span>.</p>`
      },
      {
        id: 'sp10', topic: 'other', level: 2, title: 'Brownian motion',
        prompt: r`<p>For standard Brownian motion \(B(t)\), find \(P(B(4) > 2)\) and \(\text{Cov}(B(2), B(5))\).</p>`,
        answers: [{ label: 'P(B(4) > 2)', value: 0.158655 }, { label: 'Cov', value: 2 }],
        solution: r`<p>\(B(4)\sim N(0,4)\), so \(P(B(4)>2) = P(Z>1) \approx 0.1587\). \(\text{Cov}(B(s),B(t)) = \min(s,t) = 2\).</p>`
      }
    ]
  });
})();
