(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'computing',
    order: 45,
    section: 'degree',
    year: 'Year 3 — Core Methods',
    code: 'STAT 360',
    title: 'Statistical Computing & Simulation',
    description: 'Random number generation, Monte Carlo, resampling, numerical optimization, and the EM algorithm.',
    topics: [
      { id: 'rng', title: 'Generating random variables' },
      { id: 'mc', title: 'Monte Carlo' },
      { id: 'resample', title: 'Bootstrap & resampling' },
      { id: 'opt', title: 'Optimization & EM' }
    ],
    problems: [
      {
        id: 'k1', topic: 'rng', level: 1, title: 'Inverse transform sampling',
        prompt: r`<p>To sample Exponential(λ = 2) by inverse transform, \(X = -\ln(1-U)/\lambda\). What value do you get from \(U = 0.3\)?</p>`,
        answers: [{ label: 'X', value: 0.178337 }],
        solution: r`<p>\(F(x) = 1 - e^{-2x}\), so \(F^{-1}(u) = -\ln(1-u)/2 = -\ln(0.7)/2 \approx 0.1783\).</p>`
      },
      {
        id: 'k2', topic: 'rng', level: 1, title: 'Linear congruential generator',
        prompt: r`<p>\(X_{n+1} = (5X_n + 3) \bmod 16\) with \(X_0 = 7\). Find \(X_3\).</p>`,
        answers: [{ label: 'X₃', value: 8, tol: 0 }],
        solution: r`<p>\(X_1 = 38 \bmod 16 = 6\), \(X_2 = 33 \bmod 16 = 1\), \(X_3 = 8 \bmod 16 = 8\).</p>`
      },
      {
        id: 'k3', topic: 'rng', level: 2, title: 'Box–Muller transform',
        prompt: r`<p>With \(U_1 = 0.5\), \(U_2 = 0.25\), compute \(Z_1 = \sqrt{-2\ln U_1}\cos(2\pi U_2)\) and \(Z_2 = \sqrt{-2\ln U_1}\sin(2\pi U_2)\).</p>`,
        answers: [{ label: 'Z₁', value: 0, tol: 0.001 }, { label: 'Z₂', value: 1.17741 }],
        solution: r`<p>\(\sqrt{-2\ln0.5} = \sqrt{1.386} = 1.1774\). \(\cos(\pi/2) = 0\) and \(\sin(\pi/2) = 1\), so \(Z_1 = 0\) and \(Z_2 = 1.1774\).</p>`
      },
      {
        id: 'k4', topic: 'rng', level: 2, title: 'Rejection sampling efficiency',
        prompt: r`<p>To sample Beta(2,2), density \(f(x) = 6x(1-x)\), using Uniform(0,1) proposals, what is the smallest envelope constant \(M\), and what fraction of proposals are accepted?</p>`,
        answers: [{ label: 'M', value: 1.5 }, { label: 'Acceptance rate', value: 2 / 3 }],
        solution: r`<p>\(\max f = f(0.5) = 1.5\), so \(M = 1.5\) and the acceptance rate is \(1/M = 2/3\).</p>`
      },
      {
        id: 'k5', topic: 'mc', level: 1, title: 'Monte Carlo standard error',
        prompt: r`<p>You estimate a probability by simulation: 2,000 of 10,000 runs are successes. What is the Monte Carlo standard error?</p>`,
        answers: [{ label: 'SE', value: 0.004 }],
        solution: r`\[ \sqrt{\frac{0.2(0.8)}{10000}} = 0.004. \]<p>To halve the SE, quadruple the runs.</p>`
      },
      {
        id: 'k6', topic: 'mc', level: 3, title: 'Importance sampling weights',
        prompt: r`<p>To estimate \(P(Z > 4)\) for \(Z\sim N(0,1)\), you sample from \(N(4,1)\). What is the importance weight \(w(x) = \phi(x)/\phi(x-4)\) at \(x = 4.5\)?</p>`,
        answers: [{ label: 'w(4.5)', value: 4.53999e-5, tol: 1e-6 }],
        solution: r`\[ w(x) = \exp\!\left(-\tfrac{x^2}{2} + \tfrac{(x-4)^2}{2}\right) = e^{8-4x},\qquad w(4.5) = e^{-10} \approx 4.54\times10^{-5}. \]`
      },
      {
        id: 'k7', topic: 'mc', level: 2, title: 'Antithetic variates',
        prompt: r`<p>Why does pairing \(U\) with \(1-U\) reduce variance when estimating \(E[g(U)]\) for a monotone \(g\)?</p>`,
        choices: [
          'It doubles the sample size for free.',
          'g(U) and g(1−U) are negatively correlated, so their average has smaller variance.',
          'It makes the estimator unbiased.',
          'It removes the need for random numbers.'
        ],
        correct: 1,
        solution: r`\[ \text{Var}\left(\frac{A+B}{2}\right) = \frac{\sigma^2}{2}(1+\rho), \]<p>which is below the independent-pair value \(\sigma^2/2\) when \(\rho < 0\).</p>`
      },
      {
        id: 'k8', topic: 'resample', level: 1, title: 'Who is left out of a bootstrap sample?',
        prompt: r`<p>With \(n = 10\), what is the probability a particular observation is <em>not</em> in a bootstrap resample? What does this approach as \(n\to\infty\)?</p>`,
        answers: [{ label: 'n = 10', value: 0.348678 }, { label: 'Limit', value: 0.367879 }],
        solution: r`\[ (1 - 1/n)^n = 0.9^{10} \approx 0.349 \to e^{-1} \approx 0.368. \]<p>This is the source of the "0.632" in the .632 bootstrap.</p>`
      },
      {
        id: 'k9', topic: 'resample', level: 2, title: 'Percentile bootstrap CI',
        prompt: r`<p>You compute 1,000 bootstrap medians and sort them. For a 95% percentile interval, which sorted positions give the endpoints?</p>`,
        choices: ['1st and 1000th', '25th and 975th', '50th and 950th', '5th and 95th'],
        correct: 1,
        solution: r`<p>The 2.5% and 97.5% quantiles fall at about positions 25 and 975.</p>`
      },
      {
        id: 'k10', topic: 'opt', level: 2, title: 'Newton–Raphson for an MLE',
        prompt: r`<p>Poisson data with \(n = 5\) and \(\sum x_i = 15\). The score is \(S(\lambda) = \sum x_i/\lambda - n\). Do one Newton step from \(\lambda_0 = 2\).</p>`,
        answers: [{ label: 'λ₁', value: 8 / 3 }],
        solution: r`\[ S(2) = 7.5 - 5 = 2.5,\quad S'(2) = -\frac{15}{4} = -3.75,\quad \lambda_1 = 2 - \frac{2.5}{-3.75} = 2.667. \]<p>Iterating converges to \(\hat\lambda = \bar x = 3\).</p>`
      },
      {
        id: 'k11', topic: 'opt', level: 3, title: 'EM E-step responsibility',
        prompt: r`<p>Mixture \(0.5\,N(0,1) + 0.5\,N(3,1)\). For an observation \(x = 1\), what is the posterior probability (responsibility) that it came from the first component?</p>`,
        answers: [{ label: 'Responsibility', value: 0.817574 }],
        solution: r`\[ \gamma = \frac{\phi(1)}{\phi(1) + \phi(-2)} = \frac{0.2420}{0.2420 + 0.0540} \approx 0.818. \]`
      }
    ]
  });
})();
