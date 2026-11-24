(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'bayesian',
    order: 70,
    section: 'degree',
    year: 'Year 4 — Advanced Electives',
    code: 'STAT 420',
    title: 'Bayesian Statistics',
    description: 'Priors and posteriors, conjugate families, posterior summaries and prediction, Bayes factors, and MCMC basics.',
    topics: [
      { id: 'conj', title: 'Conjugate models' },
      { id: 'summ', title: 'Posterior summaries & prediction' },
      { id: 'compare', title: 'Model comparison' },
      { id: 'mcmc', title: 'Computation (MCMC)' }
    ],
    problems: [
      {
        id: 'b1', topic: 'conj', level: 1, title: 'Beta–binomial update',
        prompt: r`<p>Prior \(p \sim \text{Beta}(2,2)\). You observe 7 successes in 10 trials. Give the posterior parameters, posterior mean, and posterior mode.</p>`,
        answers: [{ label: 'α', value: 9, tol: 0 }, { label: 'β', value: 5, tol: 0 }, { label: 'Mean', value: 9 / 14 }, { label: 'Mode', value: 2 / 3 }],
        solution: r`<p>Posterior is Beta(2+7, 2+3) = Beta(9, 5).</p>\[ \text{mean} = \frac{9}{14} \approx 0.643,\qquad \text{mode} = \frac{9-1}{9+5-2} = \frac{8}{12} \approx 0.667. \]`
      },
      {
        id: 'b2', topic: 'conj', level: 1, title: 'Gamma–Poisson update',
        prompt: r`<p>Prior \(\lambda \sim \text{Gamma}(3, \text{rate } 1)\). Four Poisson counts sum to 12. Find the posterior mean and variance of \(\lambda\).</p>`,
        answers: [{ label: 'Mean', value: 3 }, { label: 'Variance', value: 0.6 }],
        solution: r`<p>Posterior Gamma(3 + 12, rate 1 + 4) = Gamma(15, 5).</p>\[ E = 15/5 = 3,\qquad \text{Var} = 15/25 = 0.6. \]`
      },
      {
        id: 'b3', topic: 'conj', level: 2, title: 'Normal–normal update',
        prompt: r`<p>Prior \(\mu \sim N(100, 10^2)\). Data: \(n = 25\), \(\bar x = 110\), known \(\sigma = 15\). Find the posterior mean and SD of \(\mu\).</p>`,
        answers: [{ label: 'Posterior mean', value: 109.1743 }, { label: 'Posterior SD', value: 2.873479 }],
        hint: 'Precisions add; the posterior mean is a precision-weighted average.',
        solution: r`<p>Prior precision \(1/100 = 0.01\). Data precision \(25/225 = 0.1111\). Total 0.1211.</p>\[ \mu_{post} = \frac{0.01(100) + 0.1111(110)}{0.1211} \approx 109.17,\qquad SD = 1/\sqrt{0.1211} \approx 2.87. \]`
      },
      {
        id: 'b4', topic: 'conj', level: 2, title: 'Jeffreys prior',
        prompt: r`<p>What is the Jeffreys prior for a Bernoulli probability \(p\)?</p>`,
        choices: ['Uniform(0,1) = Beta(1,1)', 'Beta(1/2, 1/2)', 'Beta(0, 0)', 'N(0.5, 1)'],
        correct: 1,
        solution: r`\[ \pi(p) \propto \sqrt{I(p)} = [p(1-p)]^{-1/2}, \]<p>which is the Beta(1/2, 1/2) kernel.</p>`
      },
      {
        id: 'b5', topic: 'summ', level: 2, title: 'Posterior predictive',
        prompt: r`<p>With posterior Beta(9, 5), find the probability that the next trial is a success, and that the next two are both successes.</p>`,
        answers: [{ label: 'P(next success)', value: 9 / 14 }, { label: 'P(next two successes)', value: 90 / 210 }],
        solution: r`\[ P(\text{next}) = E[p] = \frac9{14},\qquad P(\text{two}) = E[p^2] = \frac{9\cdot10}{14\cdot15} = \frac37 \approx 0.4286. \]<p>This is not \((9/14)^2\), because uncertainty in \(p\) induces dependence.</p>`
      },
      {
        id: 'b6', topic: 'summ', level: 2, title: 'Discrete prior',
        prompt: r`<p>A coin's heads probability is 0.2, 0.5, or 0.8, each with prior 1/3. You observe 3 heads in 4 tosses. Find the posterior probability that \(p = 0.8\).</p>`,
        answers: [{ label: 'P(p = 0.8 | data)', value: 0.597782 }],
        solution: r`<p>Likelihoods \(\propto p^3(1-p)\): 0.0064, 0.0625, 0.1024.</p>\[ P(0.8\mid\text{data}) = \frac{0.1024}{0.0064+0.0625+0.1024} \approx 0.598. \]`
      },
      {
        id: 'b7', topic: 'summ', level: 1, title: 'Loss functions and Bayes estimators',
        prompt: r`<p>Under absolute-error loss \(L(\theta, a) = |\theta - a|\), the Bayes estimator is the posterior…</p>`,
        choices: ['mean', 'median', 'mode', 'variance'],
        correct: 1,
        solution: r`<p>Squared error gives the posterior mean, absolute error the median, and 0–1 loss the mode (MAP).</p>`
      },
      {
        id: 'b8', topic: 'summ', level: 1, title: 'Credible vs confidence intervals',
        prompt: r`<p>Which statement correctly describes a 95% Bayesian credible interval (a, b)?</p>`,
        choices: [
          '95% of repeated intervals would contain θ.',
          'Given the data and prior, P(a < θ < b) = 0.95.',
          'θ is fixed, so no probability statement is possible.',
          'It is always identical to the frequentist CI.'
        ],
        correct: 1,
        solution: r`<p>In the Bayesian view θ is random, and the credible interval is a direct posterior probability statement.</p>`
      },
      {
        id: 'b9', topic: 'compare', level: 2, title: 'Bayes factor for two coins',
        prompt: r`<p>H₁: the coin is fair. H₂: \(p = 0.8\). You see 8 heads in 10 tosses. Compute \(BF_{21}\) and \(P(H_2\mid\text{data})\) with equal prior odds.</p>`,
        answers: [{ label: 'BF₂₁', value: 6.871948 }, { label: 'P(H₂ | data)', value: 0.872967 }],
        solution: r`\[ BF_{21} = \frac{0.8^8(0.2)^2}{0.5^{10}} \approx 6.87,\qquad P(H_2\mid D) = \frac{6.87}{1+6.87} \approx 0.873. \]`
      },
      {
        id: 'b10', topic: 'mcmc', level: 2, title: 'Metropolis acceptance probability',
        prompt: r`<p>Target \(\pi(x) \propto e^{-x^2/2}\) with a symmetric proposal. From \(x = 1\), the proposal is \(x' = 2\). What is the acceptance probability?</p>`,
        answers: [{ label: 'α', value: 0.22313 }],
        solution: r`\[ \alpha = \min\left(1, \frac{\pi(2)}{\pi(1)}\right) = e^{-(4-1)/2} = e^{-1.5} \approx 0.223. \]`
      },
      {
        id: 'b11', topic: 'mcmc', level: 3, title: 'Gibbs sampling conditionals',
        prompt: r`<p>In a Gibbs sampler for \((X, Y)\) bivariate normal with means 0, variances 1, and correlation \(\rho = 0.6\), the full conditional \(X \mid Y = y\) is normal with what mean (at \(y = 2\)) and variance?</p>`,
        answers: [{ label: 'Mean', value: 1.2 }, { label: 'Variance', value: 0.64 }],
        solution: r`\[ X\mid Y=y \sim N(\rho y,\ 1-\rho^2) = N(1.2,\ 0.64). \]`
      },
      {
        id: 'b12', topic: 'mcmc', level: 2, title: 'Effective sample size',
        prompt: r`<p>An MCMC chain of 10,000 draws has an AR(1)-like autocorrelation with \(\rho = 0.8\). Approximate its effective sample size using \(n\frac{1-\rho}{1+\rho}\).</p>`,
        answers: [{ label: 'ESS', value: 1111.11, tol: 2 }],
        solution: r`\[ 10000\cdot\frac{0.2}{1.8} \approx 1111. \]<p>Strong autocorrelation means far less information than the raw draw count.</p>`
      }
    ]
  });
})();
