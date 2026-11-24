(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'regression',
    order: 30,
    section: 'degree',
    year: 'Year 3 — Core Methods',
    code: 'STAT 330',
    title: 'Regression & Linear Models',
    description: 'Simple and multiple regression, matrix formulation, inference, diagnostics, model selection, and logistic regression.',
    topics: [
      { id: 'slr', title: 'Simple regression inference' },
      { id: 'mlr', title: 'Multiple regression' },
      { id: 'matrix', title: 'Matrix form' },
      { id: 'diag', title: 'Diagnostics' },
      { id: 'select', title: 'Model selection' },
      { id: 'glm', title: 'Logistic regression' }
    ],
    problems: [
      {
        id: 'lr1', topic: 'slr', level: 1, title: 'Inference for the slope',
        prompt: r`<p>A regression on \(n = 20\) points gives \(b_1 = 2.5\) with \(SE(b_1) = 0.8\). Find the t statistic for \(H_0:\beta_1 = 0\) and a 95% CI for \(\beta_1\).</p>`,
        answers: [{ label: 't', value: 3.125 }, { label: 'CI lower', value: 0.8193, tol: 0.01 }, { label: 'CI upper', value: 4.1807, tol: 0.01 }],
        solution: r`<p>\(t = 2.5/0.8 = 3.125\) on 18 df (\(p \approx 0.006\)). With \(t^*_{18} = 2.101\):</p>\[ 2.5 \pm 2.101(0.8) = (0.819,\ 4.181). \]`
      },
      {
        id: 'lr2', topic: 'slr', level: 2, title: 'Confidence vs prediction intervals',
        prompt: r`<p>At a given \(x_0\), how does the 95% prediction interval for a new \(y\) compare with the 95% confidence interval for the mean response \(E[Y\mid x_0]\)?</p>`,
        choices: [
          'They are identical.',
          'The prediction interval is wider because it adds the variance of an individual error term.',
          'The confidence interval is wider because it covers all x.',
          'The prediction interval is narrower for large n.'
        ],
        correct: 1,
        solution: r`\[ \text{PI: } \hat y_0 \pm t^* s\sqrt{1 + \tfrac1n + \tfrac{(x_0-\bar x)^2}{S_{xx}}},\qquad \text{CI: } \hat y_0 \pm t^* s\sqrt{\tfrac1n + \tfrac{(x_0-\bar x)^2}{S_{xx}}} \]<p>The extra "1" keeps the PI from shrinking to zero width even as \(n \to \infty\).</p>`
      },
      {
        id: 'lr3', topic: 'mlr', level: 2, title: 'Reading an ANOVA table',
        prompt: r`<p>A model with \(p = 2\) predictors on \(n = 27\) observations has SSR = 300 and SSE = 200. Find \(R^2\), adjusted \(R^2\), the residual standard error \(s\), and the overall F statistic.</p>`,
        answers: [{ label: 'R²', value: 0.6 }, { label: 'Adjusted R²', value: 0.566667 }, { label: 's', value: 2.886751 }, { label: 'F', value: 18 }],
        solution: r`<p>SST = 500, so \(R^2 = 0.6\). Error df = \(27 - 3 = 24\), MSE = \(200/24 = 8.333\), \(s = 2.887\).</p>
\[ R^2_{adj} = 1 - \frac{200/24}{500/26} = 0.567,\qquad F = \frac{300/2}{8.333} = 18. \]`
      },
      {
        id: 'lr4', topic: 'mlr', level: 2, title: 'Interaction with an indicator',
        prompt: r`<p>Fitted model: \(\widehat{\text{salary}} = 40 + 2.5\,\text{exp} + 6\,\text{grad} + 0.5\,\text{exp}\times\text{grad}\) (in $1000s; grad = 1 for a graduate degree). Predict salary for a graduate with 10 years of experience, and give the experience slope for graduates.</p>`,
        answers: [{ label: 'Predicted salary (thousands)', value: 76 }, { label: 'Slope for grads', value: 3 }],
        solution: r`<p>\(40 + 25 + 6 + 5 = 76\), i.e. $76k. For grads the slope on experience is \(2.5 + 0.5 = 3.0\) per year.</p>`
      },
      {
        id: 'lr5', topic: 'mlr', level: 2, title: 'Partial F-test',
        prompt: r`<p>A full model with 5 predictors (\(n = 50\)) has SSE = 150. Dropping 2 predictors gives SSE = 180. Test whether the 2 predictors are jointly needed: compute F.</p>`,
        answers: [{ label: 'F', value: 4.4 }],
        solution: r`\[ F = \frac{(180-150)/2}{150/(50-6)} = \frac{15}{3.409} = 4.4 \sim F_{2,44},\quad p \approx 0.018. \]<p>Keep the predictors.</p>`
      },
      {
        id: 'lr6', topic: 'matrix', level: 2, title: 'Least squares in matrix form',
        prompt: r`<p>For \(x = 1,2,3,4\) and \(y = 2,5,5,8\), with design matrix \(X = [\mathbf 1, x]\):</p>\[ X^\top X = \begin{pmatrix}4 & 10\\ 10 & 30\end{pmatrix},\quad X^\top y = \begin{pmatrix}20\\59\end{pmatrix}. \]<p>Compute \(\hat\beta = (X^\top X)^{-1}X^\top y\).</p>`,
        answers: [{ label: 'β̂₀', value: 0.5 }, { label: 'β̂₁', value: 1.8 }],
        solution: r`\[ (X^\top X)^{-1} = \frac1{20}\begin{pmatrix}30 & -10\\ -10 & 4\end{pmatrix},\quad \hat\beta = \frac1{20}\begin{pmatrix}600-590\\ -200+236\end{pmatrix} = \begin{pmatrix}0.5\\1.8\end{pmatrix}. \]`
      },
      {
        id: 'lr7', topic: 'matrix', level: 3, title: 'Properties of the hat matrix',
        prompt: r`<p>Let \(H = X(X^\top X)^{-1}X^\top\) for an \(n\times p\) full-rank \(X\). What is \(\text{tr}(H)\)?</p>`,
        choices: [r`\(n\)`, r`\(p\)`, r`\(n-p\)`, r`\(1\)`],
        correct: 1,
        solution: r`\[ \text{tr}(H) = \text{tr}\big((X^\top X)^{-1}X^\top X\big) = \text{tr}(I_p) = p. \]<p>So the average leverage is \(p/n\).</p>`
      },
      {
        id: 'lr8', topic: 'diag', level: 2, title: 'Leverage of an extreme x',
        prompt: r`<p>Simple regression with \(x = 1, 2, 3, 4, 10\). Compute the leverage \(h_{ii}\) of the point at \(x = 10\). Is it above the \(2p/n\) rule of thumb?</p>`,
        answers: [{ label: 'h', value: 0.92 }],
        solution: r`<p>\(\bar x = 4\), \(S_{xx} = 9+4+1+0+36 = 50\).</p>\[ h = \frac1n + \frac{(x_i-\bar x)^2}{S_{xx}} = 0.2 + \frac{36}{50} = 0.92 > \frac{2(2)}{5} = 0.8. \]<p>Very high leverage.</p>`
      },
      {
        id: 'lr9', topic: 'diag', level: 1, title: 'Variance inflation factor',
        prompt: r`<p>Regressing predictor \(x_j\) on the other predictors gives \(R_j^2 = 0.9\). What is VIF\(_j\), and by what factor is \(SE(\hat\beta_j)\) inflated?</p>`,
        answers: [{ label: 'VIF', value: 10 }, { label: 'SE inflation factor', value: Math.sqrt(10) }],
        solution: r`\[ \text{VIF} = \frac1{1-R_j^2} = 10,\qquad \text{SE inflated by } \sqrt{10} \approx 3.16. \]`
      },
      {
        id: 'lr10', topic: 'diag', level: 1, title: 'Residual plot patterns',
        prompt: r`<p>A residuals-vs-fitted plot shows a funnel shape: spread grows with fitted values. Which assumption is violated, and what is a common fix?</p>`,
        choices: [
          'Linearity; add a quadratic term',
          'Constant variance; transform y (e.g., log) or use weighted least squares',
          'Independence; use a paired test',
          'Normality; remove outliers'
        ],
        correct: 1,
        solution: r`<p>A funnel shape indicates heteroscedasticity. Variance-stabilizing transforms or WLS help.</p>`
      },
      {
        id: 'lr11', topic: 'diag', level: 2, title: 'Interpreting a log-response model',
        prompt: r`<p>\(\widehat{\ln y} = 1.2 + 0.08x\). By what percent does the predicted \(y\) change when \(x\) increases by 1?</p>`,
        answers: [{ label: 'Percent change', value: 8.3287 }],
        solution: r`<p>Multiplicative change \(e^{0.08} = 1.0833\), i.e. <span class="final">+8.33%</span> (about 8% by the small-coefficient approximation).</p>`
      },
      {
        id: 'lr12', topic: 'select', level: 2, title: 'AIC vs BIC',
        prompt: r`<p>With \(n = 100\): Model A has log-likelihood −120 with 4 parameters; Model B has −116 with 7. Compute AIC for B and BIC for A. Which model does each criterion prefer?</p>`,
        answers: [{ label: 'AIC (B)', value: 246 }, { label: 'BIC (A)', value: 258.42 }],
        solution: r`<p>AIC = \(-2\ell + 2k\): A = 248, B = 246, so AIC prefers B.</p><p>BIC = \(-2\ell + k\ln n\): A = \(240 + 4(4.605) = 258.42\), B = \(232 + 7(4.605) = 264.24\), so BIC prefers A. BIC penalizes complexity more heavily.</p>`
      },
      {
        id: 'lr13', topic: 'glm', level: 2, title: 'Logistic regression predictions',
        prompt: r`<p>\(\text{logit}\,p = -3 + 0.05x\). Find \(p\) at \(x = 80\) and the odds ratio for a 10-unit increase in \(x\).</p>`,
        answers: [{ label: 'p at x = 80', value: 0.731059 }, { label: 'OR per 10 units', value: 1.648721 }],
        solution: r`\[ \eta = -3 + 4 = 1,\quad p = \frac{1}{1+e^{-1}} \approx 0.731,\qquad OR = e^{0.05\cdot10} = e^{0.5} \approx 1.649. \]`
      },
      {
        id: 'lr14', topic: 'glm', level: 3, title: 'Deviance test for logistic models',
        prompt: r`<p>A logistic model has residual deviance 210.4. Adding 3 predictors reduces it to 198.1. What is the test statistic and its reference distribution?</p>`,
        answers: [{ label: 'Statistic', value: 12.3 }],
        solution: r`<p>The drop in deviance is \(210.4 - 198.1 = 12.3\), compared with \(\chi^2_3\) (critical value 7.81 at 5%, \(p \approx 0.006\)). The added predictors help.</p>`
      }
    ]
  });
})();
