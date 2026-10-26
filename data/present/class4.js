// "Present to class" content for Class 4 (original classroom material).

export default {
  "c4-ct-1": {
    bigIdea: "Shapes are all around us",
    visual: { type: "solids", props: { items: ["cube", "cuboid", "cylinder", "cone", "sphere", "prism"] } },
    explore: { type: "shapes", props: { items: ["triangle", "square", "rectangle", "circle", "pentagon", "hexagon"] } },
    prompt: "Which flat shapes can you find on the faces of the solids?",
    keyWords: ["2D", "3D", "flat", "solid", "face", "properties"],
    checks: [
      { q: "A brick looks like a…", options: ["Cube", "Cuboid", "Cylinder", "Cone"], answer: 1 },
      { q: "Which is a 2D shape?", options: ["Ball", "Box", "Circle", "Can"], answer: 2 },
    ],
  },
  "c4-ct-2": {
    bigIdea: "Each clue removes some possibilities",
    visual: { type: "clues", props: { max: 50, clues: [{ text: "even", rule: "even" }, { text: "> 20", rule: "gt:20" }, { text: "< 40", rule: "lt:40" }, { text: "multiple of 7", rule: "mult:7" }] } },
    prompt: "Turn on one clue at a time. Which numbers can we cross out?",
    keyWords: ["clue", "eliminate", "possible", "logic", "deduce"],
    checks: [
      { q: "I am between 10 and 20. I am odd. I am a multiple of 5. Who am I?", options: ["10", "15", "20", "25"], answer: 1 },
      { q: "Which clue removes the most numbers from 1–50?", options: ["is even", "is less than 49", "is not 7", "is more than 2"], answer: 0 },
    ],
  },
  "c4-ct-3": {
    bigIdea: "Odd and even numbers follow patterns",
    visual: { type: "hundredGrid", props: { mode: "multiples", n: 2, max: 50 } },
    explore: { type: "sequence", props: { items: ["3", "7", "11", "15", "19", "23"], hide: 2, rule: "add 4 each time" } },
    prompt: "Spot the rule. What are the next two numbers?",
    keyWords: ["pattern", "odd", "even", "rule", "next term"],
    checks: [
      { q: "Odd + odd is always…", options: ["odd", "even", "zero", "a multiple of 3"], answer: 1, explain: "e.g. 3 + 5 = 8." },
      { q: "5, 10, 15, 20, … the 6th number is…", options: ["25", "30", "35", "60"], answer: 1 },
    ],
  },
  "c4-ct-4": {
    bigIdea: "Four places: thousands, hundreds, tens, ones",
    visual: { type: "placeChart", props: { labels: ["Thousands", "Hundreds", "Tens", "Ones"], digits: [3, 4, 0, 8] } },
    prompt: "Tap the columns to make the largest 4-digit number you can.",
    keyWords: ["thousands", "place value", "expanded form", "compare", "order"],
    checks: [
      { q: "5000 + 300 + 7 = ?", options: ["537", "5307", "5370", "5037"], answer: 1 },
      { q: "Which is smaller?", options: ["4099", "4190", "4109", "4910"], answer: 0 },
    ],
  },
  "c4-ct-5": {
    bigIdea: "Equal parts of a whole are fractions",
    visual: { type: "fractions", props: { bars: [{ n: 2, k: 1 }, { n: 4, k: 2 }, { n: 8, k: 4 }] } },
    prompt: "Shade the bars. Which fractions cover the same amount?",
    keyWords: ["half", "quarter", "equal parts", "fraction", "whole"],
    checks: [
      { q: "A roti is cut into 4 equal parts. One part is…", options: ["1/2", "1/3", "1/4", "4/1"], answer: 2 },
      { q: "Half of 12 bananas is…", options: ["4", "6", "8", "24"], answer: 1 },
    ],
  },
  "c4-ct-6": {
    bigIdea: "Measure length with the right unit",
    visual: { type: "ruler", props: { length: 8.5, max: 15, object: "Pencil" } },
    prompt: "Change the pencil length. How many millimetres is it?",
    keyWords: ["centimetre", "metre", "millimetre", "estimate", "ruler"],
    checks: [
      { q: "1 metre = ? centimetres", options: ["10", "100", "1000", "60"], answer: 1 },
      { q: "Best unit for the length of a classroom?", options: ["mm", "cm", "m", "km"], answer: 2 },
    ],
  },
  "c4-ct-7": {
    bigIdea: "Bar graphs help us compare and decide",
    visual: { type: "chart", props: { mode: "bar", unit: "kg of waste", data: [{ label: "Ward 1", value: 12 }, { label: "Ward 2", value: 7 }, { label: "Ward 3", value: 15 }, { label: "Ward 4", value: 4 }] } },
    prompt: "Which ward is cleanest? By how much?",
    keyWords: ["bar graph", "compare", "data", "decision", "scale"],
    checks: [
      { q: "From the graph, which ward has the least waste?", options: ["Ward 1", "Ward 2", "Ward 3", "Ward 4"], answer: 3 },
      { q: "How much more waste does Ward 3 have than Ward 1?", options: ["2 kg", "3 kg", "5 kg", "27 kg"], answer: 1 },
    ],
  },
  "c4-ct-8": {
    bigIdea: "Grams and kilograms, millilitres and litres",
    visual: { type: "balance", props: { left: [2000], leftLabel: "Rice 2 kg", right: [1000, 500], weights: [1000, 500, 200, 100] } },
    prompt: "Balance the 2 kg bag. Try different weights.",
    keyWords: ["gram", "kilogram", "millilitre", "litre", "estimate"],
    checks: [
      { q: "1 kg 250 g = ? g", options: ["125", "1025", "1250", "12500"], answer: 2 },
      { q: "A bucket holds 10 l. A mug holds 500 ml. Mugs to fill the bucket?", options: ["5", "10", "20", "50"], answer: 2 },
    ],
  },
  "c4-ct-9": {
    bigIdea: "Repeated adding is multiplying",
    visual: { type: "array", props: { rows: 3, cols: 6, item: "square" } },
    prompt: "Make an array for 24 in two different ways.",
    keyWords: ["equal groups", "array", "repeated addition", "product", "times table"],
    checks: [
      { q: "7 + 7 + 7 + 7 = ?", options: ["4 × 7 = 28", "7 × 7 = 49", "4 + 7 = 11", "3 × 7 = 21"], answer: 0 },
      { q: "Which array shows 3 × 8?", options: ["3 rows of 8", "3 rows of 3", "8 rows of 8", "11 in a row"], answer: 0 },
    ],
  },
  "c4-ct-10": {
    bigIdea: "Division shares into equal groups",
    visual: { type: "share", props: { total: 23, groups: 5 } },
    prompt: "23 animals into 5 enclosures. What do we do with the remainder?",
    keyWords: ["divide", "quotient", "remainder", "equal groups"],
    checks: [
      { q: "45 ÷ 5 = ?", options: ["8", "9", "10", "40"], answer: 1 },
      { q: "22 children, 4 per jeep. How many jeeps are needed?", options: ["5", "6", "4", "7"], answer: 1, explain: "5 jeeps carry 20; 2 children still need a 6th jeep." },
    ],
  },
  "c4-ct-11": {
    bigIdea: "A mirror line makes two matching halves",
    visual: { type: "symmetry", props: { size: 8, cells: [[1, 3, 0], [2, 2, 0], [2, 3, 1], [3, 1, 0], [3, 3, 1], [4, 2, 2], [5, 3, 2], [6, 3, 0]] } },
    prompt: "Predict the other half — then reflect to check.",
    keyWords: ["symmetry", "line of symmetry", "mirror", "half", "reflection"],
    checks: [
      { q: "How many lines of symmetry does a square have?", options: ["1", "2", "4", "0"], answer: 2 },
      { q: "Which letter has a vertical line of symmetry?", options: ["F", "A", "J", "S"], answer: 1 },
    ],
  },
  "c4-ct-12": {
    bigIdea: "Time to the minute, days across the calendar",
    visual: { type: "clock", props: { h: 10, m: 35 } },
    prompt: "Start at 10:35. How long until 11:10?",
    keyWords: ["minute", "duration", "a.m.", "p.m.", "calendar", "leap year"],
    checks: [
      { q: "From 9:45 to 10:15 is how long?", options: ["30 min", "20 min", "70 min", "1 hour"], answer: 0 },
      { q: "How many days are in March and April together?", options: ["60", "61", "62", "59"], answer: 1, explain: "31 + 30." },
    ],
  },
  "c4-ct-13": {
    bigIdea: "Tally marks count quickly",
    visual: { type: "chart", props: { mode: "tally", modes: ["tally", "bar"], data: [{ label: "Bus", value: 12 }, { label: "Train", value: 8 }, { label: "Bullock cart", value: 3 }, { label: "Aeroplane", value: 6 }] } },
    prompt: "Count the tallies in fives. Then switch to a bar graph.",
    keyWords: ["tally", "table", "frequency", "most", "least"],
    checks: [
      { q: "|||| with a line across, then ||| shows…", options: ["7", "8", "9", "13"], answer: 1 },
      { q: "In the museum chart, which exhibit is least common?", options: ["Bus", "Train", "Bullock cart", "Aeroplane"], answer: 2 },
    ],
  },
  "c4-ct-14": {
    bigIdea: "Collect → organise → show → read",
    visual: { type: "flow", props: { steps: ["Ask a question", "Collect data", "Organise in a table", "Draw a graph", "Answer the question"] } },
    explore: { type: "chart", props: { mode: "bar", modes: ["bar", "picto", "tally"], per: 2, data: [{ label: "Mango", value: 10 }, { label: "Apple", value: 6 }, { label: "Banana", value: 8 }, { label: "Guava", value: 4 }] } },
    prompt: "Our favourite fruit data — show it three different ways.",
    keyWords: ["data", "survey", "table", "pictograph", "bar graph"],
    checks: [
      { q: "First step of a class survey?", options: ["Draw a graph", "Ask a clear question", "Count the bars", "Colour the chart"], answer: 1 },
      { q: "Key ● = 2. Mango has 10 votes. How many ● ?", options: ["2", "5", "10", "20"], answer: 1 },
    ],
  },
};
