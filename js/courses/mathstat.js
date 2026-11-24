(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'mathstat',
    order: 20,
    section: 'degree',
    year: 'Year 2 — Foundations',
    code: 'STAT 320',
    title: 'Mathematical Statistics',
    description: 'Estimation theory, sufficiency, optimality, pivotal intervals, and the theory of hypothesis testing.',
    topics: [
      { id: 'est', title: 'MoM & MLE' },
      { id: 'prop', title: 'Bias, MSE, efficiency' },
      { id: 'suff', title: 'Sufficiency & UMVUE' },
      { id: 'int', title: 'Interval estimation' },
      { id: 'test', title: 'Testing theory' },
      { id: 'asym', title: 'Asymptotics' }
    ],
    problems: [
      {
        id: 'ms1', topic: 'est', level: 1, title: 'MLE of an exponential rate',
        prompt: r`<p>Observations 2, 3, 1, 4, 5 come from an Exponential(\(\lambda\)) distribution with density \(\lambda e^{-\lambda x}\). Find the MLE of \(\lambda\).</p>`,
        answers: [{ label: 'λ̂', value: 1 / 3 }],
        solution: r`\[ \ell(\lambda) = n\ln\lambda - \lambda\sum x_i,\quad \ell'(\lambda) = \frac n\lambda - \sum x_i = 0 \Rightarrow \hat\lambda = \frac1{\bar x} = \frac13. \]`
      },
      {
        id: 'ms2', topic: 'est', level: 1, title: 'MoM vs MLE for Uniform(0, θ)',
        prompt: r`<p>Data from Uniform(0, θ): 1.2, 3.4, 2.0, 4.4. Find the method-of-moments estimate and the MLE of θ.</p>`,
        answers: [{ label: 'MoM', value: 5.5 }, { label: 'MLE', value: 4.4 }],
        solution: r`<p>MoM: \(E[X] = \theta/2\), so \(\hat\theta = 2\bar x = 2(2.75) = 5.5\).</p><p>MLE: \(L(\theta) = \theta^{-n}\) for \(\theta \ge \max x_i\), which is decreasing in θ, so \(\hat\theta = \max x_i = 4.4\).</p>`
      },
      {
        id: 'ms3', topic: 'est', level: 2, title: 'MLE of a normal variance',
        prompt: r`<p>For \(X_i \sim N(\mu,\sigma^2)\) with both unknown, find the MLE of \(\sigma^2\) for the data 4, 6, 8.</p>`,
        answers: [{ label: 'σ̂²', value: 8 / 3 }],
        solution: r`<p>\(\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2 = \frac{4+0+4}{3} = 2.667\). Note the divisor \(n\), not \(n-1\).</p>`
      },
      {
        id: 'ms4', topic: 'est', level: 2, title: 'Method of moments for the gamma',
        prompt: r`<p>A sample has mean 6 and variance 12. Fit a Gamma(α, β) with mean \(\alpha\beta\) and variance \(\alpha\beta^2\) (β is a scale parameter) by the method of moments.</p>`,
        answers: [{ label: 'α̂', value: 3 }, { label: 'β̂', value: 2 }],
        solution: r`\[ \hat\beta = \frac{\text{var}}{\text{mean}} = \frac{12}{6} = 2,\qquad \hat\alpha = \frac{\text{mean}}{\hat\beta} = 3. \]`
      },
      {
        id: 'ms5', topic: 'prop', level: 1, title: 'Bias of the divide-by-n variance',
        prompt: r`<p>With \(n = 10\) and \(\sigma^2 = 20\), what is \(E[\hat\sigma^2]\) where \(\hat\sigma^2 = \frac1n\sum (X_i - \bar X)^2\)? What is the bias?</p>`,
        answers: [{ label: 'E[σ̂²]', value: 18 }, { label: 'Bias', value: -2 }],
        solution: r`\[ E[\hat\sigma^2] = \frac{n-1}{n}\sigma^2 = 0.9(20) = 18,\qquad \text{bias} = -2. \]`
      },
      {
        id: 'ms6', topic: 'prop', level: 2, title: 'Bias of the sample maximum',
        prompt: r`<p>For \(X_1,\dots,X_n\) iid Uniform(0, θ), \(E[\max X_i] = \frac{n}{n+1}\theta\). With \(n=4\) and \(\theta = 10\), compute \(E[\max]\). What constant \(c\) makes \(c\max X_i\) unbiased?</p>`,
        answers: [{ label: 'E[max]', value: 8 }, { label: 'c', value: 1.25 }],
        solution: r`<p>\(E[\max] = \tfrac45(10) = 8\). Unbiased: \(c = \frac{n+1}{n} = 1.25\).</p>`
      },
      {
        id: 'ms7', topic: 'prop', level: 2, title: 'Cramér–Rao lower bound',
        prompt: r`<p>For \(X_1,\dots,X_n\) iid Bernoulli(\(p\)), find the CRLB for unbiased estimators of \(p\) when \(p = 0.3\) and \(n = 50\). Does \(\bar X\) attain it?</p>`,
        answers: [{ label: 'CRLB', value: 0.0042 }],
        solution: r`\[ I(p) = \frac1{p(1-p)},\qquad \text{CRLB} = \frac{p(1-p)}{n} = \frac{0.21}{50} = 0.0042. \]<p>\(\text{Var}(\bar X) = p(1-p)/n\), so <span class="final">yes, \(\bar X\) is efficient</span>.</p>`
      },
      {
        id: 'ms8', topic: 'suff', level: 2, title: 'Sufficient statistic for the Poisson',
        prompt: r`<p>For \(X_1,\dots,X_n\) iid Poisson(λ), which is a sufficient statistic for λ?</p>`,
        choices: [r`\(\max X_i\)`, r`\(\sum X_i\)`, r`\(X_1\)`, r`\(\sum X_i^2\)`],
        correct: 1,
        solution: r`\[ L(\lambda) = \frac{e^{-n\lambda}\lambda^{\sum x_i}}{\prod x_i!} \]<p>This factors as \(g(\sum x_i, \lambda)\,h(x)\), so \(\sum X_i\) is sufficient by the factorization theorem.</p>`
      },
      {
        id: 'ms9', topic: 'suff', level: 3, title: 'UMVUE via Rao–Blackwell',
        prompt: r`<p>For iid Poisson(λ), the UMVUE of \(P(X=0) = e^{-\lambda}\) is \(\left(\frac{n-1}{n}\right)^{T}\) with \(T = \sum X_i\). Evaluate it for \(n = 10\) and \(T = 20\), and compare with the plug-in MLE \(e^{-\bar x}\).</p>`,
        answers: [{ label: 'UMVUE', value: 0.121577 }, { label: 'MLE', value: 0.135335 }],
        hint: r`Start with the unbiased estimator \(\mathbf 1\{X_1 = 0\}\) and condition on \(T\): \(X_1\mid T \sim \text{Bin}(T, 1/n)\).`,
        solution: r`\[ E[\mathbf1\{X_1=0\}\mid T] = (1-1/n)^T = 0.9^{20} \approx 0.1216,\qquad e^{-2} \approx 0.1353. \]`
      },
      {
        id: 'ms10', topic: 'int', level: 2, title: 'CI for a normal variance',
        prompt: r`<p>With \(n = 11\) and \(s^2 = 16\) from a normal population, find a 95% CI for \(\sigma^2\).</p>`,
        answers: [{ label: 'Lower', value: 7.8113, tol: 0.03 }, { label: 'Upper', value: 49.277, tol: 0.15 }],
        hint: r`Use the pivot \((n-1)S^2/\sigma^2 \sim \chi^2_{n-1}\).`,
        solution: r`<p>\(\chi^2_{10}\) quantiles: 3.247 (0.025) and 20.483 (0.975).</p>\[ \left(\frac{10\cdot16}{20.483},\ \frac{10\cdot16}{3.247}\right) = (7.81,\ 49.28). \]`
      },
      {
        id: 'ms11', topic: 'int', level: 2, title: 'Wald interval for a Poisson mean',
        prompt: r`<p>Fifty counts have mean 4.2. Assuming a Poisson model, give the large-sample 95% Wald CI for λ.</p>`,
        answers: [{ label: 'Lower', value: 3.6319, tol: 0.01 }, { label: 'Upper', value: 4.7681, tol: 0.01 }],
        solution: r`\[ \hat\lambda \pm 1.96\sqrt{\hat\lambda/n} = 4.2 \pm 1.96(0.2898) = (3.632,\ 4.768). \]`
      },
      {
        id: 'ms12', topic: 'test', level: 2, title: 'Neyman–Pearson most powerful test',
        prompt: r`<p>\(X_1,\dots,X_9\) iid \(N(\mu,1)\). Test \(H_0:\mu=0\) vs \(H_1:\mu=1\) at \(\alpha=0.05\). Find the critical value \(c\) (reject when \(\bar X > c\)) and the power.</p>`,
        answers: [{ label: 'c', value: 0.54828, tol: 0.002 }, { label: 'Power', value: 0.91231, tol: 0.003 }],
        solution: r`<p>The likelihood ratio is increasing in \(\bar x\), so the MP test rejects for large \(\bar X\).</p>\[ c = 0 + 1.645/3 = 0.548,\qquad \text{power} = P(Z > 3(0.548 - 1)) = P(Z > -1.355) \approx 0.912. \]`
      },
      {
        id: 'ms13', topic: 'test', level: 3, title: 'Likelihood ratio test statistic',
        prompt: r`<p>For iid Exponential(λ) with \(n=20\) and \(\bar x = 2.5\), compute the LRT statistic \(-2\ln\Lambda\) for \(H_0:\lambda = 0.5\). Using the \(\chi^2_1\) approximation, do you reject at \(\alpha = 0.05\)?</p>`,
        answers: [{ label: '−2 ln Λ', value: 1.07426, tol: 0.005 }],
        solution: r`<p>\(\hat\lambda = 1/\bar x = 0.4\) and \(\ell(\lambda) = n\ln\lambda - \lambda n\bar x\), so</p>
\[ \ell(0.4) = 20\ln0.4 - 20 = -38.326,\qquad \ell(0.5) = 20\ln0.5 - 25 = -38.863 \]
\[ -2\ln\Lambda = 2[\ell(\hat\lambda) - \ell(0.5)] = 2(0.537) \approx 1.074. \]<p>Since \(1.074 < 3.841 = \chi^2_{1,0.95}\), <span class="final">fail to reject</span>.</p>`
      },
      {
        id: 'ms14', topic: 'test', level: 1, title: 'p-value meaning',
        prompt: r`<p>A p-value of 0.03 means:</p>`,
        choices: [
          'There is a 3% chance the null hypothesis is true.',
          'If H₀ were true, data at least as extreme as observed would occur about 3% of the time.',
          'The effect size is 0.03.',
          'There is a 97% chance the alternative is true.'
        ],
        correct: 1,
        solution: r`<p>A p-value is computed <em>assuming</em> \(H_0\). It is not the probability that \(H_0\) is true.</p>`
      },
      {
        id: 'ms15', topic: 'asym', level: 2, title: 'Delta method: SE of the odds',
        prompt: r`<p>\(\hat p = \bar X\) from \(n = 100\) Bernoulli trials with \(p = 0.2\). Use the delta method to approximate the SE of \(\hat p/(1-\hat p)\).</p>`,
        answers: [{ label: 'SE', value: 0.0625 }],
        solution: r`\[ g(p) = \frac{p}{1-p},\quad g'(p) = \frac1{(1-p)^2} = 1.5625 \]\[ SE \approx |g'(p)|\sqrt{p(1-p)/n} = 1.5625(0.04) = 0.0625. \]`
      },
      {
        id: 'ms16', topic: 'asym', level: 2, title: 'Consistency',
        prompt: r`<p>An estimator \(\hat\theta_n\) has bias \(1/n\) and variance \(5/n\). Is it consistent?</p>`,
        choices: ['No, because it is biased', 'Yes, because its MSE → 0', 'Only if it is also efficient', 'Cannot tell without the distribution'],
        correct: 1,
        solution: r`<p>\(\text{MSE} = 1/n^2 + 5/n \to 0\). Convergence in mean square implies convergence in probability, so it is consistent.</p>`
      }
    ]
  });
})();
