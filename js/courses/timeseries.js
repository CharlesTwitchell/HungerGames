(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'timeseries',
    order: 80,
    section: 'degree',
    year: 'Year 4 — Advanced Electives',
    code: 'STAT 430',
    title: 'Time Series Analysis',
    description: 'Stationarity, autocorrelation, AR/MA/ARIMA models, forecasting, and smoothing.',
    topics: [
      { id: 'basics', title: 'Stationarity & ACF' },
      { id: 'arma', title: 'AR & MA models' },
      { id: 'forecast', title: 'Forecasting & smoothing' }
    ],
    problems: [
      {
        id: 'ts1', topic: 'arma', level: 1, title: 'AR(1) variance and autocorrelation',
        prompt: r`<p>\(X_t = 0.6X_{t-1} + \varepsilon_t\), with \(\varepsilon_t\) white noise of variance 1. Find \(\text{Var}(X_t)\) and \(\rho(2)\).</p>`,
        answers: [{ label: 'Var', value: 1.5625 }, { label: 'ρ(2)', value: 0.36 }],
        solution: r`\[ \gamma_0 = \frac{\sigma^2}{1-\phi^2} = \frac1{0.64} = 1.5625,\qquad \rho(h) = \phi^h,\ \rho(2) = 0.36. \]`
      },
      {
        id: 'ts2', topic: 'arma', level: 1, title: 'MA(1) autocorrelation',
        prompt: r`<p>\(X_t = \varepsilon_t + 0.5\varepsilon_{t-1}\). Find \(\rho(1)\) and \(\rho(2)\).</p>`,
        answers: [{ label: 'ρ(1)', value: 0.4 }, { label: 'ρ(2)', value: 0, tol: 0.001 }],
        solution: r`\[ \rho(1) = \frac{\theta}{1+\theta^2} = \frac{0.5}{1.25} = 0.4,\qquad \rho(h) = 0 \text{ for } h \ge 2. \]<p>The ACF of an MA(q) cuts off after lag q.</p>`
      },
      {
        id: 'ts3', topic: 'arma', level: 2, title: 'Is this AR(2) stationary?',
        prompt: r`<p>\(X_t = 1.2X_{t-1} - 0.5X_{t-2} + \varepsilon_t\). Is it stationary?</p>`,
        choices: [
          'No: the coefficients sum to more than 1.',
          'Yes: the roots of 1 − 1.2z + 0.5z² lie outside the unit circle.',
          'No: φ₁ > 1.',
          'It depends on the noise variance.'
        ],
        correct: 1,
        solution: r`<p>The roots of \(0.5z^2 - 1.2z + 1 = 0\) are \(z = 1.2 \pm 0.748i\) with modulus \(\sqrt{1/0.5} \approx 1.414 > 1\). Equivalently, the AR(2) triangle conditions \(\phi_1+\phi_2<1\), \(\phi_2-\phi_1<1\), \(|\phi_2|<1\) all hold. Stationary, with damped oscillating ACF.</p>`
      },
      {
        id: 'ts4', topic: 'arma', level: 1, title: 'Identifying a model from ACF/PACF',
        prompt: r`<p>The sample ACF decays gradually while the PACF cuts off sharply after lag 2. Which model is suggested?</p>`,
        choices: ['MA(2)', 'AR(2)', 'ARMA(1,1)', 'White noise'],
        correct: 1,
        solution: r`<p>AR(p): the PACF cuts off after p and the ACF tails off. MA(q) is the reverse.</p>`
      },
      {
        id: 'ts5', topic: 'basics', level: 1, title: 'Random walk',
        prompt: r`<p>\(X_t = X_{t-1} + \varepsilon_t\), \(X_0 = 0\), \(\sigma = 2\). What is \(\text{Var}(X_{25})\)? Is the process stationary?</p>`,
        answers: [{ label: 'Var(X₂₅)', value: 100 }],
        solution: r`<p>\(\text{Var}(X_t) = t\sigma^2 = 25\cdot4 = 100\). It grows with \(t\), so the process is not stationary. Differencing it gives white noise.</p>`
      },
      {
        id: 'ts6', topic: 'basics', level: 2, title: 'Sample autocorrelation',
        prompt: r`<p>Compute the lag-1 sample autocorrelation \(r_1 = \frac{\sum_{t=1}^{n-1}(x_t-\bar x)(x_{t+1}-\bar x)}{\sum_t(x_t-\bar x)^2}\) for the series 1, 3, 2, 4.</p>`,
        answers: [{ label: 'r₁', value: -0.35 }],
        solution: r`<p>\(\bar x = 2.5\). Deviations: −1.5, 0.5, −0.5, 1.5. Denominator 5. Numerator \((-1.5)(0.5) + (0.5)(-0.5) + (-0.5)(1.5) = -1.75\). So \(r_1 = -0.35\).</p>`
      },
      {
        id: 'ts7', topic: 'forecast', level: 2, title: 'AR(1) forecasting',
        prompt: r`<p>\(X_t - 10 = 0.8(X_{t-1} - 10) + \varepsilon_t\), \(\sigma^2 = 4\). Given \(X_T = 15\), find the 1-step and 3-step forecasts and the 2-step forecast error variance.</p>`,
        answers: [{ label: '1-step', value: 14 }, { label: '3-step', value: 12.56 }, { label: '2-step error variance', value: 6.56 }],
        solution: r`\[ \hat X_{T+h} = 10 + 0.8^h(5):\quad h=1: 14,\quad h=3: 10 + 0.512(5) = 12.56 \]\[ \text{Var}(e_{T+2}) = \sigma^2(1 + \phi^2) = 4(1.64) = 6.56. \]`
      },
      {
        id: 'ts8', topic: 'forecast', level: 1, title: 'Simple exponential smoothing',
        prompt: r`<p>With \(\alpha = 0.3\), the previous forecast was 50 and the actual value was 60. What is the next forecast?</p>`,
        answers: [{ label: 'Forecast', value: 53 }],
        solution: r`\[ F_{t+1} = \alpha y_t + (1-\alpha)F_t = 0.3(60) + 0.7(50) = 53. \]`
      },
      {
        id: 'ts9', topic: 'forecast', level: 2, title: 'Ljung–Box degrees of freedom',
        prompt: r`<p>After fitting an ARMA(1,1), you run a Ljung–Box test on the residuals using 10 lags. How many degrees of freedom does the reference \(\chi^2\) have?</p>`,
        answers: [{ label: 'df', value: 8, tol: 0 }],
        solution: r`<p>\(h - p - q = 10 - 1 - 1 = 8\).</p>`
      }
    ]
  });
})();
