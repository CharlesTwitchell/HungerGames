(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'nonparametric',
    order: 60,
    section: 'degree',
    year: 'Year 4 — Advanced Electives',
    code: 'STAT 410',
    title: 'Nonparametric Statistics',
    description: 'Rank-based and distribution-free methods: sign, Wilcoxon, Mann–Whitney, Kruskal–Wallis, Spearman, permutation, runs, and Kolmogorov–Smirnov tests.',
    topics: [
      { id: 'one', title: 'One-sample & paired' },
      { id: 'two', title: 'Two or more samples' },
      { id: 'assoc', title: 'Association & randomness' },
      { id: 'gof', title: 'Goodness of fit' }
    ],
    problems: [
      {
        id: 'np1', topic: 'one', level: 1, title: 'Sign test',
        prompt: r`<p>Of 12 paired differences (none zero), 10 are positive. Compute the one-sided exact p-value \(P(X \ge 10)\) under \(H_0\): median difference = 0.</p>`,
        answers: [{ label: 'p-value', value: 0.019287 }],
        solution: r`\[ P(X\ge10) = \frac{\binom{12}{10}+\binom{12}{11}+\binom{12}{12}}{2^{12}} = \frac{66+12+1}{4096} \approx 0.0193. \]`
      },
      {
        id: 'np2', topic: 'one', level: 2, title: 'Wilcoxon signed-rank',
        prompt: r`<p>Differences: 1.5, −0.5, 2.0, 3.1, −1.2, 2.6, 0.8, 4.0. Compute \(W^+\) and \(W^-\). For \(n = 8\), the two-sided 5% critical value for \(\min(W^+,W^-)\) is 3. Reject?</p>`,
        answers: [{ label: 'W⁺', value: 32, tol: 0 }, { label: 'W⁻', value: 4, tol: 0 }],
        solution: r`<p>Rank |d|: 0.5→1, 0.8→2, 1.2→3, 1.5→4, 2.0→5, 2.6→6, 3.1→7, 4.0→8. Negative ranks: 1 + 3 = 4, so \(W^- = 4\) and \(W^+ = 36 - 4 = 32\).</p><p>\(4 > 3\), so <span class="final">do not reject</span> (exact \(p \approx 0.055\)).</p>`
      },
      {
        id: 'np3', topic: 'two', level: 2, title: 'Mann–Whitney U',
        prompt: r`<p>Group A: 3, 7, 9. Group B: 1, 4, 5, 8. Find the rank sum \(R_A\) and \(U_A = R_A - n_A(n_A+1)/2\).</p>`,
        answers: [{ label: 'R_A', value: 14, tol: 0 }, { label: 'U_A', value: 8, tol: 0 }],
        solution: r`<p>Combined ranks: 1(B), 3(A)=2, 4(B), 5(B), 7(A)=5, 8(B), 9(A)=7. \(R_A = 14\), \(U_A = 14 - 6 = 8\), and \(U_B = 12 - 8 = 4\).</p>`
      },
      {
        id: 'np4', topic: 'two', level: 2, title: 'Kruskal–Wallis H',
        prompt: r`<p>Three groups of 4 (N = 12) have rank sums 12, 26, 40. Compute H.</p>`,
        answers: [{ label: 'H', value: 7.538462 }],
        solution: r`\[ H = \frac{12}{N(N+1)}\sum\frac{R_i^2}{n_i} - 3(N+1) = \frac{12}{156}\cdot\frac{144+676+1600}{4} - 39 \approx 7.54. \]<p>Compared with \(\chi^2_2\): \(p \approx 0.023\).</p>`
      },
      {
        id: 'np5', topic: 'two', level: 2, title: 'Exact permutation test',
        prompt: r`<p>Treatment: 8, 9, 10. Control: 5, 6, 7. Under random assignment, how many equally likely splits are there, and what is the one-sided p-value for "treatment mean is higher"?</p>`,
        answers: [{ label: 'Splits', value: 20, tol: 0 }, { label: 'p-value', value: 0.05 }],
        solution: r`<p>\(\binom63 = 20\) ways to choose which 3 values are "treatment". The observed split has the largest possible treatment sum, so \(p = 1/20 = 0.05\).</p>`
      },
      {
        id: 'np6', topic: 'assoc', level: 1, title: "Spearman's rank correlation",
        prompt: r`<p>Ranks of 5 items by two judges: X = 1, 2, 3, 4, 5; Y = 2, 1, 4, 3, 5. Compute Spearman's \(\rho\).</p>`,
        answers: [{ label: 'ρ', value: 0.8 }],
        solution: r`\[ \sum d^2 = 1+1+1+1+0 = 4,\qquad \rho = 1 - \frac{6\cdot4}{5(25-1)} = 0.8. \]`
      },
      {
        id: 'np7', topic: 'assoc', level: 2, title: 'Runs test',
        prompt: r`<p>Coin sequence: H H T T T H T H H H. Count the runs \(R\) and compute \(E[R]\) under randomness given \(n_1 = 6\) H and \(n_2 = 4\) T.</p>`,
        answers: [{ label: 'R', value: 5, tol: 0 }, { label: 'E[R]', value: 5.8 }],
        solution: r`<p>Runs: HH | TTT | H | T | HHH, so \(R = 5\).</p>\[ E[R] = \frac{2n_1n_2}{n_1+n_2} + 1 = \frac{48}{10} + 1 = 5.8. \]`
      },
      {
        id: 'np8', topic: 'gof', level: 2, title: 'Kolmogorov–Smirnov statistic',
        prompt: r`<p>Sample 0.1, 0.4, 0.7. Compute the one-sample KS statistic \(D = \sup_x|F_n(x) - x|\) against Uniform(0,1).</p>`,
        answers: [{ label: 'D', value: 0.3 }],
        hint: 'Check the gap just before and just after each jump of the empirical CDF.',
        solution: r`<p>At 0.1: \(|1/3 - 0.1| = 0.233\). At 0.4: \(|2/3 - 0.4| = 0.267\). At 0.7: \(|1 - 0.7| = 0.3\) and \(|2/3 - 0.7| = 0.033\). So \(D = 0.3\).</p>`
      },
      {
        id: 'np9', topic: 'gof', level: 1, title: 'When to go nonparametric',
        prompt: r`<p>Which situation most favors the Wilcoxon rank-sum test over a two-sample t-test?</p>`,
        choices: [
          'Large normal samples with equal variances',
          'Small samples from heavily skewed distributions with outliers',
          'Paired data',
          'Categorical outcomes with 3 levels'
        ],
        correct: 1,
        solution: r`<p>Rank tests are robust to outliers and heavy tails. Even for normal data they lose little efficiency (ARE ≈ 0.955).</p>`
      }
    ]
  });
})();
