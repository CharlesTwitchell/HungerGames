(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'minor',
    order: 0,
    section: 'minor',
    code: 'Stats Minor Core',
    title: 'Common Stats Minor Problems',
    description: 'The problems that show up again and again in intro stats, elementary probability, and applied statistics courses. Start here if you are minoring in statistics or brushing up.',
    topics: [
      { id: 'desc', title: 'Descriptive statistics' },
      { id: 'prob', title: 'Probability rules' },
      { id: 'rv', title: 'Discrete distributions' },
      { id: 'normal', title: 'Normal distribution' },
      { id: 'clt', title: 'Sampling distributions & CLT' },
      { id: 'ci', title: 'Confidence intervals' },
      { id: 'test', title: 'Hypothesis tests' },
      { id: 'two', title: 'Comparing two groups' },
      { id: 'chisq', title: 'Chi-square tests' },
      { id: 'reg', title: 'Correlation & regression' }
    ],
    problems: [
      /* ---------------- Descriptive ---------------- */
      {
        id: 'd1', topic: 'desc', level: 1, title: 'Mean, median, and standard deviation',
        prompt: r`<p>A sample of eight quiz scores is: 4, 8, 6, 5, 3, 7, 9, 6.</p><p>Find the sample mean, the median, and the sample standard deviation \(s\).</p>`,
        answers: [{ label: r`Mean \(\bar x\)`, value: 6 }, { label: 'Median', value: 6 }, { label: r`\(s\)`, value: 2 }],
        hint: r`For \(s\), divide the sum of squared deviations by \(n-1\), not \(n\).`,
        solution: r`<p>\(\bar x = 48/8 = 6\). Sorted: 3, 4, 5, 6, 6, 7, 8, 9, so the median is \((6+6)/2 = 6\).</p>
<p>Deviations: \(-3,-2,-1,0,0,1,2,3\); squares sum to \(9+4+1+0+0+1+4+9=28\).</p>
\[ s^2 = \frac{28}{8-1} = 4, \qquad s = 2. \]`
      },
      {
        id: 'd2', topic: 'desc', level: 1, title: 'Quartiles, IQR, and outliers',
        prompt: r`<p>Commute times (minutes) for 10 people: 12, 15, 17, 18, 20, 21, 22, 25, 27, 48.</p><p>Using the "median of each half" method for quartiles, find the IQR and the upper fence \(Q_3 + 1.5\,\text{IQR}\). Is 48 an outlier?</p>`,
        answers: [{ label: 'IQR', value: 8 }, { label: 'Upper fence', value: 37 }],
        hint: 'With n = 10, the lower half is the first five values and the upper half is the last five.',
        solution: r`<p>Lower half 12, 15, <b>17</b>, 18, 20 gives \(Q_1 = 17\). Upper half 21, 22, <b>25</b>, 27, 48 gives \(Q_3 = 25\).</p>
\[ \text{IQR} = 25 - 17 = 8,\qquad Q_3 + 1.5(8) = 37. \]
<p>Since \(48 > 37\), <span class="final">48 is an outlier</span>. (The lower fence is \(17 - 12 = 5\), so no low outliers.)</p>`
      },
      {
        id: 'd3', topic: 'desc', level: 1, title: 'Comparing with z-scores',
        prompt: r`<p>Ana scores 86 on an exam with mean 72 and SD 8. Ben scores 75 on a different exam with mean 65 and SD 5. Compute each z-score. Who did better relative to their class?</p>`,
        answers: [{ label: 'Ana z', value: 1.75 }, { label: 'Ben z', value: 2 }],
        solution: r`\[ z_A = \frac{86-72}{8} = 1.75, \qquad z_B = \frac{75-65}{5} = 2.00. \]<p><span class="final">Ben</span> is further above his class mean in SD units.</p>`
      },
      {
        id: 'd4', topic: 'desc', level: 1, title: 'Linear transformations',
        prompt: r`<p>Daily high temperatures have mean \(20^\circ\)C and SD \(5^\circ\)C. Convert to Fahrenheit using \(F = 1.8C + 32\). What are the new mean and SD?</p>`,
        answers: [{ label: 'Mean (°F)', value: 68 }, { label: 'SD (°F)', value: 9 }],
        hint: 'Adding a constant shifts the center but not the spread. Multiplying scales both.',
        solution: r`\[ \bar F = 1.8(20) + 32 = 68, \qquad s_F = |1.8|\cdot 5 = 9. \]`
      },
      {
        id: 'd5', topic: 'desc', level: 1, title: 'The empirical rule',
        prompt: r`<p>IQ scores are roughly bell-shaped with mean 100 and SD 15. Using the 68–95–99.7 rule, about what percent of people score above 115?</p>`,
        answers: [{ label: 'Percent above 115 (enter as a percent, e.g. 12)', value: 16, tol: 0.5 }],
        solution: r`<p>115 is one SD above the mean. About 68% lie within one SD, leaving 32% in the two tails, so about <span class="final">16%</span> lie above 115.</p>`
      },
      {
        id: 'd6', topic: 'desc', level: 1, title: 'Choosing a center',
        prompt: r`<p>Household incomes in a town are strongly right-skewed. Which summary pair is most appropriate?</p>`,
        choices: ['Mean and standard deviation', 'Median and IQR', 'Mode and range', 'Mean and IQR'],
        correct: 1,
        solution: r`<p>The median and IQR are resistant to skewness and outliers. The mean and SD get pulled toward the long right tail.</p>`
      },

      /* ---------------- Probability ---------------- */
      {
        id: 'p1', topic: 'prob', level: 1, title: 'Addition rule and independence',
        prompt: r`<p>\(P(A) = 0.5\), \(P(B) = 0.4\), \(P(A \cap B) = 0.2\). Find \(P(A \cup B)\) and \(P(A \mid B)\). Are \(A\) and \(B\) independent?</p>`,
        answers: [{ label: r`\(P(A\cup B)\)`, value: 0.7 }, { label: r`\(P(A\mid B)\)`, value: 0.5 }],
        solution: r`\[ P(A\cup B) = 0.5 + 0.4 - 0.2 = 0.7, \qquad P(A\mid B) = \frac{0.2}{0.4} = 0.5. \]<p>Since \(P(A\mid B) = P(A)\) (equivalently \(0.5\times0.4 = 0.2\)), <span class="final">they are independent</span>.</p>`
      },
      {
        id: 'p2', topic: 'prob', level: 1, title: 'Two dice',
        prompt: r`<p>Two fair dice are rolled. Find (a) \(P(\text{sum} = 7)\) and (b) \(P(\text{at least one six})\).</p>`,
        answers: [{ label: '(a)', value: 1 / 6 }, { label: '(b)', value: 11 / 36 }],
        hint: 'For (b), use the complement: no sixes on either die.',
        solution: r`<p>(a) Six of the 36 outcomes sum to 7: \(6/36 = 1/6 \approx 0.1667\).</p><p>(b) \(1 - (5/6)^2 = 11/36 \approx 0.3056\).</p>`
      },
      {
        id: 'p3', topic: 'prob', level: 2, title: "Bayes' rule: a medical test",
        prompt: r`<p>A disease affects 1% of a population. A test has sensitivity 95% (P(+ | disease)) and specificity 90% (P(− | no disease)). If a random person tests positive, what is the probability they have the disease?</p>`,
        answers: [{ label: 'P(disease | +)', value: 0.087558 }],
        hint: 'Find P(+) with the law of total probability first.',
        solution: r`\[ P(+) = 0.01(0.95) + 0.99(0.10) = 0.0095 + 0.099 = 0.1085 \]
\[ P(D\mid +) = \frac{0.0095}{0.1085} \approx 0.0876. \]<p>Only about <span class="final">8.8%</span>. When a condition is rare, most positives are false positives.</p>`
      },
      {
        id: 'p4', topic: 'prob', level: 1, title: 'Reading a two-way table',
        prompt: r`<p>200 students were surveyed:</p>
<table><tr><th></th><th>Drinks coffee</th><th>No coffee</th><th>Total</th></tr>
<tr><th>Stats major</th><td>45</td><td>15</td><td>60</td></tr>
<tr><th>Other major</th><td>70</td><td>70</td><td>140</td></tr>
<tr><th>Total</th><td>115</td><td>85</td><td>200</td></tr></table>
<p>Find \(P(\text{coffee})\) and \(P(\text{stats major} \mid \text{coffee})\).</p>`,
        answers: [{ label: 'P(coffee)', value: 0.575 }, { label: 'P(stats | coffee)', value: 45 / 115 }],
        solution: r`<p>\(P(\text{coffee}) = 115/200 = 0.575\). \(P(\text{stats}\mid\text{coffee}) = 45/115 \approx 0.391\).</p><p>Coffee and major are not independent: \(P(\text{coffee}\mid\text{stats}) = 0.75 \ne 0.575\).</p>`
      },
      {
        id: 'p5', topic: 'prob', level: 1, title: 'Combinations vs permutations',
        prompt: r`<p>A club has 10 members. (a) How many ways can a 3-person committee be chosen? (b) How many ways can a president, VP, and secretary be chosen?</p>`,
        answers: [{ label: '(a) committees', value: 120, tol: 0 }, { label: '(b) officer slates', value: 720, tol: 0 }],
        solution: r`<p>(a) Order doesn't matter: \(\binom{10}{3} = 120\). (b) Order matters: \(10\cdot 9\cdot 8 = 720\).</p>`
      },
      {
        id: 'p6', topic: 'prob', level: 1, title: '"At least one" with complements',
        prompt: r`<p>Each item from a machine is defective independently with probability 0.05. In a batch of 10, what is the probability of at least one defective?</p>`,
        answers: [{ label: 'P(at least one)', value: 0.401263 }],
        solution: r`\[ 1 - P(\text{none}) = 1 - 0.95^{10} \approx 0.4013. \]`
      },

      /* ---------------- Discrete RVs ---------------- */
      {
        id: 'r1', topic: 'rv', level: 1, title: 'Expected value and SD of a distribution',
        prompt: r`<p>\(X\) has the distribution:</p><table><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>P(x)</th><td>0.1</td><td>0.3</td><td>0.4</td><td>0.2</td></tr></table><p>Find \(E[X]\) and \(\text{SD}(X)\).</p>`,
        answers: [{ label: 'E[X]', value: 1.7 }, { label: 'SD(X)', value: 0.9 }],
        solution: r`\[ E[X] = 0(0.1)+1(0.3)+2(0.4)+3(0.2) = 1.7 \]\[ E[X^2] = 0.3 + 1.6 + 1.8 = 3.7,\quad \text{Var}(X) = 3.7 - 1.7^2 = 0.81,\quad \text{SD}=0.9. \]`
      },
      {
        id: 'r2', topic: 'rv', level: 1, title: 'Binomial probabilities',
        prompt: r`<p>A free-throw shooter makes 30% of shots, independently. In 10 attempts, find \(P(X = 3)\), \(P(X \le 2)\), and the SD of \(X\).</p>`,
        answers: [{ label: 'P(X = 3)', value: 0.266828 }, { label: 'P(X ≤ 2)', value: 0.382783 }, { label: 'SD', value: 1.449138 }],
        solution: r`\[ P(X=3) = \binom{10}{3}(0.3)^3(0.7)^7 \approx 0.2668 \]
\[ P(X\le2) = 0.7^{10} + 10(0.3)(0.7)^9 + 45(0.3)^2(0.7)^8 \approx 0.0282 + 0.1211 + 0.2335 = 0.3828 \]
\[ \text{SD} = \sqrt{np(1-p)} = \sqrt{2.1} \approx 1.449. \]`
      },
      {
        id: 'r3', topic: 'rv', level: 1, title: 'Is the game fair?',
        prompt: r`<p>You pay $2 to roll a die. If it shows 6 you receive $10, otherwise nothing. What is your expected net gain per game?</p>`,
        answers: [{ label: 'Expected net gain ($)', value: -1 / 3 }],
        solution: r`\[ E[\text{net}] = \tfrac16(10) - 2 = -\tfrac13 \approx -0.33. \]<p>You lose about 33 cents per play on average.</p>`
      },
      {
        id: 'r4', topic: 'rv', level: 1, title: 'Poisson counts',
        prompt: r`<p>A help desk receives an average of 4 calls per hour (Poisson). Find \(P(\text{exactly 2 calls})\) and \(P(\text{at least 1 call})\) in an hour.</p>`,
        answers: [{ label: 'P(X = 2)', value: 0.146525 }, { label: 'P(X ≥ 1)', value: 0.981684 }],
        solution: r`\[ P(X=2) = \frac{e^{-4}4^2}{2!} = 8e^{-4} \approx 0.1465, \qquad P(X\ge1) = 1 - e^{-4} \approx 0.9817. \]`
      },
      {
        id: 'r5', topic: 'rv', level: 1, title: 'Waiting for a success (geometric)',
        prompt: r`<p>Each sales call succeeds with probability 0.2, independently. What is the probability the first success is on the 3rd call? What is the expected number of calls until the first success?</p>`,
        answers: [{ label: 'P(first success on 3rd)', value: 0.128 }, { label: 'Expected calls', value: 5 }],
        solution: r`\[ P = (0.8)^2(0.2) = 0.128, \qquad E = 1/p = 5. \]`
      },

      /* ---------------- Normal ---------------- */
      {
        id: 'n1', topic: 'normal', level: 1, title: 'Normal tail probability',
        prompt: r`<p>Adult heights are \(N(170, 8)\) cm (mean 170, SD 8). What proportion are taller than 180 cm?</p>`,
        answers: [{ label: 'Proportion', value: 0.10565 }],
        solution: r`\[ z = \frac{180-170}{8} = 1.25,\qquad P(Z>1.25) \approx 0.1056. \]`
      },
      {
        id: 'n2', topic: 'normal', level: 1, title: 'Finding a percentile',
        prompt: r`<p>Test scores are \(N(500, 100)\). What score marks the 90th percentile?</p>`,
        answers: [{ label: 'Score', value: 628.16, tol: 0.5 }],
        solution: r`<p>\(z_{0.90} \approx 1.2816\), so \(x = 500 + 1.2816(100) \approx 628.2\).</p>`
      },
      {
        id: 'n3', topic: 'normal', level: 1, title: 'Probability between two values',
        prompt: r`<p>\(X \sim N(50, 10)\). Find \(P(45 < X < 65)\).</p>`,
        answers: [{ label: 'Probability', value: 0.624655 }],
        solution: r`\[ P(-0.5 < Z < 1.5) = \Phi(1.5) - \Phi(-0.5) \approx 0.9332 - 0.3085 = 0.6247. \]`
      },
      {
        id: 'n4', topic: 'normal', level: 2, title: 'Normal approximation to the binomial',
        prompt: r`<p>A fair coin is flipped 100 times. Use the normal approximation with continuity correction to estimate \(P(X \ge 60)\).</p>`,
        answers: [{ label: 'P(X ≥ 60)', value: 0.028717 }],
        hint: r`\(X \ge 60\) becomes \(X > 59.5\) on the continuous scale.`,
        solution: r`<p>\(\mu = 50\), \(\sigma = \sqrt{100(0.5)(0.5)} = 5\).</p>\[ P(X \ge 60) \approx P\left(Z > \frac{59.5 - 50}{5}\right) = P(Z > 1.9) \approx 0.0287. \]`
      },

      /* ---------------- CLT ---------------- */
      {
        id: 's1', topic: 'clt', level: 1, title: 'Sampling distribution of the mean',
        prompt: r`<p>A population has mean 40 and SD 12. For random samples of size 36, find the standard error of \(\bar X\) and \(P(\bar X > 43)\).</p>`,
        answers: [{ label: 'SE', value: 2 }, { label: 'P(X̄ > 43)', value: 0.066807 }],
        solution: r`\[ SE = \frac{12}{\sqrt{36}} = 2,\qquad P(\bar X>43) = P(Z > 1.5) \approx 0.0668. \]`
      },
      {
        id: 's2', topic: 'clt', level: 1, title: 'Sampling distribution of a proportion',
        prompt: r`<p>60% of voters support a measure. In a random sample of 150, what is the probability the sample proportion is below 0.55?</p>`,
        answers: [{ label: 'P(p̂ < 0.55)', value: 0.10565 }],
        solution: r`\[ SE = \sqrt{\frac{0.6(0.4)}{150}} = 0.04,\qquad z = \frac{0.55-0.60}{0.04} = -1.25,\qquad P \approx 0.1056. \]`
      },
      {
        id: 's3', topic: 'clt', level: 1, title: 'How large a sample?',
        prompt: r`<p>With \(\sigma = 15\), what is the smallest \(n\) that makes the standard error of \(\bar X\) at most 1?</p>`,
        answers: [{ label: 'n', value: 225, tol: 0 }],
        solution: r`\[ 15/\sqrt n \le 1 \iff n \ge 225. \]`
      },
      {
        id: 's4', topic: 'clt', level: 1, title: 'What the CLT does and does not say',
        prompt: r`<p>A population is strongly right-skewed. You take many random samples of size \(n = 50\). Which statement is correct?</p>`,
        choices: [
          'Each individual sample will look approximately normal.',
          'The distribution of sample means will be approximately normal, centered at μ with SD σ/√50.',
          'The population becomes approximately normal as n grows.',
          'The sample means will be skewed right just like the population.'
        ],
        correct: 1,
        solution: r`<p>The CLT is about the <em>sampling distribution of \(\bar X\)</em>, not the data or the population. Individual samples still look skewed.</p>`
      },

      /* ---------------- Confidence intervals ---------------- */
      {
        id: 'c1', topic: 'ci', level: 1, title: 'z-interval for a mean',
        prompt: r`<p>\(n = 25\), \(\bar x = 82\), and \(\sigma = 10\) is known. Construct a 95% confidence interval for \(\mu\).</p>`,
        answers: [{ label: 'Lower', value: 78.08 }, { label: 'Upper', value: 85.92 }],
        solution: r`\[ 82 \pm 1.96\cdot\frac{10}{5} = 82 \pm 3.92 = (78.08,\ 85.92). \]`
      },
      {
        id: 'c2', topic: 'ci', level: 1, title: 't-interval for a mean',
        prompt: r`<p>A sample of 16 batteries has mean life 24.5 h and \(s = 4.0\) h. Give a 95% CI for the mean life.</p>`,
        answers: [{ label: 'Lower', value: 22.369, tol: 0.02 }, { label: 'Upper', value: 26.631, tol: 0.02 }],
        hint: r`Use \(t^*\) with \(df = 15\).`,
        solution: r`<p>\(t^*_{15} = 2.131\), \(SE = 4/\sqrt{16} = 1\).</p>\[ 24.5 \pm 2.131 = (22.37,\ 26.63). \]`
      },
      {
        id: 'c3', topic: 'ci', level: 1, title: 'Interval for a proportion',
        prompt: r`<p>In a poll, 520 of 1000 people favor a proposal. Give a 95% CI for the population proportion.</p>`,
        answers: [{ label: 'Lower', value: 0.48903, tol: 0.001 }, { label: 'Upper', value: 0.55097, tol: 0.001 }],
        solution: r`\[ 0.52 \pm 1.96\sqrt{\frac{0.52(0.48)}{1000}} = 0.52 \pm 0.031 = (0.489,\ 0.551). \]`
      },
      {
        id: 'c4', topic: 'ci', level: 1, title: 'Sample size for a margin of error',
        prompt: r`<p>How many people must be surveyed to estimate a proportion within \(\pm 3\) percentage points with 95% confidence, using the conservative \(p = 0.5\)?</p>`,
        answers: [{ label: 'n', value: 1068, tol: 0 }],
        solution: r`\[ n = \left(\frac{1.96}{0.03}\right)^2 (0.5)(0.5) = 1067.1 \;\Rightarrow\; 1068 \text{ (always round up)}. \]`
      },
      {
        id: 'c5', topic: 'ci', level: 1, title: 'Interpreting a confidence interval',
        prompt: r`<p>A 95% CI for mean sleep is (6.6, 7.2) hours. Which interpretation is correct?</p>`,
        choices: [
          'There is a 95% probability that μ is between 6.6 and 7.2.',
          '95% of students sleep between 6.6 and 7.2 hours.',
          'If we repeated the sampling many times, about 95% of intervals built this way would contain μ.',
          '95% of sample means fall between 6.6 and 7.2.'
        ],
        correct: 2,
        solution: r`<p>Confidence describes the <em>method</em>. Once computed, a specific interval either contains \(\mu\) or it doesn't. The interval is about \(\mu\), not about individual students.</p>`
      },

      /* ---------------- Hypothesis tests ---------------- */
      {
        id: 'h1', topic: 'test', level: 1, title: 'One-sample z-test',
        prompt: r`<p>Test \(H_0: \mu = 100\) vs \(H_a: \mu \ne 100\) with \(\sigma = 15\), \(n = 36\), \(\bar x = 105\). Find the test statistic and p-value.</p>`,
        answers: [{ label: 'z', value: 2 }, { label: 'p-value', value: 0.0455, tol: 0.001 }],
        solution: r`\[ z = \frac{105-100}{15/6} = 2.0,\qquad p = 2P(Z>2) \approx 0.0455. \]<p>Reject \(H_0\) at \(\alpha = 0.05\).</p>`
      },
      {
        id: 'h2', topic: 'test', level: 2, title: 'One-sample t-test',
        prompt: r`<p>Ten bags of chips have mean weight 5.4 oz with \(s = 0.9\). Test \(H_0:\mu = 5\) vs \(H_a:\mu > 5\). Find \(t\) and the p-value.</p>`,
        answers: [{ label: 't', value: 1.40546 }, { label: 'p-value', value: 0.0967, tol: 0.003 }],
        solution: r`\[ t = \frac{5.4-5}{0.9/\sqrt{10}} \approx 1.405,\quad df = 9,\quad p \approx 0.097. \]<p>Fail to reject \(H_0\) at \(\alpha = 0.05\).</p>`
      },
      {
        id: 'h3', topic: 'test', level: 1, title: 'Test for a proportion',
        prompt: r`<p>In 500 coin tosses, 290 are heads. Test whether the coin is fair (two-sided). Give \(z\) and the p-value.</p>`,
        answers: [{ label: 'z', value: 3.5777 }, { label: 'p-value', value: 0.000347, tol: 0.00005 }],
        solution: r`\[ z = \frac{0.58 - 0.5}{\sqrt{0.25/500}} \approx 3.578,\qquad p = 2P(Z > 3.578) \approx 0.00035. \]<p>Strong evidence the coin is not fair.</p>`
      },
      {
        id: 'h4', topic: 'test', level: 1, title: 'Type I and Type II errors',
        prompt: r`<p>A drug company tests \(H_0\): the drug has no effect. A Type II error here means:</p>`,
        choices: [
          'Concluding the drug works when it actually doesn\u2019t.',
          'Concluding the drug doesn\u2019t work when it actually does.',
          'Rejecting H₀ when H₀ is true.',
          'Getting a p-value larger than 0.05.'
        ],
        correct: 1,
        solution: r`<p>A Type II error is failing to reject a false \(H_0\). Here that means missing a real effect.</p>`
      },
      {
        id: 'h5', topic: 'test', level: 2, title: 'Power of a z-test',
        prompt: r`<p>\(H_0:\mu=50\) vs \(H_a:\mu>50\), \(\sigma=10\), \(n=25\), \(\alpha=0.05\). Find the rejection cutoff for \(\bar x\) and the power if the true mean is 54.</p>`,
        answers: [{ label: r`Cutoff for \(\bar x\)`, value: 53.29, tol: 0.02 }, { label: 'Power', value: 0.6388, tol: 0.005 }],
        solution: r`<p>\(SE = 2\). Reject if \(\bar x > 50 + 1.645(2) = 53.29\).</p>\[ \text{Power} = P(\bar X > 53.29 \mid \mu = 54) = P(Z > -0.355) \approx 0.639. \]`
      },

      /* ---------------- Two groups ---------------- */
      {
        id: 't1', topic: 'two', level: 2, title: 'Paired t-test',
        prompt: r`<p>Five people's reaction-time improvement (before − after, ms): 3, 5, −1, 4, 2. Compute the paired t statistic.</p>`,
        answers: [{ label: 't', value: 2.52534 }],
        solution: r`<p>\(\bar d = 2.6\), \(s_d = \sqrt{21.2/4} \approx 2.302\).</p>\[ t = \frac{2.6}{2.302/\sqrt5} \approx 2.525,\quad df = 4. \]<p>One-sided \(p \approx 0.032\).</p>`
      },
      {
        id: 't2', topic: 'two', level: 2, title: "Two-sample (Welch's) t statistic",
        prompt: r`<p>Group 1: \(n=30, \bar x=78, s=10\). Group 2: \(n=35, \bar x=72, s=12\). Compute the standard error of the difference and the t statistic.</p>`,
        answers: [{ label: 'SE', value: 2.72903 }, { label: 't', value: 2.19858 }],
        solution: r`\[ SE = \sqrt{\frac{100}{30} + \frac{144}{35}} \approx 2.729,\qquad t = \frac{6}{2.729} \approx 2.199. \]<p>Welch df ≈ 63, two-sided \(p \approx 0.032\).</p>`
      },
      {
        id: 't3', topic: 'two', level: 2, title: 'Two-proportion z-test',
        prompt: r`<p>45 of 100 in group A and 30 of 100 in group B respond. Test \(H_0: p_A = p_B\) using the pooled proportion. Find \(z\).</p>`,
        answers: [{ label: 'z', value: 2.19089 }],
        solution: r`\[ \hat p = \frac{75}{200} = 0.375,\quad SE = \sqrt{0.375(0.625)\left(\tfrac{1}{100}+\tfrac{1}{100}\right)} \approx 0.0685 \]\[ z = \frac{0.15}{0.0685} \approx 2.19,\quad p \approx 0.028. \]`
      },
      {
        id: 't4', topic: 'two', level: 1, title: 'Paired or independent?',
        prompt: r`<p>Which study calls for a <em>paired</em> analysis?</p>`,
        choices: [
          'Comparing GPAs of 50 randomly chosen freshmen and 50 randomly chosen seniors',
          'Measuring blood pressure on the same 30 patients before and after treatment',
          'Comparing yields from 20 plots given fertilizer A and 20 different plots given B',
          'Comparing commute times of men and women'
        ],
        correct: 1,
        solution: r`<p>Repeated measurements on the same units are paired, so analyze the differences.</p>`
      },

      /* ---------------- Chi-square ---------------- */
      {
        id: 'x1', topic: 'chisq', level: 1, title: 'Goodness of fit: is the die fair?',
        prompt: r`<p>A die is rolled 60 times with counts 8, 12, 9, 11, 6, 14 for faces 1–6. Compute \(\chi^2\) and the p-value.</p>`,
        answers: [{ label: 'χ²', value: 4.2 }, { label: 'p-value', value: 0.521, tol: 0.01 }],
        solution: r`<p>Expected count = 10 for each face.</p>\[ \chi^2 = \frac{4+4+1+1+16+16}{10} = 4.2,\quad df = 5,\quad p \approx 0.52. \]<p>No evidence the die is unfair.</p>`
      },
      {
        id: 'x2', topic: 'chisq', level: 1, title: 'Test of independence (2×2)',
        prompt: r`<table><tr><th></th><th>Improved</th><th>Not improved</th></tr><tr><th>Treatment A</th><td>30</td><td>20</td></tr><tr><th>Treatment B</th><td>20</td><td>30</td></tr></table><p>Compute the chi-square statistic (no continuity correction).</p>`,
        answers: [{ label: 'χ²', value: 4 }],
        solution: r`<p>All expected counts are \(50\cdot50/100 = 25\).</p>\[ \chi^2 = 4\cdot\frac{(5)^2}{25} = 4,\quad df = 1,\quad p \approx 0.0455. \]`
      },
      {
        id: 'x3', topic: 'chisq', level: 1, title: 'Expected cell count',
        prompt: r`<p>In a 2×3 table with grand total 200, a cell's row total is 80 and column total is 50. What is its expected count under independence?</p>`,
        answers: [{ label: 'Expected count', value: 20 }],
        solution: r`\[ E = \frac{80 \times 50}{200} = 20. \]`
      },

      /* ---------------- Regression ---------------- */
      {
        id: 'g1', topic: 'reg', level: 1, title: 'Regression line from summary statistics',
        prompt: r`<p>\(\bar x = 10\), \(s_x = 2\), \(\bar y = 50\), \(s_y = 8\), \(r = 0.75\). Find the slope, intercept, predicted \(y\) at \(x = 12\), and \(R^2\).</p>`,
        answers: [{ label: 'Slope', value: 3 }, { label: 'Intercept', value: 20 }, { label: 'ŷ at x = 12', value: 56 }, { label: 'R²', value: 0.5625 }],
        solution: r`\[ b_1 = r\frac{s_y}{s_x} = 0.75\cdot4 = 3,\quad b_0 = 50 - 3(10) = 20 \]\[ \hat y(12) = 56,\qquad R^2 = 0.75^2 = 0.5625. \]`
      },
      {
        id: 'g2', topic: 'reg', level: 1, title: 'Correlation and least squares by hand',
        prompt: r`<p>Data: \(x = 1,2,3,4,5\); \(y = 2,4,5,4,5\). Find \(r\), the slope, and the intercept.</p>`,
        answers: [{ label: 'r', value: 0.774597 }, { label: 'Slope', value: 0.6 }, { label: 'Intercept', value: 2.2 }],
        solution: r`<p>\(\bar x = 3\), \(\bar y = 4\), \(S_{xy} = 6\), \(S_{xx} = 10\), \(S_{yy} = 6\).</p>\[ r = \frac{6}{\sqrt{60}} \approx 0.775,\quad b_1 = 0.6,\quad b_0 = 4 - 0.6(3) = 2.2. \]`
      },
      {
        id: 'g3', topic: 'reg', level: 1, title: 'Residuals',
        prompt: r`<p>Using \(\hat y = 20 + 3x\), a point has \(x = 12\) and \(y = 60\). What is its residual?</p>`,
        answers: [{ label: 'Residual', value: 4 }],
        solution: r`<p>Residual = observed − predicted = \(60 - 56 = 4\). The point lies above the line.</p>`
      },
      {
        id: 'g4', topic: 'reg', level: 1, title: 'Correlation pitfalls',
        prompt: r`<p>Across cities, the number of ice cream shops is strongly correlated with the number of drownings. What is the best explanation?</p>`,
        choices: [
          'Ice cream causes drowning.',
          'A lurking variable (e.g., population or warm climate) drives both.',
          'The correlation must be a calculation error.',
          'Drowning increases ice cream demand.'
        ],
        correct: 1,
        solution: r`<p>Correlation is not causation. A confounder like city size or temperature raises both counts.</p>`
      }
    ]
  });
})();
