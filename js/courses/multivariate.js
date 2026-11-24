(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'multivariate',
    order: 100,
    section: 'degree',
    year: 'Year 4 — Advanced Electives',
    code: 'STAT 450',
    title: 'Multivariate Analysis & Statistical Learning',
    description: 'Random vectors, PCA, Mahalanobis distance, discriminant analysis, regularization, clustering, and evaluating classifiers.',
    topics: [
      { id: 'vec', title: 'Random vectors' },
      { id: 'pca', title: 'PCA & clustering' },
      { id: 'learn', title: 'Prediction & regularization' },
      { id: 'class', title: 'Classification' }
    ],
    problems: [
      {
        id: 'mv1', topic: 'vec', level: 1, title: 'Variance of a linear combination',
        prompt: r`<p>\(\Sigma = \begin{pmatrix}4 & 1\\ 1 & 9\end{pmatrix}\). Find \(\text{Var}(X_1 - X_2) = a^\top\Sigma a\) with \(a = (1,-1)^\top\).</p>`,
        answers: [{ label: 'Variance', value: 11 }],
        solution: r`\[ a^\top\Sigma a = 4 + 9 - 2(1) = 11. \]`
      },
      {
        id: 'mv2', topic: 'vec', level: 2, title: 'Mahalanobis distance',
        prompt: r`<p>\(\Sigma = \begin{pmatrix}2 & 1\\ 1 & 2\end{pmatrix}\), \(x - \mu = (1, 1)^\top\). Compute the squared Mahalanobis distance.</p>`,
        answers: [{ label: 'D²', value: 2 / 3 }],
        solution: r`\[ \Sigma^{-1} = \frac13\begin{pmatrix}2 & -1\\ -1 & 2\end{pmatrix},\quad D^2 = \frac13(2 - 1 - 1 + 2) = \frac23. \]<p>Compare the Euclidean value of 2: moving along the correlated direction is "cheap".</p>`
      },
      {
        id: 'mv3', topic: 'pca', level: 2, title: 'Principal components',
        prompt: r`<p>A covariance matrix is \(\begin{pmatrix}5 & 2\\ 2 & 2\end{pmatrix}\). Find the eigenvalues and the proportion of variance explained by PC1.</p>`,
        answers: [{ label: 'λ₁', value: 6 }, { label: 'λ₂', value: 1 }, { label: 'Proportion (PC1)', value: 6 / 7 }],
        solution: r`<p>Trace 7, determinant 6, so \(\lambda^2 - 7\lambda + 6 = 0\) gives \(\lambda = 6, 1\). PC1 explains \(6/7 \approx 85.7\%\).</p>`
      },
      {
        id: 'mv4', topic: 'pca', level: 1, title: 'One k-means iteration',
        prompt: r`<p>Points on a line: 1, 2, 6, 8, 9. Initial centroids 1 and 9. After one assignment and update step, what are the new centroids?</p>`,
        answers: [{ label: 'Centroid 1', value: 1.5 }, { label: 'Centroid 2', value: 23 / 3 }],
        solution: r`<p>Assign: {1, 2} → c₁. 6 is 5 from c₁ and 3 from c₂, so {6, 8, 9} → c₂. Update: \(c_1 = 1.5\), \(c_2 = 23/3 \approx 7.67\).</p>`
      },
      {
        id: 'mv5', topic: 'pca', level: 1, title: 'Should you standardize before PCA?',
        prompt: r`<p>Variables are income (dollars) and age (years). Running PCA on the covariance matrix will…</p>`,
        choices: [
          'treat both variables equally',
          'be dominated by income because of its much larger variance',
          'be dominated by age',
          'give the same result as on the correlation matrix'
        ],
        correct: 1,
        solution: r`<p>PCA maximizes variance, so it depends on units. Standardize (use the correlation matrix) when the scales are not comparable.</p>`
      },
      {
        id: 'mv6', topic: 'learn', level: 1, title: 'Bias–variance decomposition',
        prompt: r`<p>At a point \(x_0\), a model has bias 2 and variance 3, and the irreducible noise variance is 1. What is the expected squared prediction error?</p>`,
        answers: [{ label: 'Expected error', value: 8 }],
        solution: r`\[ \text{Bias}^2 + \text{Var} + \sigma^2 = 4 + 3 + 1 = 8. \]`
      },
      {
        id: 'mv7', topic: 'learn', level: 2, title: 'Ridge and lasso with orthonormal predictors',
        prompt: r`<p>With orthonormal \(X\), OLS gives \(\hat\beta_1 = 4\) and \(\hat\beta_2 = 1\). Ridge (penalty \(\lambda\|\beta\|_2^2\), objective \(\|y-X\beta\|^2 + \lambda\|\beta\|^2\)) with \(\lambda = 1\) scales each by \(1/(1+\lambda)\). Lasso (\(\tfrac12\|y-X\beta\|^2 + \lambda\|\beta\|_1\)) with \(\lambda = 1.5\) soft-thresholds. Find ridge \(\hat\beta_1\) and lasso \(\hat\beta_1, \hat\beta_2\).</p>`,
        answers: [{ label: 'Ridge β̂₁', value: 2 }, { label: 'Lasso β̂₁', value: 2.5 }, { label: 'Lasso β̂₂', value: 0, tol: 0.001 }],
        solution: r`<p>Ridge: \(4/2 = 2\). Lasso: \(\text{sign}(b)(|b| - 1.5)_+\), giving \(2.5\) and \(0\). The lasso sets small coefficients exactly to zero.</p>`
      },
      {
        id: 'mv8', topic: 'learn', level: 2, title: 'Data leakage in cross-validation',
        prompt: r`<p>You select the 20 genes most correlated with the outcome using <em>all</em> data, then run 10-fold CV on a model using those genes. The CV error will likely be:</p>`,
        choices: ['unbiased', 'optimistically low', 'pessimistically high', 'unaffected because CV is used'],
        correct: 1,
        solution: r`<p>Feature selection must happen inside each training fold. Otherwise the held-out folds influenced the model, which biases the error estimate downward.</p>`
      },
      {
        id: 'mv9', topic: 'class', level: 1, title: 'Confusion matrix metrics',
        prompt: r`<p>TP = 40, FN = 10, FP = 20, TN = 130. Compute accuracy, precision, recall, and F1.</p>`,
        answers: [{ label: 'Accuracy', value: 0.85 }, { label: 'Precision', value: 2 / 3 }, { label: 'Recall', value: 0.8 }, { label: 'F1', value: 0.727273 }],
        solution: r`\[ \text{Acc} = \frac{170}{200} = 0.85,\quad \text{Prec} = \frac{40}{60},\quad \text{Rec} = \frac{40}{50} = 0.8,\quad F_1 = \frac{2PR}{P+R} \approx 0.727. \]`
      },
      {
        id: 'mv10', topic: 'class', level: 3, title: 'LDA decision boundary with unequal priors',
        prompt: r`<p>One-dimensional LDA: class 0 has mean 0, class 1 has mean 4, common variance 1, and priors \(\pi_0 = 0.75\), \(\pi_1 = 0.25\). Find the decision boundary.</p>`,
        answers: [{ label: 'Boundary x', value: 2.274653 }],
        solution: r`\[ x^* = \frac{\mu_0+\mu_1}{2} + \frac{\sigma^2\ln(\pi_0/\pi_1)}{\mu_1-\mu_0} = 2 + \frac{\ln3}{4} \approx 2.275. \]<p>The boundary shifts toward the rarer class.</p>`
      }
    ]
  });
})();
