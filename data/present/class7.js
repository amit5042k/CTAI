// "Present to class" content for Class 7 (original classroom material).

export default {
  "c7-ct-1": {
    bigIdea: "Lakhs and crores, millions and billions",
    visual: { type: "placeChart", props: { labels: ["Crores", "Ten Lakhs", "Lakhs", "Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"], digits: [4, 2, 5, 0, 7, 3, 1, 6], system: "indian" } },
    explore: { type: "placeChart", props: { labels: ["Ten Millions", "Millions", "Hundred Thousands", "Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"], digits: [4, 2, 5, 0, 7, 3, 1, 6], system: "international" } },
    prompt: "Same digits — where do the commas go in the international system?",
    keyWords: ["lakh", "crore", "million", "place value", "comma"],
    checks: [
      { q: "1 crore = ? lakh", options: ["10", "100", "1000", "10,000"], answer: 1 },
      { q: "1 million = ? lakh", options: ["1", "10", "100", "1000"], answer: 1 },
    ],
  },
  "c7-ct-2": {
    bigIdea: "Brackets, then × and ÷, then + and −",
    visual: { type: "worksteps", props: { lines: ["18 − 3 × (4 + 2)", "= 18 − 3 × 6", "= 18 − 18", "= 0"], notes: ["", "brackets first", "then multiply", "then subtract"] } },
    prompt: "Evaluate step by step. What if we worked left to right instead?",
    exploreNote: "Left to right gives (18 − 3) × 6 = 90, which is wrong — show why the order matters.",
    keyWords: ["expression", "brackets", "order of operations", "term", "evaluate"],
    checks: [
      { q: "6 + 4 × 5 = ?", options: ["50", "26", "30", "20"], answer: 1 },
      { q: "“3 pens at ₹12 and a notebook at ₹40” as an expression:", options: ["3 + 12 × 40", "3 × 12 + 40", "(3 + 12) × 40", "3 × (12 + 40)"], answer: 1 },
    ],
  },
  "c7-ct-3": {
    bigIdea: "Decimals show parts smaller than one",
    visual: { type: "placeChart", props: { labels: ["Tens", "Ones", "Tenths", "Hundredths"], digits: [2, 4, 7, 5], point: 2 } },
    explore: { type: "numberLine", props: { min: 0, max: 2, start: 0.3, jumps: [0.4, 0.5, 0.6], tickEvery: 0.1, labelEvery: 0.5 } },
    prompt: "Add 0.4, 0.5 and 0.6 on the number line.",
    keyWords: ["decimal point", "tenths", "hundredths", "compare", "add"],
    checks: [
      { q: "Which is greater?", options: ["0.5", "0.45", "0.405", "0.054"], answer: 0 },
      { q: "2.75 + 1.5 = ?", options: ["2.90", "3.25", "4.25", "4.80"], answer: 2 },
    ],
  },
  "c7-ct-4": {
    bigIdea: "A letter can stand for any number",
    visual: { type: "bags", props: { bags: 3, extra: 2, x: 4, letter: "x" } },
    prompt: "Each bag holds x marbles. Peek inside and change x.",
    keyWords: ["variable", "expression", "term", "coefficient", "like terms"],
    checks: [
      { q: "If n = 5, what is 4n − 3?", options: ["17", "20", "23", "42"], answer: 0 },
      { q: "Simplify 3a + 5a − 2a", options: ["6a", "10a", "8a", "6"], answer: 0 },
    ],
  },
  "c7-ct-5": {
    bigIdea: "A transversal makes equal angle pairs",
    visual: { type: "lines", props: { mode: "transversal", angle: 60 } },
    prompt: "Tap an angle. Which others are equal to it?",
    keyWords: ["parallel", "transversal", "corresponding", "alternate", "co-interior"],
    checks: [
      { q: "Corresponding angles on parallel lines are…", options: ["equal", "always 90°", "add to 90°", "add to 360°"], answer: 0 },
      { q: "One co-interior angle is 110°. The other is…", options: ["110°", "70°", "90°", "250°"], answer: 1 },
    ],
  },
  "c7-ct-6": {
    bigIdea: "Divisibility rules are shortcuts",
    visual: { type: "hundredGrid", props: { mode: "multiples", n: 9, max: 100 } },
    prompt: "Pick 3 or 9: what do the digit sums of the shaded numbers have in common?",
    exploreNote: "Digit sums of multiples of 9 are 9 or 18; multiples of 3 have digit sums divisible by 3.",
    keyWords: ["divisible", "factor", "digit sum", "even", "odd", "prime"],
    checks: [
      { q: "Is 2,457 divisible by 9?", options: ["Yes, digit sum 18", "No, it is odd", "Yes, it ends in 7", "No, digit sum 17"], answer: 0 },
      { q: "A number divisible by 10 must end in…", options: ["5", "0", "2", "any digit"], answer: 1 },
    ],
  },
  "c7-ct-7": {
    bigIdea: "The three angles of a triangle add to 180°",
    visual: { type: "lines", props: { mode: "triangle" } },
    prompt: "Try different triangles. Does the sum ever change?",
    exploreNote: "Hands-on proof: tear the three corners of a paper triangle and place them on a straight line.",
    keyWords: ["triangle", "angle sum", "equilateral", "isosceles", "scalene", "right-angled"],
    checks: [
      { q: "Two angles are 50° and 60°. The third is…", options: ["60°", "70°", "80°", "110°"], answer: 1 },
      { q: "A triangle with all sides equal is…", options: ["scalene", "isosceles only", "equilateral", "right-angled"], answer: 2 },
    ],
  },
  "c7-ct-8": {
    bigIdea: "A fraction of a fraction is an overlap",
    visual: { type: "fractionArea", props: { a: [2, 3], b: [3, 4] } },
    prompt: "The green overlap is the answer. Count the parts!",
    keyWords: ["product", "of", "reciprocal", "divide", "simplest form"],
    checks: [
      { q: "1/2 × 3/5 = ?", options: ["4/7", "3/10", "3/7", "1/10"], answer: 1 },
      { q: "3/4 ÷ 1/2 = ?", options: ["3/8", "1 1/2", "2/3", "4/6"], answer: 1, explain: "Multiply by the reciprocal: 3/4 × 2 = 6/4." },
    ],
  },
  "c7-ai-1": {
    bigIdea: "Three big domains of AI",
    visual: { type: "hub", props: { center: "AI", spokes: [
      { label: "Data Science", items: ["weather forecasts", "sales predictions", "cricket score predictor"] },
      { label: "Computer Vision", items: ["face unlock", "self-driving cars", "crop disease detection"] },
      { label: "NLP", items: ["chatbots", "translation apps", "voice assistants"] },
    ] } },
    prompt: "Tap a domain. Can you add one more example?",
    keyWords: ["Data Science", "Computer Vision", "NLP", "domain", "application"],
    checks: [
      { q: "An app that translates Hindi to Tamil uses…", options: ["Computer Vision", "NLP", "Data Science only", "No AI"], answer: 1 },
      { q: "Detecting litter in CCTV images uses…", options: ["Computer Vision", "NLP", "Audio only", "a calculator"], answer: 0 },
    ],
  },
  "c7-ai-2": {
    bigIdea: "AI is changing how industries work",
    visual: { type: "cards", props: { cards: [
      { icon: "🏥", front: "Healthcare", back: "Reading scans, early disease alerts. Risk: privacy of patient data" },
      { icon: "🏦", front: "Finance", back: "Spotting fraud in payments. Risk: wrong blocks on real users" },
      { icon: "🛒", front: "Retail", back: "Product recommendations, stock planning. Risk: over-spending nudges" },
      { icon: "🛵", front: "Food delivery", back: "Fast routes, delivery time estimates. Risk: pressure on riders" },
    ] } },
    prompt: "Flip each card: one benefit and one risk.",
    keyWords: ["healthcare", "finance", "retail", "benefit", "risk"],
    checks: [
      { q: "A bank uses AI to flag unusual card payments. This is…", options: ["fraud detection", "translation", "face filters", "weather"], answer: 0 },
      { q: "A fair concern about AI in hospitals is…", options: ["it is too colourful", "patient data privacy", "it cannot count", "it uses paper"], answer: 1 },
    ],
  },
  "c7-ai-3": {
    bigIdea: "Pick the chart that answers the question",
    visual: { type: "chart", props: { mode: "line", modes: ["line", "bar", "pie"], unit: "°C", data: [{ label: "Mon", value: 28 }, { label: "Tue", value: 31 }, { label: "Wed", value: 33 }, { label: "Thu", value: 30 }, { label: "Fri", value: 35 }] } },
    prompt: "A trend over days — line, bar or pie? Switch and compare.",
    exploreNote: "Line for change over time, bar for comparing categories, pie for parts of a whole. A pie of temperatures makes no sense — ask why.",
    keyWords: ["line graph", "bar graph", "pie chart", "trend", "insight"],
    checks: [
      { q: "To show how a plant grows week by week, use a…", options: ["pie chart", "line graph", "map", "tally only"], answer: 1 },
      { q: "To show how pocket money is split into parts, use a…", options: ["pie chart", "line graph", "number line", "clock"], answer: 0 },
    ],
  },
  "c7-ai-4": {
    bigIdea: "Biased data makes biased AI",
    visual: { type: "bias", props: { groups: ["Group A", "Group B"], skewed: [18, 2], balanced: [10, 10], what: "faces" } },
    prompt: "Switch to balanced data. What happens to Group B?",
    exploreNote: "The numbers are illustrative. Key message: an AI learns only what its data shows it.",
    keyWords: ["bias", "fair", "dataset", "representative", "responsible AI"],
    checks: [
      { q: "A model trained mostly on photos of one group works worse on others. This is…", options: ["bias", "encryption", "a cipher", "a bug in the screen"], answer: 0 },
      { q: "A good first step to reduce bias is…", options: ["delete all data", "collect balanced, varied data", "use bigger fonts", "train faster"], answer: 1 },
    ],
  },
};
