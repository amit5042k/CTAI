// "Present to class" content for Class 5 (original classroom material).

export default {
  "c5-ct-1": {
    bigIdea: "Plan the route, then the time",
    visual: { type: "flow", props: { steps: ["Delhi → Agra by train (3 h)", "Agra → Jaipur by bus (5 h)", "Jaipur → Ajmer by car (2 h)", "Total: 10 hours of travel"] } },
    prompt: "Reveal the trip step by step. Can you find a quicker plan?",
    keyWords: ["route", "distance", "time", "plan", "total"],
    checks: [
      { q: "A bus goes 60 km each hour. How far in 4 hours?", options: ["64 km", "200 km", "240 km", "15 km"], answer: 2 },
      { q: "Leave at 7:30 a.m., travel 5 hours. Arrive at…", options: ["12:30 p.m.", "11:30 a.m.", "1:30 p.m.", "12:00 noon"], answer: 0 },
    ],
  },
  "c5-ct-2": {
    bigIdea: "Fractions are numbers between whole numbers",
    visual: { type: "fractions", props: { bars: [{ n: 8, k: 3 }, { n: 8, k: 5 }] } },
    explore: { type: "fractions", props: { bars: [{ n: 8, k: 3 }, { n: 8, k: 2 }, { n: 4, k: 1 }] } },
    prompt: "Shade 3/8 and 2/8. What do they make together?",
    exploreNote: "Draw a 0–1 number line split into eighths on the board: 3/8 + 2/8 = 5/8 lands on the fifth tick.",
    keyWords: ["fraction", "numerator", "denominator", "like fractions", "number line"],
    checks: [
      { q: "2/7 + 3/7 = ?", options: ["5/14", "5/7", "6/7", "1"], answer: 1 },
      { q: "Which is bigger?", options: ["3/10", "7/10", "they are equal", "can't tell"], answer: 1 },
    ],
  },
  "c5-ct-3": {
    bigIdea: "An angle is an amount of turn",
    visual: { type: "angle", props: { deg: 90 } },
    prompt: "Make a quarter turn, a half turn and a full turn.",
    keyWords: ["turn", "right angle", "acute", "obtuse", "quarter turn"],
    checks: [
      { q: "A half turn is…", options: ["90°", "180°", "270°", "360°"], answer: 1 },
      { q: "An angle smaller than a right angle is…", options: ["acute", "obtuse", "straight", "reflex"], answer: 0 },
    ],
  },
  "c5-ct-4": {
    bigIdea: "Grids and directions find places",
    visual: { type: "gridMap", props: { cols: 8, rows: 6, start: [0, 5], moves: "NNEEEENN", places: [{ name: "Station", x: 0, y: 5 }, { name: "Fort", x: 4, y: 1 }, { name: "Market", x: 6, y: 4 }, { name: "Lake", x: 2, y: 2 }] } },
    prompt: "Guide the traveller from the Station to the Market.",
    keyWords: ["grid", "map", "north", "east", "route", "location"],
    checks: [
      { q: "Facing North, you turn right. Now you face…", options: ["South", "East", "West", "North"], answer: 1 },
      { q: "From B2 move 3 squares East. You reach…", options: ["E2", "B5", "C3", "D2"], answer: 0 },
    ],
  },
  "c5-ct-5": {
    bigIdea: "A map scale turns cm into km",
    visual: { type: "ruler", props: { length: 4, max: 12, scale: 5, scaleUnit: "km" } },
    prompt: "1 cm on the map = 5 km. Measure, then convert.",
    keyWords: ["scale", "distance", "estimate", "near", "far"],
    checks: [
      { q: "Scale 1 cm = 2 km. 6 cm on the map is…", options: ["3 km", "8 km", "12 km", "62 km"], answer: 2 },
      { q: "Which is nearest your school, usually?", options: ["Your classroom door", "The next city", "The airport", "The state capital"], answer: 0 },
    ],
  },
  "c5-ct-6": {
    bigIdea: "Rates: litres per cow",
    visual: { type: "array", props: { rows: 6, cols: 8 } },
    explore: { type: "ratio", props: { a: { label: "Cows", v: 1, unit: "cow(s)" }, b: { label: "Milk (litres a day)", v: 8, unit: "litres" }, max: 6 } },
    prompt: "Each cow gives 8 litres a day. How much from 6 cows?",
    keyWords: ["rate", "per", "multiply", "divide", "litres"],
    checks: [
      { q: "4 cows give 32 litres. One cow gives…", options: ["4 l", "8 l", "28 l", "128 l"], answer: 1 },
      { q: "Milk at ₹50 a litre. 6 litres cost…", options: ["₹56", "₹300", "₹250", "₹350"], answer: 1 },
    ],
  },
  "c5-ct-7": {
    bigIdea: "Some shapes tile with no gaps",
    visual: { type: "tiles", props: { kind: "hexagon" } },
    explore: { type: "sequence", props: { items: ["1", "4", "7", "10", "13", "16"], hide: 2, rule: "add 3 each time" } },
    prompt: "Every pattern has a rule. Find it!",
    keyWords: ["polygon", "tiling", "tessellation", "rule", "pattern"],
    checks: [
      { q: "Which shape does NOT tile a floor without gaps?", options: ["Square", "Equilateral triangle", "Regular hexagon", "Circle"], answer: 3 },
      { q: "Rule ‘double it’: 3, 6, 12, … next?", options: ["15", "18", "24", "36"], answer: 2 },
    ],
  },
  "c5-ct-8": {
    bigIdea: "1000 g = 1 kg and 1000 ml = 1 l",
    visual: { type: "balance", props: { left: [1500], leftLabel: "Flour 1.5 kg", right: [1000, 200], weights: [1000, 500, 200, 100, 50] } },
    prompt: "Balance 1.5 kg. Say the answer in grams too.",
    keyWords: ["convert", "gram", "kilogram", "millilitre", "litre"],
    checks: [
      { q: "2.5 l = ? ml", options: ["25", "250", "2500", "25000"], answer: 2 },
      { q: "750 g + 500 g = ?", options: ["1 kg 250 g", "1 kg 25 g", "12 kg 50 g", "1250 kg"], answer: 0 },
    ],
  },
  "c5-ct-9": {
    bigIdea: "Estimate, then multiply to check",
    visual: { type: "array", props: { rows: 7, cols: 9 } },
    explore: { type: "worksteps", props: { lines: ["23 rows × 18 trees", "Estimate: 20 × 20 = 400", "23 × 18 = 23 × 10 + 23 × 8", "= 230 + 184", "= 414 trees ✓"] } },
    prompt: "How many coconut trees? Estimate first!",
    keyWords: ["estimate", "multiply", "divide", "rows", "total"],
    checks: [
      { q: "Best estimate of 49 × 21?", options: ["100", "500", "1000", "2000"], answer: 2 },
      { q: "96 coconuts packed in bags of 8. Bags needed?", options: ["8", "12", "88", "104"], answer: 1 },
    ],
  },
  "c5-ct-10": {
    bigIdea: "Turn a design: does it look the same?",
    visual: { type: "symmetry", props: { mode: "rotate", order: 4 } },
    prompt: "Turn the rangoli. How many turns until it matches again?",
    keyWords: ["rotation", "order", "line symmetry", "rangoli", "design"],
    checks: [
      { q: "A design looks the same after every quarter turn. Order of rotation?", options: ["1", "2", "4", "8"], answer: 2 },
      { q: "How many lines of symmetry does an equilateral triangle have?", options: ["1", "2", "3", "6"], answer: 2 },
    ],
  },
  "c5-ct-11": {
    bigIdea: "Count tiles to find area",
    visual: { type: "areaGrid", props: { w: 7, h: 4 } },
    explore: { type: "fractions", props: { bars: [{ n: 4, k: 1 }, { n: 8, k: 2 }, { n: 12, k: 3 }] } },
    prompt: "What fraction of the quilt is shaded?",
    keyWords: ["area", "tile", "square unit", "fraction", "whole"],
    checks: [
      { q: "A quilt is 6 squares by 5 squares. Total squares?", options: ["11", "22", "30", "36"], answer: 2 },
      { q: "3 of 12 squares are red. Fraction red?", options: ["1/3", "1/4", "3/4", "1/12"], answer: 1 },
    ],
  },
  "c5-ct-12": {
    bigIdea: "60 seconds make a minute",
    visual: { type: "clock", props: { h: 9, m: 0 } },
    explore: { type: "chart", props: { mode: "bar", unit: "seconds", title: "100 m race times (fastest = shortest bar)", data: [{ label: "Asha", value: 16 }, { label: "Ravi", value: 14 }, { label: "Zoya", value: 18 }, { label: "Kiran", value: 15 }] } },
    prompt: "Who won the race? Who came last?",
    keyWords: ["second", "minute", "hour", "duration", "order"],
    checks: [
      { q: "2 minutes 15 seconds = ? seconds", options: ["215", "135", "120", "75"], answer: 1 },
      { q: "In a race, the winner has the…", options: ["longest time", "shortest time", "most seconds", "biggest bar"], answer: 1 },
    ],
  },
  "c5-ct-13": {
    bigIdea: "Jumps on a number line",
    visual: { type: "numberLine", props: { min: 0, max: 30, start: 0, jumps: [4, 4, 4, 4, 4, 4], tickEvery: 1, labelEvery: 2 } },
    prompt: "The frog jumps 4 each time. Where does it land after 6 jumps?",
    keyWords: ["number line", "jump", "skip count", "missing number"],
    checks: [
      { q: "A rabbit starts at 3 and jumps +5 three times. It lands on…", options: ["15", "18", "8", "20"], answer: 1 },
      { q: "Missing number: 7, 13, ___, 25", options: ["17", "18", "19", "20"], answer: 2 },
    ],
  },
  "c5-ct-14": {
    bigIdea: "Scale, direction and grid reference",
    visual: { type: "gridMap", props: { cols: 8, rows: 6, start: [1, 4], moves: "EEENNE", places: [{ name: "School", x: 1, y: 4 }, { name: "Park", x: 5, y: 2 }, { name: "Hospital", x: 6, y: 5 }, { name: "Temple", x: 3, y: 0 }] } },
    prompt: "Give directions from the School to the Hospital.",
    keyWords: ["map", "scale", "grid reference", "direction", "landmark"],
    checks: [
      { q: "Each square is 100 m. 5 squares East is…", options: ["50 m", "500 m", "105 m", "5 km"], answer: 1 },
      { q: "On most maps, North points…", options: ["down", "left", "up", "right"], answer: 2 },
    ],
  },
  "c5-ct-15": {
    bigIdea: "One picture can stand for many",
    visual: { type: "chart", props: { mode: "picto", modes: ["picto", "bar"], per: 10, unit: "books", data: [{ label: "Mon", value: 40 }, { label: "Tue", value: 25 }, { label: "Wed", value: 60 }, { label: "Thu", value: 35 }] } },
    prompt: "Each ● = 10 books. What does half a ● mean?",
    keyWords: ["pictograph", "key", "scale", "infer", "half symbol"],
    checks: [
      { q: "Key ● = 10. 3½ ● shows…", options: ["3", "30", "35", "40"], answer: 2 },
      { q: "On which day were the most books borrowed?", options: ["Mon", "Tue", "Wed", "Thu"], answer: 2 },
    ],
  },
};
