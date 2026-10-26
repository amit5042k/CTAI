// "Present to class" content for Class 3. Original classroom material:
// each chapter has an illustration, an explore prompt, key words and two
// quick class-check questions (answer = index into options).

export default {
  "c3-ct-1": {
    bigIdea: "A secret rule hides a message",
    visual: { type: "cipher", props: { words: ["CAT", "RAMU", "MANGO", "HELLO"], shift: 3 } },
    prompt: "Change the key. What happens to the secret word?",
    exploreNote: "Ask a student to choose a key and a word; the class decodes it by shifting back.",
    keyWords: ["code", "cipher", "key", "encode", "decode", "secret"],
    checks: [
      { q: "With key +1, what does DOG become?", options: ["EPH", "CNF", "DOH", "FQI"], answer: 0, explain: "D→E, O→P, G→H." },
      { q: "A friend sends JHH with key +2. What was the word?", options: ["LJJ", "HFF", "GEE", "IGG"], answer: 1, explain: "Shift each letter back by 2: J→H, H→F." },
    ],
  },
  "c3-ct-2": {
    bigIdea: "Solid shapes have faces, edges and corners",
    visual: { type: "solids", props: { items: ["cube", "cuboid", "cylinder", "cone", "sphere", "pyramid"] } },
    prompt: "Tap a toy shape. Count its faces, edges and corners.",
    keyWords: ["face", "edge", "corner", "cube", "cylinder", "cone", "sphere"],
    checks: [
      { q: "How many faces does a dice (cube) have?", options: ["4", "6", "8", "12"], answer: 1 },
      { q: "Which shape can roll AND stack?", options: ["Sphere", "Cube", "Cylinder", "Pyramid"], answer: 2, explain: "It has a curved face to roll and flat faces to stack." },
    ],
  },
  "c3-ct-3": {
    bigIdea: "Hundreds, tens and ones build a number",
    visual: { type: "blocks", props: { value: 156 } },
    prompt: "Build 200 with the blocks. How else can you make 156?",
    keyWords: ["hundreds", "tens", "ones", "place value", "200"],
    checks: [
      { q: "1 hundred, 9 tens and 4 ones make…", options: ["149", "194", "914", "1094"], answer: 1 },
      { q: "How many tens are there in 200?", options: ["2", "10", "20", "100"], answer: 2 },
    ],
  },
  "c3-ct-4": {
    bigIdea: "A journey is a sequence of steps",
    visual: { type: "flow", props: { steps: ["Pack the bag", "Walk to the bus stop", "Take the bus to the station", "Board the train", "Reach Nani Maa's home"] } },
    prompt: "Put the journey in order. What happens if we swap two steps?",
    keyWords: ["sequence", "step", "order", "plan", "journey"],
    checks: [
      { q: "The train leaves at 9:00. The walk to the station takes 20 minutes. When should we leave home?", options: ["9:20", "8:40 or earlier", "9:00", "8:00 exactly"], answer: 1 },
      { q: "Ticket ₹45 each. Two tickets cost…", options: ["₹80", "₹90", "₹95", "₹100"], answer: 1 },
    ],
  },
  "c3-ct-5": {
    bigIdea: "Shapes are named by their sides and corners",
    visual: { type: "shapes", props: { items: ["triangle", "square", "rectangle", "pentagon", "hexagon", "circle"] } },
    explore: { type: "sequence", props: { items: ["triangle:#1f47e0", "square:#ea580c", "square:#ea580c", "triangle:#1f47e0", "square:#ea580c", "square:#ea580c", "triangle:#1f47e0", "square:#ea580c"], hide: 2, rule: "triangle, square, square — repeat" } },
    prompt: "Find the repeating unit. What comes next?",
    keyWords: ["side", "corner", "triangle", "pattern", "repeat"],
    checks: [
      { q: "A shape has 5 sides. What is it called?", options: ["Hexagon", "Pentagon", "Square", "Octagon"], answer: 1 },
      { q: "Circle, star, circle, star, circle, … what next?", options: ["Circle", "Star", "Square", "Triangle"], answer: 1 },
    ],
  },
  "c3-ct-6": {
    bigIdea: "The place of a digit tells its value",
    visual: { type: "placeChart", props: { labels: ["Hundreds", "Tens", "Ones"], digits: [4, 7, 2] } },
    explore: { type: "blocks", props: { value: 472 } },
    prompt: "Change the blocks. Read the number aloud together.",
    keyWords: ["hundreds", "tens", "ones", "greater than", "less than", "order"],
    checks: [
      { q: "Which number is the greatest?", options: ["589", "598", "859", "895"], answer: 3 },
      { q: "In 607, the digit 0 stands for…", options: ["0 hundreds", "0 tens", "0 ones", "nothing at all"], answer: 1, explain: "It holds the tens place." },
    ],
  },
  "c3-ct-7": {
    bigIdea: "Break a big sum into easy parts",
    visual: { type: "worksteps", props: { lines: ["48 + 35", "= 40 + 30 + 8 + 5", "= 70 + 13", "= 83"], notes: ["rakhis made by two sisters", "split into tens and ones", "add tens, add ones", "join them"] } },
    prompt: "Split the numbers into tens and ones, then add.",
    keyWords: ["add", "split", "tens", "ones", "total"],
    checks: [
      { q: "Meena buys rakhis for ₹25 and ₹38. Total?", options: ["₹53", "₹63", "₹513", "₹73"], answer: 1 },
      { q: "36 + 47: first add the tens. 30 + 40 = ?", options: ["7", "70", "13", "83"], answer: 1 },
    ],
  },
  "c3-ct-8": {
    bigIdea: "Fair share means equal share",
    visual: { type: "share", props: { total: 14, groups: 4 } },
    prompt: "Share the laddoos fairly. When is something left over?",
    keyWords: ["share", "equal", "each", "left over", "divide"],
    checks: [
      { q: "12 pencils shared equally by 3 friends. Each gets…", options: ["3", "4", "6", "9"], answer: 1 },
      { q: "10 sweets shared by 4 children. How many are left over?", options: ["0", "1", "2", "3"], answer: 2, explain: "Each gets 2 (8 used), 2 left over." },
    ],
  },
  "c3-ct-9": {
    bigIdea: "Guess first, then add or take away",
    visual: { type: "worksteps", props: { lines: ["356 + 278", "Estimate: 350 + 280 ≈ 630", "Ones: 6 + 8 = 14 → write 4, carry 1", "Tens: 5 + 7 + 1 = 13 → write 3, carry 1", "Hundreds: 3 + 2 + 1 = 6", "Answer: 634 ✓ close to 630"] } },
    explore: { type: "blocks", props: { value: 356 } },
    prompt: "Add 278 to 356 with blocks: when do 10 ones become 1 ten?",
    keyWords: ["estimate", "regroup", "carry", "borrow", "check"],
    checks: [
      { q: "Best estimate for 498 + 203?", options: ["600", "700", "800", "900"], answer: 1 },
      { q: "500 − 236 = ?", options: ["264", "274", "336", "364"], answer: 0 },
    ],
  },
  "c3-ct-10": {
    bigIdea: "Equal groups make multiplication",
    visual: { type: "array", props: { rows: 4, cols: 5 } },
    prompt: "4 tables, 5 plates on each. Change the rows and columns!",
    keyWords: ["groups", "rows", "times", "multiply", "array"],
    checks: [
      { q: "6 children, 3 balloons each. How many balloons?", options: ["9", "12", "18", "21"], answer: 2 },
      { q: "5 + 5 + 5 + 5 is the same as…", options: ["5 × 5", "4 × 5", "5 + 4", "20 × 4"], answer: 1 },
    ],
  },
  "c3-ct-11": {
    bigIdea: "Compare by balancing and filling",
    visual: { type: "balance", props: { left: [1000], leftLabel: "Melon 1 kg", right: [500, 200, 200, 100], weights: [500, 200, 100] } },
    prompt: "Add weights until the scale balances.",
    keyWords: ["heavier", "lighter", "balance", "litre", "kilogram", "capacity"],
    checks: [
      { q: "A balance tips down on the left. The left side is…", options: ["lighter", "heavier", "equal", "empty"], answer: 1 },
      { q: "How many 250 ml glasses fill a 1 litre bottle?", options: ["2", "3", "4", "5"], answer: 2 },
    ],
  },
  "c3-ct-12": {
    bigIdea: "Pay, then count the change",
    visual: { type: "money", props: { price: 37, paid: [50], item: "Kite", options: [1, 2, 5, 10, 20, 50, 100] } },
    prompt: "Pay for the kite. How much change comes back?",
    keyWords: ["rupees", "price", "pay", "change", "total"],
    checks: [
      { q: "A pen costs ₹18. You pay ₹20. Change?", options: ["₹2", "₹8", "₹12", "₹38"], answer: 0 },
      { q: "Which notes make ₹75?", options: ["50 + 20 + 5", "50 + 10 + 5", "20 + 20 + 20", "50 + 20 + 10"], answer: 0 },
    ],
  },
  "c3-ct-13": {
    bigIdea: "Clocks and calendars measure time",
    visual: { type: "clock", props: { h: 7, m: 30 } },
    prompt: "Set the clock to school time, lunch time and home time.",
    keyWords: ["hour hand", "minute hand", "o'clock", "half past", "week", "month"],
    checks: [
      { q: "Minute hand on 12, hour hand on 4. The time is…", options: ["12:04", "4:00", "4:12", "12:20"], answer: 1 },
      { q: "If today is Monday, what day is it 3 days later?", options: ["Wednesday", "Thursday", "Friday", "Sunday"], answer: 1 },
    ],
  },
  "c3-ct-14": {
    bigIdea: "Pictures can show data",
    visual: { type: "chart", props: { mode: "picto", modes: ["picto", "bar"], per: 2, unit: "toys", data: [{ label: "Puppets", value: 8 }, { label: "Kites", value: 5 }, { label: "Pots", value: 10 }, { label: "Bangles", value: 6 }] } },
    prompt: "Which stall sold the most? Switch to the bar graph to check.",
    keyWords: ["data", "pictograph", "key", "most", "least"],
    checks: [
      { q: "Key: one picture = 2 toys. 4 pictures stand for…", options: ["4 toys", "6 toys", "8 toys", "2 toys"], answer: 2 },
      { q: "In the fair chart, which stall sold the fewest?", options: ["Puppets", "Kites", "Pots", "Bangles"], answer: 1 },
    ],
  },
};
