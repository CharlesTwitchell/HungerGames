# Odds in Your Favor: Statistics & Probability Practice

A static practice-problem site for statistics and probability. It covers the common problems from a **stats minor**, the core and elective courses of a full **undergraduate statistics degree**, and a **history** section on the people and problems that shaped the field.

Every problem has:

- a difficulty level (Intro / Core / Advanced) and a topic tag
- an optional hint and a full worked solution (math rendered with KaTeX)
- instant answer checking: numeric answers are accepted within a tolerance (`0.25`, `1/4` and `25%` all work), and some problems are multiple choice
- progress tracking that is saved in your browser

## Contents

| Section | Course | Topics |
|---|---|---|
| Stats Minor | Common Stats Minor Problems | Descriptive stats, probability rules, discrete distributions, normal, CLT, CIs, hypothesis tests, two-sample, chi-square, regression |
| Year 2 | STAT 310 Probability Theory | Counting, conditioning, continuous & joint RVs, expectation, MGFs, limit theorems |
| Year 2 | STAT 320 Mathematical Statistics | MoM & MLE, bias/MSE/CRLB, sufficiency & UMVUE, pivots, Neyman–Pearson & LRT, delta method |
| Year 3 | STAT 330 Regression & Linear Models | SLR inference, multiple regression, matrix form, diagnostics, AIC/BIC, logistic regression |
| Year 3 | STAT 340 Experimental Design & ANOVA | One-way ANOVA, contrasts, Tukey/Bonferroni, factorial & 2ᵏ designs, blocking |
| Year 3 | STAT 350 Categorical Data Analysis | RR & odds ratios, X²/G², McNemar, Fisher's exact, Simpson's paradox, Poisson regression |
| Year 3 | STAT 360 Statistical Computing | Inverse transform, rejection sampling, Monte Carlo, bootstrap, Newton–Raphson, EM |
| Year 3 | STAT 370 Sampling & Survey Methods | SRS with FPC, stratified & cluster sampling, ratio & Horvitz–Thompson estimators, bias |
| Year 4 | STAT 410 Nonparametric Statistics | Sign, Wilcoxon, Mann–Whitney, Kruskal–Wallis, Spearman, permutation, runs, KS |
| Year 4 | STAT 420 Bayesian Statistics | Conjugate models, posterior prediction, Bayes factors, Metropolis & Gibbs |
| Year 4 | STAT 430 Time Series | AR/MA/ARMA, stationarity, ACF/PACF, forecasting, smoothing |
| Year 4 | STAT 440 Stochastic Processes | Markov chains, gambler's ruin, Poisson processes, queues, branching, Brownian motion |
| Year 4 | STAT 450 Multivariate & Statistical Learning | Mahalanobis, PCA, k-means, bias–variance, ridge/lasso, LDA, classifier metrics |
| History | History of Probability & Statistics | 38 trivia questions from Cardano and Pascal–Fermat to the bootstrap and MCMC, plus 7 classic historical problems (de Méré, problem of points, Newton–Pepys, Buffon's needle, horse kicks, Galton board, Benford) |

## Running it

There is no build step. Open `index.html` through any static server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish with **GitHub Pages**, go to *Settings → Pages* and deploy from the branch root. KaTeX is bundled in `vendor/katex`, so the site has no external dependencies.

## Adding problems

Each course lives in `js/courses/<course>.js` and registers itself in `window.STATS.courses`. A problem looks like:

```js
{
  id: 'p3', topic: 'prob', level: 2,               // level: 1 Intro, 2 Core, 3 Advanced
  title: "Bayes' rule: a medical test",
  prompt: r`<p>... \(P(D \mid +)\) ...</p>`,      // HTML; math in \( \) or \[ \]
  answers: [{ label: 'P(disease | +)', value: 0.0876, tol: 0.001 }],  // tol optional (default 1% relative)
  // or: choices: ['A', 'B', 'C'], correct: 1,
  hint: r`...`,
  solution: r`...`
}
```

`r` is `String.raw`, so LaTeX backslashes don't need escaping. To add a whole new course, create a new file and add a `<script>` tag for it in `index.html`.
