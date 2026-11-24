(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'probability',
    order: 10,
    section: 'degree',
    year: 'Year 2 — Foundations',
    code: 'STAT 310',
    title: 'Probability Theory',
    description: 'Calculus-based probability: counting, conditioning, random variables, joint distributions, expectation, generating functions, and limit theorems.',
    topics: [
      { id: 'count', title: 'Counting' },
      { id: 'cond', title: 'Conditional probability' },
      { id: 'cont', title: 'Continuous RVs' },
      { id: 'joint', title: 'Joint distributions' },
      { id: 'exp', title: 'Expectation & variance' },
      { id: 'mgf', title: 'Transformations & MGFs' },
      { id: 'limit', title: 'Limit theorems' }
    ],
    problems: [
      {
        id: 'pr1', topic: 'count', level: 1, title: 'The birthday problem',
        prompt: r`<p>Ignoring leap years and assuming birthdays are uniform over 365 days, what is the probability that at least two of 23 people share a birthday?</p>`,
        answers: [{ label: 'Probability', value: 0.507297 }],
        solution: r`\[ 1 - \prod_{i=0}^{22}\frac{365-i}{365} \approx 1 - 0.4927 = 0.5073. \]<p>With just 23 people, a shared birthday is more likely than not.</p>`
      },
      {
        id: 'pr2', topic: 'count', level: 2, title: 'Poker: full house',
        prompt: r`<p>What is the probability that a 5-card poker hand is a full house (three of one rank, two of another)?</p>`,
        answers: [{ label: 'Probability', value: 0.00144058 }],
        hint: 'Choose the rank for the triple, its suits, then a different rank for the pair and its suits.',
        solution: r`\[ \frac{13\binom43\cdot12\binom42}{\binom{52}{5}} = \frac{13\cdot4\cdot12\cdot6}{2{,}598{,}960} = \frac{3744}{2{,}598{,}960} \approx 0.00144. \]`
      },
      {
        id: 'pr3', topic: 'count', level: 1, title: 'Arrangements with repeated letters',
        prompt: r`<p>How many distinct arrangements are there of the letters in MISSISSIPPI?</p>`,
        answers: [{ label: 'Arrangements', value: 34650, tol: 0 }],
        solution: r`<p>11 letters: M×1, I×4, S×4, P×2.</p>\[ \frac{11!}{1!\,4!\,4!\,2!} = 34{,}650. \]`
      },
      {
        id: 'pr4', topic: 'count', level: 2, title: 'Coupon collector',
        prompt: r`<p>Each cereal box contains one of 5 equally likely toys. What is the expected number of boxes needed to collect all 5?</p>`,
        answers: [{ label: 'Expected boxes', value: 11.416667 }],
        hint: 'Break the wait into stages: after collecting k distinct toys, the wait for a new one is geometric.',
        solution: r`<p>Once you have \(k\) toys, a new one appears with probability \((5-k)/5\), so that stage takes \(5/(5-k)\) boxes on average.</p>\[ E = 5\left(1+\tfrac12+\tfrac13+\tfrac14+\tfrac15\right) = 5(2.2833) \approx 11.42. \]`
      },
      {
        id: 'pr5', topic: 'cond', level: 1, title: 'The Monty Hall problem',
        prompt: r`<p>A prize is behind one of three doors. You pick door 1. The host, who knows where the prize is, opens a different door that has no prize, then offers a switch. What is your probability of winning if you switch?</p>`,
        answers: [{ label: 'P(win | switch)', value: 2 / 3 }],
        solution: r`<p>Your first pick is right with probability 1/3. Whenever it is wrong (probability 2/3), the host's reveal leaves the prize behind the remaining door. So switching wins with probability <span class="final">2/3</span>.</p>`
      },
      {
        id: 'pr6', topic: 'cond', level: 1, title: 'Which urn?',
        prompt: r`<p>Urn 1 has 3 red and 2 blue balls. Urn 2 has 1 red and 4 blue. An urn is chosen at random and a ball is drawn. Given it is red, what is the probability it came from urn 1?</p>`,
        answers: [{ label: 'P(urn 1 | red)', value: 0.75 }],
        solution: r`\[ \frac{\tfrac12\cdot\tfrac35}{\tfrac12\cdot\tfrac35 + \tfrac12\cdot\tfrac15} = \frac{0.3}{0.4} = 0.75. \]`
      },
      {
        id: 'pr7', topic: 'cont', level: 1, title: 'Working with a density',
        prompt: r`<p>\(f(x) = c x^2\) for \(0 \le x \le 2\) and 0 otherwise. Find \(c\), \(P(X > 1)\), \(E[X]\), and \(\text{Var}(X)\).</p>`,
        answers: [{ label: 'c', value: 0.375 }, { label: 'P(X > 1)', value: 0.875 }, { label: 'E[X]', value: 1.5 }, { label: 'Var(X)', value: 0.15 }],
        solution: r`\[ \int_0^2 cx^2\,dx = \tfrac{8c}{3} = 1 \Rightarrow c = \tfrac38,\qquad F(x) = \tfrac{x^3}{8}. \]
\[ P(X>1) = 1 - \tfrac18 = 0.875,\quad E[X] = \tfrac38\int_0^2 x^3dx = 1.5,\quad E[X^2] = \tfrac38\cdot\tfrac{32}{5} = 2.4 \]\[ \text{Var}(X) = 2.4 - 2.25 = 0.15. \]`
      },
      {
        id: 'pr8', topic: 'cont', level: 1, title: 'Memorylessness of the exponential',
        prompt: r`<p>A component's lifetime is exponential with mean 10 years. Given it has lasted 5 years, what is the probability it lasts more than 15 years total?</p>`,
        answers: [{ label: 'Probability', value: 0.367879 }],
        solution: r`\[ P(X>15\mid X>5) = P(X>10) = e^{-10/10} = e^{-1} \approx 0.368. \]`
      },
      {
        id: 'pr9', topic: 'cont', level: 2, title: 'Order statistics of uniforms',
        prompt: r`<p>\(U_1, U_2, U_3\) are iid Uniform(0,1) and \(M = \max(U_1,U_2,U_3)\). Find \(P(M < 0.5)\) and \(E[M]\).</p>`,
        answers: [{ label: 'P(M < 0.5)', value: 0.125 }, { label: 'E[M]', value: 0.75 }],
        solution: r`<p>\(F_M(m) = m^3\), so \(P(M<0.5) = 1/8\). The density is \(f_M(m) = 3m^2\), giving \(E[M] = \int_0^1 3m^3\,dm = 3/4\).</p>`
      },
      {
        id: 'pr10', topic: 'joint', level: 2, title: 'A joint density on the unit square',
        prompt: r`<p>\(f(x,y) = x + y\) for \(0 \le x,y \le 1\). Find \(E[X]\), \(P(X + Y < 1)\), and \(\text{Cov}(X,Y)\).</p>`,
        answers: [{ label: 'E[X]', value: 7 / 12 }, { label: 'P(X+Y<1)', value: 1 / 3 }, { label: 'Cov(X,Y)', value: -1 / 144, tol: 0.0003 }],
        solution: r`<p>Marginal: \(f_X(x) = x + \tfrac12\), so \(E[X] = \tfrac13 + \tfrac14 = \tfrac7{12}\). By symmetry \(E[Y] = \tfrac7{12}\).</p>
\[ P(X+Y<1) = \int_0^1\!\int_0^{1-x}(x+y)\,dy\,dx = \int_0^1 \tfrac{1-x^2}{2}\,dx = \tfrac13. \]
\[ E[XY] = \int\!\!\int xy(x+y) = 2\cdot\tfrac13\cdot\tfrac12 = \tfrac13,\quad \text{Cov} = \tfrac13 - \tfrac{49}{144} = -\tfrac{1}{144}. \]`
      },
      {
        id: 'pr11', topic: 'joint', level: 2, title: 'Sum of independent Poissons',
        prompt: r`<p>\(X \sim \text{Pois}(2)\) and \(Y \sim \text{Pois}(3)\) are independent. Find \(P(X + Y = 4)\).</p>`,
        answers: [{ label: 'P(X+Y=4)', value: 0.175467 }],
        hint: 'Multiply the MGFs.',
        solution: r`<p>\(M_{X+Y}(t) = e^{2(e^t-1)}e^{3(e^t-1)} = e^{5(e^t-1)}\), so \(X+Y \sim \text{Pois}(5)\).</p>\[ P(X+Y=4) = \frac{e^{-5}5^4}{4!} \approx 0.1755. \]`
      },
      {
        id: 'pr12', topic: 'exp', level: 1, title: 'Variance of a linear combination',
        prompt: r`<p>\(\text{Var}(X) = 4\), \(\text{Var}(Y) = 9\), \(\text{Cov}(X,Y) = -2\). Find \(\text{Var}(2X - Y)\).</p>`,
        answers: [{ label: 'Var(2X − Y)', value: 33 }],
        solution: r`\[ 4\cdot4 + 9 - 2\cdot2\cdot(-2) = 16 + 9 + 8 = 33. \]`
      },
      {
        id: 'pr13', topic: 'exp', level: 3, title: 'Law of total variance: random sums',
        prompt: r`<p>The number of customers in a day is \(N \sim \text{Pois}(10)\). Each spends an iid amount with mean $20 and SD $5, independent of \(N\). Find the mean and variance of total spending \(T\).</p>`,
        answers: [{ label: 'E[T]', value: 200 }, { label: 'Var(T)', value: 4250 }],
        solution: r`\[ E[T] = E[N]\mu = 200 \]\[ \text{Var}(T) = E[\text{Var}(T\mid N)] + \text{Var}(E[T\mid N]) = E[N]\sigma^2 + \mu^2\text{Var}(N) = 10(25) + 400(10) = 4250. \]`
      },
      {
        id: 'pr14', topic: 'mgf', level: 2, title: 'Transforming a uniform',
        prompt: r`<p>\(U \sim \text{Uniform}(0,1)\) and \(Y = -\ln U\). Identify the distribution of \(Y\) and compute \(P(Y > 2)\).</p>`,
        answers: [{ label: 'P(Y > 2)', value: 0.135335 }],
        solution: r`\[ P(Y > y) = P(-\ln U > y) = P(U < e^{-y}) = e^{-y}, \]<p>so \(Y \sim \text{Exp}(1)\) and \(P(Y>2) = e^{-2} \approx 0.1353\).</p>`
      },
      {
        id: 'pr15', topic: 'mgf', level: 2, title: 'Recognizing an MGF',
        prompt: r`<p>A random variable has MGF \(M(t) = (0.3e^t + 0.7)^{8}\). What is its variance?</p>`,
        answers: [{ label: 'Variance', value: 1.68 }],
        solution: r`<p>This is the Binomial(8, 0.3) MGF, so \(\text{Var} = 8(0.3)(0.7) = 1.68\).</p>`
      },
      {
        id: 'pr16', topic: 'limit', level: 1, title: "Chebyshev's inequality",
        prompt: r`<p>A random variable has mean 50 and SD 5 (distribution unknown). What lower bound does Chebyshev give for \(P(40 < X < 60)\)?</p>`,
        answers: [{ label: 'Lower bound', value: 0.75 }],
        solution: r`<p>\(k = 2\) SDs: \(P(|X-50| < 10) \ge 1 - 1/k^2 = 0.75\).</p>`
      },
      {
        id: 'pr17', topic: 'limit', level: 2, title: 'CLT for a sum of uniforms',
        prompt: r`<p>\(S\) is the sum of 100 iid Uniform(0,1) variables. Approximate \(P(S > 55)\).</p>`,
        answers: [{ label: 'P(S > 55)', value: 0.041632 }],
        solution: r`<p>\(E[S] = 50\), \(\text{Var}(S) = 100/12\), \(\text{SD} \approx 2.887\).</p>\[ P(S>55) \approx P(Z > 1.732) \approx 0.0416. \]`
      },
      {
        id: 'pr18', topic: 'limit', level: 2, title: 'Modes of convergence',
        prompt: r`<p>The Weak Law of Large Numbers states that for iid \(X_i\) with finite mean \(\mu\), \(\bar X_n\to\mu\)…</p>`,
        choices: ['in distribution only', 'in probability', 'almost surely, and this requires finite variance', 'in L² regardless of moments'],
        correct: 1,
        solution: r`<p>The WLLN gives convergence in probability: \(P(|\bar X_n - \mu| > \varepsilon) \to 0\). The <em>strong</em> law gives almost-sure convergence, and it needs only a finite mean.</p>`
      }
    ]
  });
})();
