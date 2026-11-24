(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'sampling',
    order: 55,
    section: 'degree',
    year: 'Year 3 — Core Methods',
    code: 'STAT 370',
    title: 'Sampling & Survey Methods',
    description: 'Simple random, stratified, and cluster sampling; ratio and Horvitz–Thompson estimation; sample size; and survey bias.',
    topics: [
      { id: 'srs', title: 'Simple random sampling' },
      { id: 'strat', title: 'Stratified sampling' },
      { id: 'cluster', title: 'Cluster & complex designs' },
      { id: 'bias', title: 'Bias & nonresponse' }
    ],
    problems: [
      {
        id: 'v1', topic: 'srs', level: 1, title: 'SRS with finite population correction',
        prompt: r`<p>An SRS of \(n = 100\) from \(N = 1000\) has \(\bar y = 50\) and \(s = 20\). Find \(SE(\bar y)\) with the FPC, the estimated population total, and its SE.</p>`,
        answers: [{ label: 'SE(ȳ)', value: 1.897367 }, { label: 'Total', value: 50000 }, { label: 'SE(total)', value: 1897.367 }],
        solution: r`\[ SE(\bar y) = \sqrt{\left(1 - \tfrac{n}{N}\right)\frac{s^2}{n}} = \sqrt{0.9\cdot4} = 1.897 \]<p>Total: \(N\bar y = 50{,}000\) with SE \(N\cdot SE(\bar y) = 1897\).</p>`
      },
      {
        id: 'v2', topic: 'srs', level: 2, title: 'Sample size with FPC',
        prompt: r`<p>For ±5% margin at 95% confidence (\(p = 0.5\)), \(n_0 = 384.16\). The population has \(N = 2000\). What is the adjusted sample size (rounded up)?</p>`,
        answers: [{ label: 'n', value: 323, tol: 0 }],
        solution: r`\[ n = \frac{n_0}{1 + n_0/N} = \frac{384.16}{1.192} = 322.3 \Rightarrow 323. \]`
      },
      {
        id: 'v3', topic: 'strat', level: 2, title: 'Stratified estimate and SE',
        prompt: r`<p>Two strata:</p><table><tr><th></th><th>N_h</th><th>n_h</th><th>ȳ_h</th><th>s_h</th></tr><tr><th>1</th><td>600</td><td>30</td><td>10</td><td>4</td></tr><tr><th>2</th><td>400</td><td>20</td><td>20</td><td>6</td></tr></table><p>Find \(\bar y_{st}\) and its SE (with FPC).</p>`,
        answers: [{ label: 'ȳ_st', value: 14 }, { label: 'SE', value: 0.675278 }],
        solution: r`\[ \bar y_{st} = 0.6(10) + 0.4(20) = 14 \]\[ V = 0.6^2(0.95)\tfrac{16}{30} + 0.4^2(0.95)\tfrac{36}{20} = 0.1824 + 0.2736 = 0.456,\quad SE = 0.675. \]`
      },
      {
        id: 'v4', topic: 'strat', level: 2, title: 'Neyman allocation',
        prompt: r`<p>Using the strata above (\(N_1S_1 = 2400\), \(N_2S_2 = 2400\)) and total \(n = 100\), how many go to stratum 1 under Neyman allocation? Under proportional allocation?</p>`,
        answers: [{ label: 'Neyman n₁', value: 50, tol: 0 }, { label: 'Proportional n₁', value: 60, tol: 0 }],
        solution: r`<p>Neyman: \(n_h \propto N_hS_h\), giving 2400:2400, so 50 each. Proportional: \(n_h \propto N_h\), giving 60 and 40.</p>`
      },
      {
        id: 'v5', topic: 'cluster', level: 2, title: 'Design effect',
        prompt: r`<p>A cluster sample uses clusters of size \(m = 20\) with intraclass correlation 0.05. Compute the design effect and the effective sample size for 400 respondents.</p>`,
        answers: [{ label: 'Deff', value: 1.95 }, { label: 'Effective n', value: 205.128 }],
        solution: r`\[ \text{deff} = 1 + (m-1)\rho = 1 + 19(0.05) = 1.95,\qquad n_{eff} = 400/1.95 \approx 205. \]`
      },
      {
        id: 'v6', topic: 'cluster', level: 1, title: 'Ratio estimator',
        prompt: r`<p>In a sample, \(\bar y = 12\) and \(\bar x = 8\). The known population mean of \(x\) is \(\bar X = 10\). Give the ratio estimate of \(\bar Y\).</p>`,
        answers: [{ label: 'Ȳ_R', value: 15 }],
        solution: r`\[ \hat{\bar Y}_R = \frac{\bar y}{\bar x}\bar X = 1.5(10) = 15. \]`
      },
      {
        id: 'v7', topic: 'cluster', level: 3, title: 'Horvitz–Thompson estimator',
        prompt: r`<p>Three sampled units have \(y = 10, 20, 30\) and inclusion probabilities \(\pi = 0.1, 0.2, 0.5\). Estimate the population total.</p>`,
        answers: [{ label: 'Total', value: 260 }],
        solution: r`\[ \hat T = \sum\frac{y_i}{\pi_i} = 100 + 100 + 60 = 260. \]`
      },
      {
        id: 'v8', topic: 'bias', level: 1, title: 'Identify the bias',
        prompt: r`<p>A website poll asks visitors to click to vote on a policy. The main source of bias is:</p>`,
        choices: ['Undercoverage', 'Voluntary response', 'Response bias from question wording', 'Sampling variability'],
        correct: 1,
        solution: r`<p>People with strong opinions self-select, which is voluntary response bias. A bigger sample doesn't fix it.</p>`
      },
      {
        id: 'v9', topic: 'bias', level: 2, title: 'Nonresponse bias',
        prompt: r`<p>60% of a population responds, with mean income 50k. Nonrespondents average 70k. What is the bias of the respondent mean as an estimate of the population mean?</p>`,
        answers: [{ label: 'Bias (thousands)', value: -8 }],
        solution: r`<p>Population mean = \(0.6(50) + 0.4(70) = 58\). Bias = \(50 - 58 = -8\), equal to (nonresponse rate)×(difference) = \(0.4(50-70)\).</p>`
      }
    ]
  });
})();
