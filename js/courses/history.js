(function () {
  const r = String.raw;
  window.STATS = window.STATS || { courses: [] };
  window.STATS.courses.push({
    id: 'history',
    order: 5,
    section: 'history',
    code: 'History Track',
    title: 'History of Probability & Statistics',
    description: 'From gamblers’ letters in the 1600s to the bootstrap and MCMC: the people, ideas, and famous problems that built the field. Mostly trivia, plus a set of classic historical problems to solve yourself.',
    topics: [
      { id: 'origins', title: 'Origins (1500s–1700s)' },
      { id: 'classical', title: 'Classical era (1700s–1800s)' },
      { id: 'society', title: 'Statistics & society (1800s)' },
      { id: 'modern', title: 'Modern foundations (1900–1950)' },
      { id: 'computing', title: 'Computing era (1950–today)' },
      { id: 'classic', title: 'Classic problems to solve' }
    ],
    problems: [
      /* ---------------- Origins ---------------- */
      {
        id: 'hi1', topic: 'origins', level: 1, title: 'The letters that started it all',
        prompt: r`<p>In 1654, two French mathematicians exchanged letters solving gambling questions, including the "problem of points." This correspondence is often called the birth of probability theory. Who were they?</p>`,
        choices: ['Descartes and Mersenne', 'Pascal and Fermat', 'Laplace and Lagrange', 'Huygens and Leibniz'],
        correct: 1,
        solution: r`<p><b>Blaise Pascal and Pierre de Fermat.</b> The questions came partly from the gambler Antoine Gombaud, the Chevalier de Méré. Their solution to fairly splitting the stakes of an unfinished game introduced the idea of expected value.</p>`
      },
      {
        id: 'hi2', topic: 'origins', level: 2, title: 'A gambler-scholar',
        prompt: r`<p>Which Renaissance physician and gambler wrote <em>Liber de Ludo Aleae</em> (The Book on Games of Chance) around 1564? It is one of the first systematic treatments of probability, though it was not published until 1663.</p>`,
        choices: ['Galileo Galilei', 'Gerolamo Cardano', 'Niccolò Tartaglia', 'Luca Pacioli'],
        correct: 1,
        solution: r`<p><b>Gerolamo Cardano.</b> He reasoned about dice using counts of equally likely outcomes, about a century before Pascal and Fermat.</p>`
      },
      {
        id: 'hi3', topic: 'origins', level: 2, title: 'The first probability textbook',
        prompt: r`<p>After hearing about the Pascal–Fermat work, which Dutch scientist published <em>De Ratiociniis in Ludo Aleae</em> (1657), the first printed book on probability?</p>`,
        choices: ['Christiaan Huygens', 'Antonie van Leeuwenhoek', 'Simon Stevin', 'Baruch Spinoza'],
        correct: 0,
        solution: r`<p><b>Christiaan Huygens</b>, also known for the pendulum clock and the wave theory of light. His short treatise built probability around the "value of a chance," which is our expected value.</p>`
      },
      {
        id: 'hi4', topic: 'origins', level: 2, title: 'Counting the dead in London',
        prompt: r`<p>In 1662, a London haberdasher analyzed the weekly "Bills of Mortality" and produced an early life table. This founded demography and is often counted as the start of statistics as data analysis. Who was he?</p>`,
        choices: ['William Petty', 'John Graunt', 'Edmond Halley', 'Thomas Malthus'],
        correct: 1,
        solution: r`<p><b>John Graunt</b>, in <em>Natural and Political Observations Made upon the Bills of Mortality</em>. Edmond Halley later (1693) built a more rigorous life table from Breslau data and used it to price annuities.</p>`
      },
      {
        id: 'hi5', topic: 'origins', level: 3, title: 'The first significance test?',
        prompt: r`<p>In 1710, John Arbuthnot noted that recorded male christenings outnumbered female ones in London for 82 years in a row. If each year were a fair 50/50 coin flip, what is the probability of 82 "male" years in a row? (Scientific notation is fine, e.g. 2e-25.)</p>`,
        answers: [{ label: 'Probability', value: 2.0679515e-25, tol: 0.03e-25 }],
        solution: r`\[ (1/2)^{82} \approx 2.07\times10^{-25}. \]<p>Arbuthnot argued this was too unlikely to be chance. The argument is essentially a sign test with a tiny p-value, which is why it is often called the first published significance test.</p>`
      },
      {
        id: 'hi6', topic: 'origins', level: 1, title: 'The Golden Theorem',
        prompt: r`<p>Jacob Bernoulli's <em>Ars Conjectandi</em>, published posthumously in 1713, proved what he called his "golden theorem." What do we call it today?</p>`,
        choices: ['The central limit theorem', 'The (weak) law of large numbers', "Bayes' theorem", 'The binomial theorem'],
        correct: 1,
        solution: r`<p>The <b>weak law of large numbers</b>: the observed proportion of successes converges in probability to the true probability. It was the first limit theorem in probability.</p>`
      },
      {
        id: 'hi7', topic: 'origins', level: 2, title: 'The St. Petersburg paradox',
        prompt: r`<p>A fair coin is flipped until the first head; if that happens on flip \(k\), you win \(2^k\) ducats. The expected payout is infinite, yet nobody would pay much to play. Daniel Bernoulli's 1738 resolution introduced which idea?</p>`,
        choices: ['Risk-neutral pricing', 'Diminishing marginal utility (e.g., logarithmic utility)', 'The law of large numbers', 'Minimax decision rules'],
        correct: 1,
        solution: r`<p>\(E[\text{payout}] = \sum_k 2^{-k}2^k = \infty\). Daniel Bernoulli proposed valuing money by its <b>utility</b>, with \(\log\) as an example. Expected log-payout is finite. The puzzle was posed earlier by his cousin Nicolaus Bernoulli, and the idea underlies modern expected-utility theory.</p>`
      },

      /* ---------------- Classical ---------------- */
      {
        id: 'hi8', topic: 'classical', level: 2, title: 'Who found the normal curve first?',
        prompt: r`<p>The normal distribution is often called "Gaussian," but who first derived it, in 1733, as an approximation to the binomial distribution?</p>`,
        choices: ['Carl Friedrich Gauss', 'Abraham de Moivre', 'Pierre-Simon Laplace', 'Siméon Denis Poisson'],
        correct: 1,
        solution: r`<p><b>Abraham de Moivre</b>, a French Huguenot living in London and author of <em>The Doctrine of Chances</em>. Gauss was born in 1777. Laplace later generalized de Moivre's result into an early central limit theorem.</p>`
      },
      {
        id: 'hi9', topic: 'classical', level: 1, title: 'A posthumous essay',
        prompt: r`<p>Thomas Bayes, a Presbyterian minister, died in 1761. Who found his essay on inverse probability among his papers and had it published in 1763?</p>`,
        choices: ['Richard Price', 'David Hume', 'Laplace', 'Benjamin Franklin'],
        correct: 0,
        solution: r`<p><b>Richard Price</b> edited and submitted "An Essay towards solving a Problem in the Doctrine of Chances" to the Royal Society. Laplace independently developed the same ideas much more fully, which is why "Bayesian" methods were long called "inverse probability."</p>`
      },
      {
        id: 'hi10', topic: 'classical', level: 2, title: 'Will the sun rise tomorrow?',
        prompt: r`<p>Laplace's <em>rule of succession</em>, applied to whether the sun will rise again, says that after \(n\) successes in \(n\) trials (with a uniform prior), the probability of success on the next trial is \(\frac{n+1}{n+2}\). What is it after 10 successes in 10 trials?</p>`,
        answers: [{ label: 'P(next success)', value: 11 / 12 }],
        hint: 'The posterior is Beta(n+1, 1). Its mean is the answer.',
        solution: r`<p>A uniform prior is Beta(1,1). After 10 successes the posterior is Beta(11, 1), with mean \(11/12 \approx 0.917\). Laplace's famous illustration used about 5,000 years of recorded sunrises.</p>`
      },
      {
        id: 'hi11', topic: 'classical', level: 2, title: 'A priority dispute over least squares',
        prompt: r`<p>Adrien-Marie Legendre published the method of least squares in 1805. Which mathematician published it in 1809, claimed to have used it since 1795, and famously applied it to recover the orbit of the asteroid Ceres?</p>`,
        choices: ['Euler', 'Gauss', 'Lagrange', 'Cauchy'],
        correct: 1,
        solution: r`<p><b>Carl Friedrich Gauss.</b> He also justified least squares with normally distributed errors, which is how the normal curve came to carry his name.</p>`
      },
      {
        id: 'hi12', topic: 'classical', level: 1, title: 'Laplace’s masterwork',
        prompt: r`<p>Which 1812 book by Laplace pulled together generating functions, inverse probability, and an early central limit theorem, and dominated probability for the rest of the 19th century?</p>`,
        choices: ['<em>Ars Conjectandi</em>', '<em>Théorie analytique des probabilités</em>', '<em>Mécanique céleste</em>', '<em>Grundbegriffe der Wahrscheinlichkeitsrechnung</em>'],
        correct: 1,
        solution: r`<p><b><em>Théorie analytique des probabilités</em></b>. Its popular introduction, the <em>Essai philosophique sur les probabilités</em> (1814), contains the line "probability theory is nothing but common sense reduced to calculation."</p>`
      },
      {
        id: 'hi13', topic: 'classical', level: 2, title: 'An inequality with two names',
        prompt: r`<p>The inequality \(P(|X - \mu| \ge k\sigma) \le 1/k^2\) is usually named after a Russian mathematician who proved it in 1867, though Irénée-Jules Bienaymé had it earlier. Who?</p>`,
        choices: ['Andrey Markov', 'Pafnuty Chebyshev', 'Aleksandr Lyapunov', 'Andrey Kolmogorov'],
        correct: 1,
        solution: r`<p><b>Pafnuty Chebyshev</b>, founder of the St. Petersburg school. His students included Markov and Lyapunov. Lyapunov gave the first rigorous general proof of the central limit theorem (1901).</p>`
      },

      /* ---------------- Society ---------------- */
      {
        id: 'hi14', topic: 'society', level: 1, title: "The 'average man'",
        prompt: r`<p>Which Belgian astronomer and statistician applied the normal curve to human traits, promoted the concept of <em>l'homme moyen</em> (the average man), and devised the index now known as BMI?</p>`,
        choices: ['Adolphe Quetelet', 'Francis Galton', 'Florence Nightingale', 'William Farr'],
        correct: 0,
        solution: r`<p><b>Adolphe Quetelet.</b> BMI (weight / height²) was long called the "Quetelet index." His "social physics" pushed statistics into the study of societies.</p>`
      },
      {
        id: 'hi15', topic: 'society', level: 1, title: 'The rose diagram',
        prompt: r`<p>Florence Nightingale used a polar area ("coxcomb" or rose) diagram to show that most British soldier deaths in the Crimean War came from preventable disease, not battle wounds. In 1858 she became the first woman elected to which society?</p>`,
        choices: ['The Royal Society', 'The Royal Statistical Society', 'The American Statistical Association', 'The London Mathematical Society'],
        correct: 1,
        solution: r`<p>The <b>Royal Statistical Society</b> (then the Statistical Society of London). She was later made an honorary member of the American Statistical Association. Her diagrams are a landmark of persuasive data visualization.</p>`
      },
      {
        id: 'hi16', topic: 'society', level: 1, title: 'A map and a water pump',
        prompt: r`<p>In 1854, a physician mapped cholera deaths in Soho, London. The deaths clustered around the Broad Street water pump, strong evidence that cholera spreads through water rather than "bad air." Who was he?</p>`,
        choices: ['Joseph Lister', 'John Snow', 'Edward Jenner', 'William Farr'],
        correct: 1,
        solution: r`<p><b>John Snow</b>, often called a father of epidemiology. His comparison of households served by two water companies was also an early natural experiment.</p>`
      },
      {
        id: 'hi17', topic: 'society', level: 2, title: 'Regression to the mean is born',
        prompt: r`<p>Studying the heights of parents and their adult children, Francis Galton found that children of very tall parents tend to be tall but closer to average. What did he call this in his 1886 paper?</p>`,
        choices: ['Reversion to type', 'Regression towards mediocrity', 'Correlation of heights', 'The law of error'],
        correct: 1,
        solution: r`<p>"<b>Regression towards mediocrity</b> in hereditary stature." That is where the word <em>regression</em> comes from. Galton introduced correlation in 1888. He also coined the word "eugenics," a legacy the field now looks back on critically.</p>`
      },
      {
        id: 'hi18', topic: 'society', level: 2, title: 'Punch cards for the census',
        prompt: r`<p>The 1890 U.S. Census was tabulated with electric punched-card machines, cutting processing time from years to months. The inventor's company later became part of IBM. Who was he?</p>`,
        choices: ['Herman Hollerith', 'Charles Babbage', 'Thomas Edison', 'John von Neumann'],
        correct: 0,
        solution: r`<p><b>Herman Hollerith.</b> His Tabulating Machine Company merged into the company renamed IBM in 1924. Statistics and computing have been linked ever since.</p>`
      },
      {
        id: 'hi19', topic: 'society', level: 1, title: 'Where does the word come from?',
        prompt: r`<p>The word <em>statistics</em> comes from the 18th-century German <em>Statistik</em>, popularized by Gottfried Achenwall. What did it originally mean?</p>`,
        choices: ['The science of chance', 'Descriptive facts about a state', 'The study of averages', 'Astronomical error analysis'],
        correct: 1,
        solution: r`<p>It meant the systematic description of a <b>state</b>: its population, economy, and resources. The link to probability and inference came only in the 19th and 20th centuries.</p>`
      },

      /* ---------------- Modern ---------------- */
      {
        id: 'hi20', topic: 'modern', level: 1, title: "Who was 'Student'?",
        prompt: r`<p>The t-distribution was published in 1908 in <em>Biometrika</em> under the pseudonym "Student." The author worked for a brewery that did not allow employees to publish under their own names. Who was he, and where did he work?</p>`,
        choices: ['R. A. Fisher at Rothamsted', 'William Sealy Gosset at Guinness', 'Karl Pearson at University College London', 'Jerzy Neyman at Carlsberg'],
        correct: 1,
        solution: r`<p><b>William Sealy Gosset</b>, a chemist and brewer at <b>Guinness</b> in Dublin. He needed methods for the small samples typical of barley and hops experiments. Fisher later reworked and popularized the t-test.</p>`
      },
      {
        id: 'hi21', topic: 'modern', level: 1, title: 'The chi-square test',
        prompt: r`<p>Who introduced the chi-square goodness-of-fit test in 1900, coined the term "standard deviation," and in 1911 founded the world's first university statistics department, at University College London?</p>`,
        choices: ['Karl Pearson', 'Egon Pearson', 'Ronald Fisher', 'Udny Yule'],
        correct: 0,
        solution: r`<p><b>Karl Pearson.</b> He also co-founded the journal <em>Biometrika</em> (1901) with Galton and Weldon. His son Egon Pearson is the "Pearson" in Neyman–Pearson.</p>`
      },
      {
        id: 'hi22', topic: 'modern', level: 1, title: 'The lady tasting tea',
        prompt: r`<p>A colleague of R. A. Fisher claimed she could tell whether milk or tea was poured into the cup first. In Fisher's design she tastes 8 cups, 4 of each kind, and must pick the 4 milk-first cups. If she is purely guessing, what is the probability she identifies all 4 correctly?</p>`,
        answers: [{ label: 'Probability', value: 1 / 70 }],
        solution: r`<p>There are \(\binom84 = 70\) equally likely ways to choose 4 cups, and only one is entirely correct, so \(p = 1/70 \approx 0.014\).</p><p>The example opens Fisher's <em>The Design of Experiments</em> (1935) and is the origin of <b>Fisher's exact test</b> and the logic of randomization. The lady was the algologist Muriel Bristol, and by most accounts she got them all right.</p>`
      },
      {
        id: 'hi23', topic: 'modern', level: 2, title: 'Fisher at the farm',
        prompt: r`<p>At which agricultural research station did R. A. Fisher develop ANOVA, randomization, and much of modern experimental design (1919–1933)?</p>`,
        choices: ['Rothamsted Experimental Station', 'Bell Labs', 'Iowa State Agricultural College', 'Kew Gardens'],
        correct: 0,
        solution: r`<p><b>Rothamsted</b>, in Hertfordshire, England. Decades of crop data there pushed Fisher to invent analysis of variance and the principles of randomization, replication, and blocking. His <em>Statistical Methods for Research Workers</em> (1925) helped spread the 0.05 significance convention.</p>`
      },
      {
        id: 'hi24', topic: 'modern', level: 2, title: 'Coining "variance"',
        prompt: r`<p>Which statistician introduced the term <em>variance</em> in a 1918 paper on Mendelian inheritance, and also developed maximum likelihood estimation?</p>`,
        choices: ['Karl Pearson', 'R. A. Fisher', 'Harold Jeffreys', 'Jerzy Neyman'],
        correct: 1,
        solution: r`<p><b>R. A. Fisher</b>, in "The Correlation between Relatives on the Supposition of Mendelian Inheritance." The paper reconciled Mendelian genetics with continuous variation, and Fisher became as important a figure in genetics as in statistics.</p>`
      },
      {
        id: 'hi25', topic: 'modern', level: 2, title: 'Error rates and power',
        prompt: r`<p>The 1933 lemma showing that the likelihood-ratio test is most powerful for simple hypotheses, which framed testing around Type I and Type II errors, is due to which pair?</p>`,
        choices: ['Fisher and Gosset', 'Neyman and (Egon) Pearson', 'Wald and Wolfowitz', 'Kolmogorov and Smirnov'],
        correct: 1,
        solution: r`<p><b>Jerzy Neyman and Egon Pearson.</b> Neyman went on to introduce confidence intervals (1937). Fisher strongly disagreed with their decision-theoretic framing. Today's textbook mix of p-values and fixed α blends the two rival schools.</p>`
      },
      {
        id: 'hi26', topic: 'modern', level: 2, title: 'Axioms for probability',
        prompt: r`<p>Which mathematician put probability on a rigorous footing in 1933 with axioms based on measure theory, in <em>Grundbegriffe der Wahrscheinlichkeitsrechnung</em>?</p>`,
        choices: ['Émile Borel', 'Andrey Kolmogorov', 'Richard von Mises', 'Norbert Wiener'],
        correct: 1,
        solution: r`<p><b>Andrey Kolmogorov.</b> His three axioms (non-negativity, unit total measure, countable additivity) are still the standard foundation.</p>`
      },
      {
        id: 'hi27', topic: 'modern', level: 2, title: 'Markov and a poem',
        prompt: r`<p>In 1913, Andrey Markov demonstrated his chains on real data by analyzing the sequence of vowels and consonants in which work?</p>`,
        choices: ["Tolstoy's <em>War and Peace</em>", "Pushkin's <em>Eugene Onegin</em>", "Dostoevsky's <em>Crime and Punishment</em>", 'The Bible'],
        correct: 1,
        solution: r`<p>The first 20,000 letters of <b>Pushkin's <em>Eugene Onegin</em></b>. He showed that whether a letter is a vowel depends on the previous letter. This was arguably the first statistical language model.</p>`
      },
      {
        id: 'hi28', topic: 'modern', level: 2, title: 'Armor for bombers',
        prompt: r`<p>In WWII, returning bombers had more bullet holes on the wings and fuselage than on the engines. One statistician advised armoring the engines, since planes hit there never came back. Who, and what error was he avoiding?</p>`,
        choices: [
          'Fisher; confounding',
          'Abraham Wald; survivorship bias',
          'Tukey; regression to the mean',
          'Neyman; Simpson’s paradox'
        ],
        correct: 1,
        solution: r`<p><b>Abraham Wald</b>, at Columbia's Statistical Research Group. The returning planes are a biased sample: only survivors are observed. Wald also developed sequential analysis (the SPRT) during the war.</p>`
      },
      {
        id: 'hi29', topic: 'modern', level: 2, title: 'Control charts',
        prompt: r`<p>Which Bell Labs physicist invented the statistical control chart in 1924, founding statistical quality control (later championed by W. Edwards Deming in postwar Japan)?</p>`,
        choices: ['Walter Shewhart', 'Claude Shannon', 'Harold Hotelling', 'John Tukey'],
        correct: 0,
        solution: r`<p><b>Walter A. Shewhart.</b> His charts separate "common cause" from "special cause" variation, usually with limits at ±3σ.</p>`
      },
      {
        id: 'hi30', topic: 'modern', level: 3, title: 'Two inventors of PCA',
        prompt: r`<p>Principal component analysis has two usual "inventors": one described lines and planes of closest fit in 1901, and another developed and named it in 1933. Who are they?</p>`,
        choices: ['Galton and Fisher', 'Karl Pearson and Harold Hotelling', 'Spearman and Thurstone', 'Gauss and Jacobi'],
        correct: 1,
        solution: r`<p><b>Karl Pearson</b> (1901) and <b>Harold Hotelling</b> (1933). Charles Spearman's 1904 factor analysis, developed to study "general intelligence," is a close cousin. Spearman also gave us rank correlation.</p>`
      },

      /* ---------------- Computing era ---------------- */
      {
        id: 'hi31', topic: 'computing', level: 1, title: 'Named after a casino',
        prompt: r`<p>The Monte Carlo method was developed in the 1940s at Los Alamos for nuclear weapons calculations and named after the casino in Monaco. Which mathematicians are most associated with it?</p>`,
        choices: ['Turing and Good', 'Stanislaw Ulam and John von Neumann', 'Shannon and Wiener', 'Feynman and Bethe'],
        correct: 1,
        solution: r`<p><b>Stanislaw Ulam</b> (who got the idea while playing solitaire) and <b>John von Neumann</b>, with Nicholas Metropolis, who suggested the name. It was one of the first major uses of electronic computers such as ENIAC.</p>`
      },
      {
        id: 'hi32', topic: 'computing', level: 2, title: 'The Metropolis algorithm',
        prompt: r`<p>The Metropolis algorithm, the ancestor of all MCMC, appeared in a 1953 physics paper on equation-of-state calculations. Who generalized it in 1970 to allow asymmetric proposals?</p>`,
        choices: ['W. K. Hastings', 'Geman and Geman', 'Gelfand and Smith', 'Edward Teller'],
        correct: 0,
        solution: r`<p><b>W. Keith Hastings</b>, giving Metropolis–Hastings. Geman and Geman named the Gibbs sampler (1984), and Gelfand and Smith (1990) brought MCMC into mainstream Bayesian statistics.</p>`
      },
      {
        id: 'hi33', topic: 'computing', level: 1, title: 'Pulling yourself up by your bootstraps',
        prompt: r`<p>Who introduced the bootstrap in a 1979 <em>Annals of Statistics</em> paper subtitled "Another Look at the Jackknife"?</p>`,
        choices: ['John Tukey', 'Bradley Efron', 'Leo Breiman', 'David Cox'],
        correct: 1,
        solution: r`<p><b>Bradley Efron.</b> The bootstrap replaced difficult analytic derivations with computation, a turning point for computer-intensive statistics. Quenouille and Tukey had developed the jackknife decades earlier.</p>`
      },
      {
        id: 'hi34', topic: 'computing', level: 1, title: 'Exploratory data analysis',
        prompt: r`<p>Which statistician championed exploratory data analysis, invented the box plot and stem-and-leaf display, co-developed the Fast Fourier Transform, and is credited with coining the word "bit"?</p>`,
        choices: ['John Tukey', 'George Box', 'William Cleveland', 'Edward Tufte'],
        correct: 0,
        solution: r`<p><b>John W. Tukey</b>, of Princeton and Bell Labs. His book <em>Exploratory Data Analysis</em> (1977) argued that looking at data deserves as much rigor as confirming hypotheses.</p>`
      },
      {
        id: 'hi35', topic: 'computing', level: 1, title: '"All models are wrong…"',
        prompt: r`<p>Who wrote the famous aphorism "All models are wrong, but some are useful"?</p>`,
        choices: ['George E. P. Box', 'John Tukey', 'R. A. Fisher', 'Nate Silver'],
        correct: 0,
        solution: r`<p><b>George E. P. Box</b>, known for Box–Jenkins time series methods, the Box–Cox transformation, and response surface methodology. He was also Fisher's son-in-law.</p>`
      },
      {
        id: 'hi36', topic: 'computing', level: 2, title: 'Survival analysis landmarks',
        prompt: r`<p>Match the dates: the product-limit survival estimator was published in 1958, and the proportional hazards model in 1972. Who created each?</p>`,
        choices: [
          'Kaplan & Meier (1958); David Cox (1972)',
          'David Cox (1958); Kaplan & Meier (1972)',
          'Greenwood (1958); Nelson & Aalen (1972)',
          'Mantel & Haenszel (1958); Peto (1972)'
        ],
        correct: 0,
        solution: r`<p><b>Edward Kaplan and Paul Meier</b> (JASA, 1958) and <b>Sir David Cox</b> (JRSS-B, 1972). Cox's paper is among the most cited in all of science.</p>`
      },
      {
        id: 'hi37', topic: 'computing', level: 1, title: 'From S to R',
        prompt: r`<p>The R language began in the early 1990s as an open-source implementation of the S language from Bell Labs. Where was R created?</p>`,
        choices: ['Stanford University', 'University of Auckland', 'Bell Labs', 'ETH Zürich'],
        correct: 1,
        solution: r`<p>At the <b>University of Auckland</b>, by Ross Ihaka and Robert Gentleman (hence "R"). S was designed by John Chambers and colleagues at Bell Labs starting in 1976.</p>`
      },
      {
        id: 'hi38', topic: 'computing', level: 2, title: "Simpson's paradox: older than Simpson",
        prompt: r`<p>Edward Simpson described the reversal of associations under aggregation in 1951. Which earlier statistician had described essentially the same effect around 1903, which is why it is sometimes called the Yule–Simpson effect?</p>`,
        choices: ['Udny Yule', 'Karl Pearson', 'Francis Edgeworth', 'Ronald Fisher'],
        correct: 0,
        solution: r`<p><b>G. Udny Yule</b>, a student of Karl Pearson. Pearson and colleagues had noted related "spurious correlation" issues even earlier (1899).</p>`
      },

      /* ---------------- Classic problems ---------------- */
      {
        id: 'hc1', topic: 'classic', level: 1, title: "The Chevalier de Méré's dice problem",
        prompt: r`<p>De Méré believed these two bets were equally favorable: (a) at least one six in 4 rolls of one die; (b) at least one double six in 24 rolls of two dice. Compute both probabilities.</p>`,
        answers: [{ label: '(a)', value: 0.517747 }, { label: '(b)', value: 0.491404 }],
        hint: 'Use the complement: no six (or no double six) on every roll.',
        solution: r`\[ (a)\ 1 - (5/6)^4 \approx 0.5177,\qquad (b)\ 1 - (35/36)^{24} \approx 0.4914. \]<p>The first bet wins slightly more than half the time and the second slightly less, so de Méré lost money on (b). His faulty reasoning ("4/6 = 24/36") treated probabilities as proportional to the number of tries.</p>`
      },
      {
        id: 'hc2', topic: 'classic', level: 1, title: 'The problem of points',
        prompt: r`<p>Two equally skilled players each stake 32 pistoles on a game won by the first to take 3 rounds. The game is interrupted with player A ahead 2 rounds to 1. Following Pascal and Fermat, what fraction of the 64-pistole pot should A receive? How many pistoles is that?</p>`,
        answers: [{ label: "A's fraction", value: 0.75 }, { label: 'Pistoles', value: 48 }],
        solution: r`<p>A loses only if B wins the next two rounds: probability \(1/4\). So A should get \(3/4\) of the pot, which is <b>48 pistoles</b>. The key insight, which is exactly expected value, is to split by the chances of winning, not by rounds already won.</p>`
      },
      {
        id: 'hc3', topic: 'classic', level: 2, title: 'The Newton–Pepys problem',
        prompt: r`<p>In 1693, the diarist Samuel Pepys asked Isaac Newton which is most likely: (A) at least one six with 6 dice, (B) at least two sixes with 12 dice, or (C) at least three sixes with 18 dice. Compute each probability.</p>`,
        answers: [{ label: 'P(A)', value: 0.665102 }, { label: 'P(B)', value: 0.618667 }, { label: 'P(C)', value: 0.597346 }],
        solution: r`\[ P(A) = 1 - (5/6)^6 \approx 0.665 \]\[ P(B) = 1 - \sum_{k=0}^{1}\binom{12}{k}(1/6)^k(5/6)^{12-k} \approx 0.619 \]\[ P(C) = 1 - \sum_{k=0}^{2}\binom{18}{k}(1/6)^k(5/6)^{18-k} \approx 0.597 \]<p>Newton correctly told Pepys that <b>A</b> is most likely, though Pepys (who wanted to bet on C) wasn't convinced.</p>`
      },
      {
        id: 'hc4', topic: 'classic', level: 2, title: "Buffon's needle",
        prompt: r`<p>In 1777, the Comte de Buffon asked: if a needle of length \(\ell\) is dropped on a floor of parallel lines spaced \(d\) apart (\(\ell \le d\)), what is the chance it crosses a line? The answer is \(\frac{2\ell}{\pi d}\). Compute it for (a) \(\ell = d\) and (b) \(\ell = d/2\).</p>`,
        answers: [{ label: '(a) ℓ = d', value: 0.63662 }, { label: '(b) ℓ = d/2', value: 0.31831 }],
        solution: r`\[ (a)\ \frac{2}{\pi} \approx 0.6366,\qquad (b)\ \frac{1}{\pi} \approx 0.3183. \]<p>Because \(\pi\) appears, dropping many needles gives a (very slow) Monte Carlo estimate of \(\pi\), arguably the first Monte Carlo experiment.</p>`
      },
      {
        id: 'hc5', topic: 'classic', level: 2, title: 'Deaths by horse kick',
        prompt: r`<p>In <em>The Law of Small Numbers</em> (1898), Ladislaus Bortkiewicz showed that Prussian cavalry deaths from horse kicks follow a Poisson distribution. In the classic subset, there were 122 deaths over 200 corps-years (mean 0.61). Under Poisson(0.61), what is P(0 deaths in a corps-year), and how many of the 200 corps-years would you expect to have 0 deaths? (Observed: 109.)</p>`,
        answers: [{ label: 'P(0)', value: 0.543351 }, { label: 'Expected count', value: 108.67, tol: 0.5 }],
        solution: r`\[ P(0) = e^{-0.61} \approx 0.5434,\qquad 200(0.5434) \approx 108.7. \]<p>The fit is remarkably close: about 66.3 expected with exactly one death against 65 observed. It became the textbook example of the Poisson distribution for rare events.</p>`
      },
      {
        id: 'hc6', topic: 'classic', level: 1, title: "Galton's bean machine",
        prompt: r`<p>Galton's quincunx drops balls through rows of pegs; at each peg a ball bounces left or right with probability 1/2. With 10 rows, what is the probability a ball lands in the exact middle bin (5 rights)?</p>`,
        answers: [{ label: 'Probability', value: 0.246094 }],
        solution: r`\[ \binom{10}{5}\left(\tfrac12\right)^{10} = \frac{252}{1024} \approx 0.2461. \]<p>The pile of balls traces a binomial distribution, which approaches the normal curve. Galton used it to illustrate the central limit theorem and, later, regression.</p>`
      },
      {
        id: 'hc7', topic: 'classic', level: 2, title: "Benford's law",
        prompt: r`<p>Simon Newcomb (1881) noticed that the early pages of logarithm tables were more worn; Frank Benford (1938) confirmed it across many datasets. Under Benford's law \(P(D = d) = \log_{10}(1 + 1/d)\). What fraction of numbers have leading digit 1? Leading digit 9?</p>`,
        answers: [{ label: 'P(D = 1)', value: 0.30103 }, { label: 'P(D = 9)', value: 0.0457575 }],
        solution: r`\[ \log_{10}2 \approx 0.301,\qquad \log_{10}(10/9) \approx 0.0458. \]<p>Today, Benford's law is used to screen accounting and election data for fabricated numbers.</p>`
      }
    ]
  });
})();
