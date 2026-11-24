(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'anova',
    order: 40,
    section: 'degree',
    year: 'Year 3 — Core Methods',
    code: 'STAT 340',
    title: 'Experimental Design & ANOVA',
    description: 'Designing experiments and analyzing them: one-way and factorial ANOVA, contrasts, multiple comparisons, blocking, and 2ᵏ designs.',
    topics: [
      { id: 'oneway', title: 'One-way ANOVA' },
      { id: 'mc', title: 'Contrasts & multiple comparisons' },
      { id: 'fact', title: 'Factorial designs' },
      { id: 'block', title: 'Blocking' },
      { id: 'principles', title: 'Design principles' }
    ],
    problems: [
      {
        id: 'a1', topic: 'oneway', level: 1, title: 'One-way ANOVA by hand',
        prompt: r`<p>Three groups of 5 have means 10, 12, 17 (grand mean 13). SSE = 60. Compute SSTr, MSTr, MSE, and F.</p>`,
        answers: [{ label: 'SSTr', value: 130 }, { label: 'MSTr', value: 65 }, { label: 'MSE', value: 5 }, { label: 'F', value: 13 }],
        solution: r`\[ SS_{Tr} = 5[(10-13)^2 + (12-13)^2 + (17-13)^2] = 5(26) = 130 \]\[ MS_{Tr} = 130/2 = 65,\quad MSE = 60/12 = 5,\quad F = 13 \sim F_{2,12},\ p \approx 0.001. \]`
      },
      {
        id: 'a2', topic: 'oneway', level: 1, title: 'Completing an ANOVA table',
        prompt: r`<p>4 treatments, 24 total observations, SST = 500, SSTr = 120. Find the error df, MSE, and F.</p>`,
        answers: [{ label: 'Error df', value: 20, tol: 0 }, { label: 'MSE', value: 19 }, { label: 'F', value: 2.105263 }],
        solution: r`<p>SSE = 380, df = (3, 20). MSTr = 40, MSE = 19, F = 2.105 (\(p \approx 0.13\)).</p>`
      },
      {
        id: 'a3', topic: 'oneway', level: 2, title: 'ANOVA assumptions',
        prompt: r`<p>Which is <em>not</em> an assumption of the standard one-way ANOVA F-test?</p>`,
        choices: ['Independent observations', 'Normal errors within each group', 'Equal group variances', 'Equal group sample sizes'],
        correct: 3,
        solution: r`<p>Balanced designs are convenient and make the test more robust to unequal variances, but they are not required.</p>`
      },
      {
        id: 'a4', topic: 'mc', level: 1, title: 'Bonferroni adjustment',
        prompt: r`<p>You compare all pairs among 5 groups with family-wise \(\alpha = 0.05\). How many comparisons are there, and what per-test α does Bonferroni use?</p>`,
        answers: [{ label: 'Comparisons', value: 10, tol: 0 }, { label: 'Per-test α', value: 0.005 }],
        solution: r`\[ \binom52 = 10,\qquad 0.05/10 = 0.005. \]`
      },
      {
        id: 'a5', topic: 'mc', level: 2, title: "Tukey's HSD",
        prompt: r`<p>Continuing the 3-group example (means 10, 12, 17; \(n = 5\) each; MSE = 5; error df 12), with \(q_{0.05}(3, 12) = 3.773\), compute Tukey's HSD. Which pairs differ?</p>`,
        answers: [{ label: 'HSD', value: 3.773 }],
        solution: r`\[ HSD = q\sqrt{MSE/n} = 3.773\sqrt{5/5} = 3.773. \]<p>Differences: 17−10 = 7 ✔, 17−12 = 5 ✔, 12−10 = 2 ✘. Group 3 differs from both others.</p>`
      },
      {
        id: 'a6', topic: 'mc', level: 2, title: 'Testing a contrast',
        prompt: r`<p>With the same data (means 10, 12, 17; \(n=5\); MSE = 5), test \(L = \mu_1 - \tfrac12(\mu_2 + \mu_3)\). Compute \(\hat L\), its SE, and t.</p>`,
        answers: [{ label: 'L̂', value: -4.5 }, { label: 'SE', value: 1.224745 }, { label: 't', value: -3.674235 }],
        solution: r`\[ \hat L = 10 - 14.5 = -4.5,\quad SE = \sqrt{MSE\sum c_i^2/n} = \sqrt{5(1.5)/5} = 1.2247 \]\[ t = -3.674 \text{ on 12 df},\ p \approx 0.003. \]`
      },
      {
        id: 'a7', topic: 'fact', level: 2, title: 'Main effects and interaction in a 2×2',
        prompt: r`<p>Cell means:</p><table><tr><th></th><th>B₁</th><th>B₂</th></tr><tr><th>A₁</th><td>10</td><td>14</td></tr><tr><th>A₂</th><td>12</td><td>24</td></tr></table><p>Find the main effect of A (difference of marginal means), the main effect of B, and the interaction contrast \((\mu_{22}-\mu_{21}) - (\mu_{12}-\mu_{11})\).</p>`,
        answers: [{ label: 'Effect of A', value: 6 }, { label: 'Effect of B', value: 8 }, { label: 'Interaction', value: 8 }],
        solution: r`<p>A marginals: 12 vs 18, giving 6. B marginals: 11 vs 19, giving 8. Interaction: \((24-12) - (14-10) = 8\). The B effect is much larger at A₂, so interpret main effects with care.</p>`
      },
      {
        id: 'a8', topic: 'fact', level: 1, title: 'Degrees of freedom in a two-way ANOVA',
        prompt: r`<p>Factor A has 3 levels, factor B has 4, with 5 replicates per cell. Give df for A, B, AB, and error.</p>`,
        answers: [{ label: 'df A', value: 2, tol: 0 }, { label: 'df B', value: 3, tol: 0 }, { label: 'df AB', value: 6, tol: 0 }, { label: 'df Error', value: 48, tol: 0 }],
        solution: r`<p>A: 2, B: 3, AB: 2×3 = 6, Error: \(ab(n-1) = 12\cdot4 = 48\). Total: 59.</p>`
      },
      {
        id: 'a9', topic: 'fact', level: 2, title: 'Effect estimate in a 2³ design',
        prompt: r`<p>In a \(2^3\) factorial with \(n = 2\) replicates, the contrast for factor A (sum of + runs minus sum of − runs) totals 48. Estimate the A effect and its sum of squares.</p>`,
        answers: [{ label: 'Effect', value: 6 }, { label: 'SS', value: 144 }],
        solution: r`\[ \text{Effect} = \frac{\text{contrast}}{n2^{k-1}} = \frac{48}{8} = 6,\qquad SS = \frac{\text{contrast}^2}{n2^k} = \frac{2304}{16} = 144. \]`
      },
      {
        id: 'a10', topic: 'block', level: 1, title: 'RCBD degrees of freedom',
        prompt: r`<p>A randomized complete block design has 4 treatments in each of 5 blocks. What is the error df?</p>`,
        answers: [{ label: 'Error df', value: 12, tol: 0 }],
        solution: r`<p>\((t-1)(b-1) = 3\cdot4 = 12\).</p>`
      },
      {
        id: 'a11', topic: 'block', level: 2, title: 'Why block?',
        prompt: r`<p>Fields differ in soil fertility. A researcher compares 3 fertilizers by splitting each field into 3 plots and randomizing fertilizers within field. The main benefit is:</p>`,
        choices: [
          'It eliminates the need for randomization.',
          'It removes field-to-field variation from the error term, increasing precision.',
          'It allows causal conclusions about soil type.',
          'It increases the error degrees of freedom.'
        ],
        correct: 1,
        solution: r`<p>Blocking accounts for a known nuisance source of variation. It actually <em>uses up</em> error df, but usually shrinks MSE much more than enough to compensate.</p>`
      },
      {
        id: 'a12', topic: 'principles', level: 1, title: 'Experiment or observational study?',
        prompt: r`<p>Researchers compare health outcomes of people who choose to drink coffee with those who don't. Why can't they conclude coffee <em>causes</em> any difference?</p>`,
        choices: [
          'The sample is too small.',
          'There was no random assignment, so confounders may explain the difference.',
          'Coffee drinking is a categorical variable.',
          'They should have used a two-sided test.'
        ],
        correct: 1,
        solution: r`<p>Only random assignment balances confounders on average, which is what allows causal conclusions.</p>`
      }
    ]
  });
})();
