// "Present to class" content for Class 6 (original classroom material).

export default {
  "c6-ct-1": {
    bigIdea: "Number patterns can be seen as pictures",
    visual: { type: "dots", props: { kind: "square", upto: 4 } },
    explore: { type: "dots", props: { kind: "triangle", upto: 4 } },
    prompt: "Triangular numbers: how many dots in the next shape?",
    exploreNote: "Contrast with square numbers (1, 4, 9, 16). Ask: what do two triangles side by side make?",
    keyWords: ["pattern", "square numbers", "triangular numbers", "rule", "term"],
    checks: [
      { q: "1, 4, 9, 16, 25, … next?", options: ["30", "34", "36", "49"], answer: 2 },
      { q: "1, 3, 6, 10, 15, … next?", options: ["20", "21", "25", "18"], answer: 1, explain: "Add 2, 3, 4, 5, then 6." },
    ],
  },
  "c6-ct-2": {
    bigIdea: "Angles measure the opening between two rays",
    visual: { type: "angle", props: { deg: 135 } },
    prompt: "Make an acute, a right, an obtuse and a reflex angle.",
    keyWords: ["ray", "vertex", "acute", "obtuse", "reflex", "protractor"],
    checks: [
      { q: "An angle of 120° is…", options: ["acute", "right", "obtuse", "reflex"], answer: 2 },
      { q: "Two lines meeting at 90° are…", options: ["parallel", "perpendicular", "curved", "equal"], answer: 1 },
    ],
  },
  "c6-ct-3": {
    bigIdea: "Numbers hide surprising properties",
    visual: { type: "machine", props: { inputs: [52, 73, 81, 30], steps: [{ op: "rev" }, { op: "+start" }, { op: "/", n: 11 }] } },
    prompt: "Reverse a 2-digit number and add. Why does 11 always divide it?",
    exploreNote: "A number 10a + b reversed is 10b + a; the sum is 11(a + b). Let students test their own numbers.",
    keyWords: ["place value", "digit", "reverse", "conjecture", "test"],
    checks: [
      { q: "43 + 34 = ?", options: ["66", "77", "87", "76"], answer: 1 },
      { q: "In 5,08,213 the digit 8 stands for…", options: ["8 hundred", "8 thousand", "80 thousand", "8 lakh"], answer: 1 },
    ],
  },
  "c6-ct-4": {
    bigIdea: "Choose the right chart for the question",
    visual: { type: "chart", props: { mode: "bar", modes: ["bar", "picto", "tally"], per: 5, data: [{ label: "Cricket", value: 15 }, { label: "Football", value: 10 }, { label: "Kabaddi", value: 8 }, { label: "Kho-kho", value: 7 }] } },
    prompt: "Same data, three charts. Which one is easiest to read?",
    keyWords: ["data", "table", "tally", "pictograph", "bar graph", "scale"],
    checks: [
      { q: "To compare favourite sports of 40 students, the best chart is…", options: ["bar graph", "a single number", "a map", "a clock"], answer: 0 },
      { q: "Bar graph scale 1 unit = 5. A bar 3 units tall shows…", options: ["3", "8", "15", "35"], answer: 2 },
    ],
  },
  "c6-ct-5": {
    bigIdea: "Primes have exactly two factors",
    visual: { type: "hundredGrid", props: { mode: "sieve", max: 100 } },
    prompt: "Cross out multiples of 2, 3, 5, 7. What is left?",
    exploreNote: "This is the Sieve of Eratosthenes. 25 primes remain below 100.",
    keyWords: ["factor", "multiple", "prime", "composite", "prime factorisation"],
    checks: [
      { q: "Which of these is prime?", options: ["21", "27", "29", "33"], answer: 2 },
      { q: "Prime factorisation of 36 is…", options: ["4 × 9", "2 × 2 × 3 × 3", "6 × 6", "2 × 18"], answer: 1 },
    ],
  },
  "c6-ct-6": {
    bigIdea: "Perimeter goes around, area covers inside",
    visual: { type: "areaGrid", props: { w: 6, h: 4 } },
    prompt: "Keep the perimeter at 20. How big can you make the area?",
    exploreNote: "Try 9×1, 8×2, 7×3, 6×4, 5×5: same perimeter 20, areas 9 → 25.",
    keyWords: ["perimeter", "area", "square unit", "rectangle", "length", "breadth"],
    checks: [
      { q: "Perimeter of a 7 cm × 3 cm rectangle?", options: ["10 cm", "20 cm", "21 cm", "21 cm²"], answer: 1 },
      { q: "Area of a 5 m × 5 m square?", options: ["10 m²", "20 m²", "25 m²", "25 m"], answer: 2 },
    ],
  },
  "c6-ct-7": {
    bigIdea: "Same amount, different names",
    visual: { type: "fractions", props: { bars: [{ n: 3, k: 2 }, { n: 6, k: 4 }, { n: 12, k: 8 }] } },
    explore: { type: "fractions", props: { bars: [{ n: 2, k: 1 }, { n: 3, k: 1 }, { n: 6, k: 0 }] } },
    prompt: "1/2 + 1/3: shade sixths on the last bar to find the sum.",
    exploreNote: "1/2 = 3/6 and 1/3 = 2/6, so the total is 5/6.",
    keyWords: ["equivalent", "like", "unlike", "common denominator", "decimal"],
    checks: [
      { q: "1/2 + 1/4 = ?", options: ["2/6", "3/4", "1/6", "2/4"], answer: 1 },
      { q: "3/5 as a decimal is…", options: ["0.35", "0.6", "3.5", "0.06"], answer: 1 },
    ],
  },
  "c6-ct-8": {
    bigIdea: "A compass draws equal distances",
    visual: { type: "construction", props: {} },
    prompt: "Watch the perpendicular bisector appear step by step.",
    keyWords: ["compass", "ruler", "arc", "radius", "perpendicular bisector"],
    checks: [
      { q: "Every point on a circle is the same distance from…", options: ["the edge", "the centre", "the diameter", "the arc"], answer: 1 },
      { q: "A perpendicular bisector meets the segment at…", options: ["45°", "90°", "180°", "60°"], answer: 1 },
    ],
  },
  "c6-ct-9": {
    bigIdea: "Line symmetry and turning symmetry",
    visual: { type: "symmetry", props: { mode: "rotate", order: 6 } },
    explore: { type: "symmetry", props: { size: 8, cells: [[0, 3, 0], [1, 2, 1], [1, 3, 1], [2, 1, 0], [2, 2, 2], [3, 0, 1], [3, 3, 0], [4, 1, 0], [5, 2, 1], [6, 3, 2], [7, 3, 0]] } },
    prompt: "Complete the design using the mirror line.",
    keyWords: ["line symmetry", "rotational symmetry", "order", "reflection"],
    checks: [
      { q: "A regular hexagon has how many lines of symmetry?", options: ["3", "4", "6", "12"], answer: 2 },
      { q: "A rectangle (not square) has rotational symmetry of order…", options: ["1", "2", "4", "0"], answer: 1 },
    ],
  },
  "c6-ct-10": {
    bigIdea: "Numbers continue below zero",
    visual: { type: "numberLine", props: { min: -10, max: 10, start: 3, jumps: [-5, -4, 6], tickEvery: 1, labelEvery: 1 } },
    prompt: "Start at 3. Go down 5, down 4, up 6. Where are we?",
    exploreNote: "Use a lift, temperatures or a bank balance as stories for negative numbers.",
    keyWords: ["integer", "negative", "positive", "zero", "number line"],
    checks: [
      { q: "−4 + 7 = ?", options: ["−11", "−3", "3", "11"], answer: 2 },
      { q: "Which is greater?", options: ["−8", "−2", "−5", "−10"], answer: 1 },
    ],
  },
  "c6-ai-1": {
    bigIdea: "AI lets machines learn and make choices",
    visual: { type: "cards", props: { cards: [
      { icon: "🗣️", front: "Voice assistant", back: "AI — understands speech and answers" },
      { icon: "🧮", front: "Calculator", back: "Not AI — follows fixed rules" },
      { icon: "🎬", front: "Video suggestions", back: "AI — learns what you like" },
      { icon: "💡", front: "Light switch", back: "Not AI — just on/off" },
      { icon: "🗺️", front: "Map traffic route", back: "AI — predicts traffic from data" },
      { icon: "📷", front: "Phone face unlock", back: "AI — recognises your face" },
    ] } },
    prompt: "AI or not AI? Decide, then flip the card.",
    keyWords: ["intelligence", "artificial intelligence", "learn", "predict", "everyday AI"],
    checks: [
      { q: "Which is an example of AI?", options: ["A ceiling fan", "A spam filter that learns", "A pencil", "A wall clock"], answer: 1 },
      { q: "AI systems mostly learn from…", options: ["magic", "data", "electricity alone", "paint"], answer: 1 },
    ],
  },
  "c6-ai-2": {
    bigIdea: "Data comes in many forms",
    visual: { type: "cards", props: { cards: [
      { icon: "🔢", front: "Numbers", back: "Marks, temperatures, prices" },
      { icon: "🔤", front: "Text", back: "Messages, names, stories" },
      { icon: "🖼️", front: "Images", back: "Photos, drawings, X-rays" },
      { icon: "🎵", front: "Audio", back: "Songs, voice notes" },
      { icon: "🎥", front: "Video", back: "Movies, CCTV clips" },
      { icon: "📊", front: "Information", back: "Data that is organised so it has meaning" },
    ] } },
    explore: { type: "chart", props: { mode: "bar", data: [{ label: "Text", value: 9 }, { label: "Images", value: 14 }, { label: "Audio", value: 4 }, { label: "Video", value: 7 }] , title: "Files on a class tablet" } },
    prompt: "Raw data becomes information when we organise it.",
    keyWords: ["data", "information", "numbers", "text", "image", "audio", "video"],
    checks: [
      { q: "A photo of a leaf is which type of data?", options: ["Text", "Image", "Audio", "Number"], answer: 1 },
      { q: "“Average class mark is 72” is…", options: ["raw data", "information", "audio", "a video"], answer: 1 },
    ],
  },
  "c6-ai-3": {
    bigIdea: "Patterns help us decide",
    visual: { type: "tree", props: { tree: { q: "Is it raining?", yes: { leaf: "Indoor games" }, no: { q: "Is it after 5 p.m.?", yes: { leaf: "Go home" }, no: { leaf: "Play outside" } } } } },
    prompt: "Answer the questions to reach a decision.",
    exploreNote: "Have students suggest a new question (e.g. ‘Is the ground wet?’) and add it to the tree.",
    keyWords: ["pattern", "decision", "decision tree", "yes/no question", "rule"],
    checks: [
      { q: "Red, blue, red, blue, red, … next?", options: ["Red", "Blue", "Green", "Yellow"], answer: 1 },
      { q: "In a decision tree, the end boxes show the…", options: ["question", "decision", "data", "error"], answer: 1 },
    ],
  },
  "c6-ai-4": {
    bigIdea: "Be safe, kind and honest online",
    visual: { type: "cards", props: { cards: [
      { icon: "🔑", front: "Password: 123456", back: "Weak! Use a long mix of words, numbers and symbols" },
      { icon: "🎣", front: "“You won a prize! Click here”", back: "Phishing — don't click, tell an adult" },
      { icon: "👣", front: "Posting your school & address", back: "Builds a risky digital footprint" },
      { icon: "📄", front: "Copying a website for homework", back: "Plagiarism — write in your own words and credit sources" },
      { icon: "🤝", front: "A kind comment", back: "Good digital citizenship" },
      { icon: "🍪", front: "Apps tracking your clicks", back: "Passive digital footprint" },
    ] } },
    prompt: "Safe or unsafe? Flip each card and discuss.",
    keyWords: ["ethics", "digital footprint", "phishing", "password", "plagiarism"],
    checks: [
      { q: "Which is the strongest password?", options: ["password", "riya2014", "Blue!Kite7Mango", "123456"], answer: 2 },
      { q: "Searches and location recorded by apps are part of your…", options: ["active footprint", "passive footprint", "password", "homework"], answer: 1 },
    ],
  },
};
