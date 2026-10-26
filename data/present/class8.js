// "Present to class" content for Class 8 (original classroom material).

export default {
  "c8-ct-1": {
    bigIdea: "Squares are areas, cubes are volumes",
    visual: { type: "powers", props: { mode: "square", n: 5 } },
    explore: { type: "powers", props: { mode: "cube", n: 3 } },
    prompt: "Grow the cube. How many small cubes each time?",
    exploreNote: "Compare with the square: 1, 4, 9, 16 vs 1, 8, 27, 64. Ask which numbers are both (1, 64).",
    keyWords: ["square", "square root", "cube", "cube root", "perfect square"],
    checks: [
      { q: "√144 = ?", options: ["11", "12", "14", "72"], answer: 1 },
      { q: "Which is a perfect cube?", options: ["36", "49", "125", "200"], answer: 2 },
    ],
  },
  "c8-ct-2": {
    bigIdea: "Exponents are repeated multiplication",
    visual: { type: "powers", props: { mode: "power", base: 2, n: 6 } },
    prompt: "Double, double, double… how fast does 2ⁿ grow?",
    keyWords: ["base", "exponent", "power", "standard form", "laws of exponents"],
    checks: [
      { q: "2³ × 2⁴ = ?", options: ["2⁷", "2¹²", "4⁷", "2¹"], answer: 0 },
      { q: "3,40,000 in standard form is…", options: ["34 × 10⁴", "3.4 × 10⁵", "3.4 × 10⁴", "0.34 × 10⁶"], answer: 1 },
    ],
  },
  "c8-ct-3": {
    bigIdea: "Place value changed how we count",
    visual: { type: "converter", props: { mode: "roman", value: 1947 } },
    explore: { type: "converter", props: { mode: "binary", value: 13 } },
    prompt: "Computers count with only 0 and 1. Light up the bulbs!",
    exploreNote: "Roman numerals have no zero and no place value; Indian numerals (with zero) made arithmetic easy.",
    keyWords: ["number system", "place value", "zero", "Roman numerals", "binary"],
    checks: [
      { q: "XLIV = ?", options: ["46", "44", "64", "54"], answer: 1 },
      { q: "Binary 1010 = ?", options: ["10", "5", "12", "1010"], answer: 0 },
    ],
  },
  "c8-ct-4": {
    bigIdea: "Every quadrilateral has angles adding to 360°",
    visual: { type: "shapes", props: { items: ["square", "rectangle", "rhombus", "parallelogram", "trapezium", "kite"] } },
    prompt: "Tap each quadrilateral. Which properties does it have?",
    keyWords: ["quadrilateral", "parallelogram", "rhombus", "trapezium", "diagonal", "360°"],
    checks: [
      { q: "Three angles of a quadrilateral are 90°, 90°, 100°. The fourth is…", options: ["70°", "80°", "90°", "100°"], answer: 1 },
      { q: "A rhombus with all angles 90° is a…", options: ["kite", "square", "trapezium", "triangle"], answer: 1 },
    ],
  },
  "c8-ct-5": {
    bigIdea: "Make a conjecture, then test it",
    visual: { type: "machine", props: { inputs: [7, 12, 25, 40], steps: [{ op: "*", n: 2 }, { op: "+", n: 10 }, { op: "/", n: 2 }, { op: "-start" }] } },
    prompt: "Try many starting numbers. Why is the answer always 5?",
    exploreNote: "With n: (2n + 10) ÷ 2 − n = n + 5 − n = 5. One counter-example can break a conjecture; many examples never prove it.",
    keyWords: ["conjecture", "test", "counter-example", "prime", "proof"],
    checks: [
      { q: "Conjecture: ‘all odd numbers are prime’. A counter-example is…", options: ["3", "7", "9", "13"], answer: 2 },
      { q: "The sum of two odd numbers is always…", options: ["odd", "even", "prime", "a square"], answer: 1 },
    ],
  },
  "c8-ct-6": {
    bigIdea: "a × (b + c) = a × b + a × c",
    visual: { type: "areaGrid", props: { w: 10, h: 4, split: 7 } },
    prompt: "Move the split. Does the total area change?",
    exploreNote: "Mental maths: 7 × 104 = 7 × 100 + 7 × 4 = 728.",
    keyWords: ["distributive property", "expand", "area model", "factorise"],
    checks: [
      { q: "6 × 98 = 6 × 100 − 6 × 2 = ?", options: ["588", "598", "608", "612"], answer: 0 },
      { q: "Expand 3(x + 4)", options: ["3x + 4", "3x + 12", "x + 12", "7x"], answer: 1 },
    ],
  },
  "c8-ct-7": {
    bigIdea: "Proportional quantities grow together",
    visual: { type: "ratio", props: { a: { label: "Rice (kg)", v: 2, unit: "kg" }, b: { label: "Cost (₹)", v: 90, unit: "rupees" }, max: 5 } },
    prompt: "2 kg cost ₹90. Slide along: what do 10 kg cost?",
    exploreNote: "Contrast inverse proportion: more workers → fewer days (workers × days stays the same).",
    keyWords: ["ratio", "proportion", "direct", "inverse", "unitary method"],
    checks: [
      { q: "5 pens cost ₹60. 8 pens cost…", options: ["₹80", "₹90", "₹96", "₹100"], answer: 2 },
      { q: "4 workers take 6 days. 8 workers (same speed) take…", options: ["12 days", "3 days", "6 days", "2 days"], answer: 1 },
    ],
  },
  "c8-ai-1": {
    bigIdea: "AI projects follow a lifecycle",
    visual: { type: "flow", props: { mode: "cycle", steps: [
      { t: "Problem scoping", d: "What problem? For whom? Why does it matter?" },
      { t: "Data acquisition", d: "Collect relevant, reliable data" },
      { t: "Data exploration", d: "Clean it and look for patterns with charts" },
      { t: "Modelling", d: "Choose and train a model on the data" },
      { t: "Evaluation", d: "Test on new data — is it accurate and fair?" },
      { t: "Deployment", d: "Put it to use and keep improving" },
    ] } },
    prompt: "Tap each stage. Plan an AI to reduce canteen food waste.",
    keyWords: ["problem scoping", "data acquisition", "exploration", "modelling", "evaluation", "deployment"],
    checks: [
      { q: "Testing a trained model on new data happens in…", options: ["problem scoping", "evaluation", "data acquisition", "deployment"], answer: 1 },
      { q: "The very first stage is…", options: ["modelling", "deployment", "problem scoping", "evaluation"], answer: 2 },
    ],
  },
  "c8-ai-2": {
    bigIdea: "AI analyses, recognises, learns and predicts",
    visual: { type: "hub", props: { center: "AI", spokes: [
      { label: "Analyse data", items: ["sales trends", "exam result patterns"] },
      { label: "Recognise patterns", items: ["handwriting", "faces", "spam e-mails"] },
      { label: "Learn", items: ["gets better with more examples", "game-playing AI"] },
      { label: "Predict", items: ["rain tomorrow", "traffic jams", "crop yield"] },
    ] } },
    prompt: "Tap each ability. Which apps on your phone do this?",
    keyWords: ["analyse", "recognise", "learn", "predict", "application"],
    checks: [
      { q: "A keyboard that suggests your next word is…", options: ["predicting", "painting", "encrypting", "printing"], answer: 0 },
      { q: "Sorting spam from real e-mail is mainly…", options: ["pattern recognition", "a spreadsheet", "a calendar", "random"], answer: 0 },
    ],
  },
  "c8-ai-3": {
    bigIdea: "Fair AI needs fair data",
    visual: { type: "bias", props: { groups: ["Urban students", "Rural students"], skewed: [17, 3], balanced: [10, 10], what: "examples" } },
    prompt: "What changes when the data represents everyone?",
    exploreNote: "Illustrative numbers. Discuss: missing values, wrong labels and old data also hurt quality.",
    keyWords: ["data quality", "representative", "fairness", "bias", "accuracy"],
    checks: [
      { q: "A dataset with very few examples of one group is…", options: ["representative", "unrepresentative", "encrypted", "perfect"], answer: 1 },
      { q: "Which improves data quality?", options: ["fixing wrong labels", "copying rows twice", "removing every column", "guessing missing marks"], answer: 0 },
    ],
  },
  "c8-ai-4": {
    bigIdea: "Use AI responsibly",
    visual: { type: "cards", props: { cards: [
      { icon: "⚖️", front: "Fairness", back: "Treat all groups equally; check for bias" },
      { icon: "🔍", front: "Transparency", back: "Explain how and why the AI decides" },
      { icon: "🔒", front: "Privacy", back: "Protect personal data; ask for consent" },
      { icon: "🙋", front: "Accountability", back: "People stay responsible for AI decisions" },
      { icon: "🛡️", front: "Safety", back: "Test well; avoid harm" },
      { icon: "🌱", front: "Benefit", back: "Use AI to help people and the planet" },
    ] } },
    prompt: "Evaluate an AI tool you know against each principle.",
    keyWords: ["fairness", "transparency", "privacy", "accountability", "safety"],
    checks: [
      { q: "An app collects your contacts without asking. Which principle is broken?", options: ["Privacy", "Speed", "Colour", "Size"], answer: 0 },
      { q: "Being able to explain why an AI rejected a form is…", options: ["transparency", "bias", "encryption", "deployment"], answer: 0 },
    ],
  },
};
