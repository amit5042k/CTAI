// CTAI (Computational Thinking & AI) curriculum, mapped chapter-wise
// from the Class 3-8 Student Handbooks bundled in /data/class-N.pdf.
//
// Classes 3-5: Computational Thinking (CT) only.
// Classes 6-8: CT (Part 1) + AI (Part 2).

export const curriculum = [
  {
    classLevel: 3,
    title: "Class 3 — Computational Thinking (Student Handbook)",
    pillars: ["Computational Thinking"],
    description:
      "Builds foundational CT through observation-based puzzles set in everyday situations: ciphers, shapes, place value, sharing, time, money and data.",
    units: [
      {
        id: "c3-ct-1",
        stream: "CT",
        name: "Chapter 1: What's in a Name?",
        outcomes: [
          "Encode and decode short messages with a Caesar cipher",
          "Recognise that a 'key' is needed to read an encrypted message",
          "Reason about why information needs to be kept private",
        ],
        activities: [
          "Caesar-cipher encoding game with shift keys",
          "Find hidden number-names inside letter grids",
        ],
        intro:
          "A cipher is a way to scramble a message so only someone with the right key can read it. The Caesar cipher shifts every letter forward by a fixed number of places.",
        examples: [
          {
            id: "ex-1",
            title: "Encoding with shift = 1",
            problem: "Encode the word CAT with a shift of 1.",
            solution:
              "Shift each letter one place forward: C → D, A → B, T → U. The encoded word is DBU.",
          },
          {
            id: "ex-2",
            title: "Decoding with shift = 3",
            problem: "Decode the word EBP using shift 3.",
            solution:
              "Shift each letter three places backward: E → B, B → Y, P → M. The decoded word is BYM (which is not a real word — try other shifts when decoding!).",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Encoding A with a shift of 2 gives which letter?",
            options: ["B", "C", "D", "Y"],
            answerIndex: 1,
            explanation: "Move forward 2 places: A → B → C.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "If HELLO is encoded as IFMMP, what was the shift used?",
            options: ["1", "2", "3", "4"],
            answerIndex: 0,
            explanation: "H→I, E→F, L→M each move by 1.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Without knowing the shift key, a Caesar-encoded message cannot be read at all.",
            answer: false,
            explanation:
              "False — there are only 25 useful shifts, so someone could try them all. That's why modern messages use much stronger encryption.",
          },
        ],
      },
      {
        id: "c3-ct-2",
        stream: "CT",
        name: "Chapter 2: Toy Joy",
        outcomes: [
          "Identify top, side and front views of 3D objects",
          "Count faces, edges and corners of solids",
        ],
        activities: ["Match a shape to its top view", "Build & count faces of a paper solid"],
      },
      {
        id: "c3-ct-3",
        stream: "CT",
        name: "Chapter 3: Double Century",
        outcomes: [
          "Make and break numbers up to 200 using place value",
          "Spot patterns in number sequences",
        ],
        activities: ["Number-name search puzzles", "Skip-count puzzle strips"],
      },
      {
        id: "c3-ct-4",
        stream: "CT",
        name: "Chapter 4: Vacation with My Nani Maa",
        outcomes: [
          "Plan a simple journey using sequences of steps",
          "Apply addition and subtraction to story problems",
        ],
        activities: ["Step-by-step trip plan", "Pocket-money story sums"],
      },
      {
        id: "c3-ct-5",
        stream: "CT",
        name: "Chapter 5: Fun with Shapes",
        outcomes: [
          "Classify 2D shapes by sides and corners",
          "Continue and complete shape patterns",
        ],
        activities: ["Tangram puzzle", "Pattern-completion grid"],
      },
      {
        id: "c3-ct-6",
        stream: "CT",
        name: "Chapter 6: House of Hundreds — I",
        outcomes: [
          "Read and write three-digit numbers",
          "Compare and order numbers up to 999",
        ],
        activities: ["Place-value flats/longs/units puzzle"],
      },
      {
        id: "c3-ct-7",
        stream: "CT",
        name: "Chapter 7: Raksha Bandhan",
        outcomes: [
          "Use addition strategies in festival scenarios",
          "Decompose problems into smaller steps",
        ],
        activities: ["Plan a rakhi-making list with quantities"],
      },
      {
        id: "c3-ct-8",
        stream: "CT",
        name: "Chapter 8: Fair Share",
        outcomes: [
          "Share a quantity equally and notice remainders",
          "Connect 'equal sharing' to early division",
        ],
        activities: ["Share sweets fairly between friends"],
      },
      {
        id: "c3-ct-9",
        stream: "CT",
        name: "Chapter 9: House of Hundreds — II",
        outcomes: [
          "Add and subtract three-digit numbers with regrouping",
          "Estimate before computing",
        ],
        activities: ["Estimate-then-check sums"],
      },
      {
        id: "c3-ct-10",
        stream: "CT",
        name: "Chapter 10: Fun at Class Party!",
        outcomes: [
          "Use multiplication ideas in grouping problems",
          "Read simple tables of items and quantities",
        ],
        activities: ["Plan items needed for a class party"],
      },
      {
        id: "c3-ct-11",
        stream: "CT",
        name: "Chapter 11: Filling and Lifting",
        outcomes: [
          "Estimate and compare capacities of containers",
          "Compare weights using balances",
        ],
        activities: ["Capacity-ranking activity", "Balance-the-scale puzzle"],
      },
      {
        id: "c3-ct-12",
        stream: "CT",
        name: "Chapter 12: Give and Take",
        outcomes: [
          "Solve simple word problems on giving/receiving",
          "Use money values for change-making",
        ],
        activities: ["Shop role-play with notes & coins"],
      },
      {
        id: "c3-ct-13",
        stream: "CT",
        name: "Chapter 13: Time Goes On",
        outcomes: [
          "Read time on analog and digital clocks",
          "Sequence events in days, weeks and months",
        ],
        activities: ["Build a daily timeline"],
      },
      {
        id: "c3-ct-14",
        stream: "CT",
        name: "Chapter 14: The Surajkund Fair",
        outcomes: [
          "Read pictographs and simple bar charts",
          "Answer questions from picture-based data",
        ],
        activities: ["Survey & pictograph for favourite fair items"],
      },
    ],
  },
  {
    classLevel: 4,
    title: "Class 4 — Computational Thinking (Student Handbook)",
    pillars: ["Computational Thinking"],
    description:
      "Strengthens pattern recognition, decomposition and abstraction through puzzles on shapes, large numbers, measurement, symmetry, calendar and data.",
    units: [
      {
        id: "c4-ct-1",
        stream: "CT",
        name: "Chapter 1: Shapes Around Us",
        outcomes: [
          "Identify 2D and 3D shapes in the environment",
          "Describe shapes by their properties",
        ],
        activities: ["Shape hunt around the classroom"],
      },
      {
        id: "c4-ct-2",
        stream: "CT",
        name: "Chapter 2: Hide and Seek",
        outcomes: [
          "Use clues to narrow down possibilities",
          "Apply logical elimination to puzzles",
        ],
        activities: ["Number-clue 'guess who' game"],
      },
      {
        id: "c4-ct-3",
        stream: "CT",
        name: "Chapter 3: Patterns Around Us",
        outcomes: [
          "Recognise and extend numeric and visual patterns",
          "Reason with odd/even properties",
        ],
        activities: ["Coin-flip magic on a 5x5 grid"],
        intro:
          "Numbers and shapes often follow rules. If we can spot the rule, we can predict what comes next — that's the heart of computational thinking.",
        examples: [
          {
            id: "ex-1",
            title: "Continue the pattern",
            problem: "What comes next? 2, 4, 6, 8, ?",
            solution:
              "Each number increases by 2, so the next one is 10. The rule is 'add 2 each step'.",
          },
          {
            id: "ex-2",
            title: "Odd vs even check",
            problem: "Is the sum 7 + 4 odd or even?",
            solution:
              "Odd + even = odd. So 7 + 4 = 11 is odd. (You can also just compute it.)",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "What comes next? 1, 3, 5, 7, ?",
            options: ["8", "9", "10", "11"],
            answerIndex: 1,
            explanation: "It's the odd-numbers sequence; add 2 each step.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which sum is even?",
            options: ["3 + 4", "5 + 2", "6 + 4", "7 + 2"],
            answerIndex: 2,
            explanation: "even + even = even, so 6 + 4 = 10 is even.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: Adding two odd numbers always gives an odd result.",
            answer: false,
            explanation: "odd + odd = even. e.g. 3 + 5 = 8.",
          },
        ],
      },
      {
        id: "c4-ct-4",
        stream: "CT",
        name: "Chapter 4: Thousands Around Us",
        outcomes: [
          "Read and write numbers up to 9999",
          "Compare and order four-digit numbers",
        ],
        activities: ["Place-value cards for 4-digit numbers"],
      },
      {
        id: "c4-ct-5",
        stream: "CT",
        name: "Chapter 5: Sharing and Measuring",
        outcomes: [
          "Divide quantities into equal parts",
          "Use simple fractions for sharing",
        ],
        activities: ["Equal-share story problems"],
      },
      {
        id: "c4-ct-6",
        stream: "CT",
        name: "Chapter 6: Measuring Length",
        outcomes: [
          "Estimate and measure lengths in cm and m",
          "Convert between units of length",
        ],
        activities: ["Estimate-then-measure relay"],
      },
      {
        id: "c4-ct-7",
        stream: "CT",
        name: "Chapter 7: The Cleanest Village",
        outcomes: [
          "Use bar graphs to compare quantities",
          "Make decisions from simple data",
        ],
        activities: ["Compare cleanliness scores across villages"],
      },
      {
        id: "c4-ct-8",
        stream: "CT",
        name: "Chapter 8: Weigh It, Pour It",
        outcomes: [
          "Estimate and compare weights and capacities",
          "Add/subtract values in standard units",
        ],
        activities: ["Pouring-puzzle with two jugs"],
      },
      {
        id: "c4-ct-9",
        stream: "CT",
        name: "Chapter 9: Equal Groups",
        outcomes: [
          "Connect repeated addition to multiplication",
          "Form arrays for given products",
        ],
        activities: ["Array-builder dice game"],
      },
      {
        id: "c4-ct-10",
        stream: "CT",
        name: "Chapter 10: Elephants, Tigers, and Leopards",
        outcomes: [
          "Use division to share into equal groups",
          "Interpret remainders in context",
        ],
        activities: ["Wildlife counting & sharing problems"],
      },
      {
        id: "c4-ct-11",
        stream: "CT",
        name: "Chapter 11: Fun with Symmetry",
        outcomes: [
          "Identify lines of symmetry in figures",
          "Complete symmetric drawings",
        ],
        activities: ["Mirror-fold paper symmetry"],
      },
      {
        id: "c4-ct-12",
        stream: "CT",
        name: "Chapter 12: Ticking Clocks and Turning Calendar",
        outcomes: [
          "Read time to the minute",
          "Compute durations across days and months",
        ],
        activities: ["Plan a 3-day school trip on a calendar"],
      },
      {
        id: "c4-ct-13",
        stream: "CT",
        name: "Chapter 13: The Transport Museum",
        outcomes: [
          "Read tables and tally charts",
          "Spot the most/least frequent category",
        ],
        activities: ["Tally vehicles passing the school gate"],
      },
      {
        id: "c4-ct-14",
        stream: "CT",
        name: "Chapter 14: Data Handling",
        outcomes: [
          "Collect, organise and represent data",
          "Read pictographs and bar graphs",
        ],
        activities: ["Class-favourite-fruit pictograph"],
      },
    ],
  },
  {
    classLevel: 5,
    title: "Class 5 — Computational Thinking (Student Handbook)",
    pillars: ["Computational Thinking"],
    description:
      "Extends CT into journeys, fractions, angles, weight & capacity, symmetry, time and picture-based data, building algorithmic and abstraction skills.",
    units: [
      {
        id: "c5-ct-1",
        stream: "CT",
        name: "Chapter 1: We the Travellers — I",
        outcomes: [
          "Plan routes and steps for a journey",
          "Use distances and times in problem solving",
        ],
        activities: ["Plan a town tour with stops and timings"],
      },
      {
        id: "c5-ct-2",
        stream: "CT",
        name: "Chapter 2: Fractions",
        outcomes: [
          "Represent fractions on a number line",
          "Compare and add like fractions",
        ],
        activities: ["Fraction strips & matching cards"],
      },
      {
        id: "c5-ct-3",
        stream: "CT",
        name: "Chapter 3: Angles as Turns",
        outcomes: [
          "Describe turns as quarter, half and full",
          "Identify right, acute and obtuse angles",
        ],
        activities: ["Turn-the-arrow direction game"],
      },
      {
        id: "c5-ct-4",
        stream: "CT",
        name: "Chapter 4: We the Travellers — II",
        outcomes: [
          "Read and use simple maps and grids",
          "Reason about distance and direction",
        ],
        activities: ["Treasure-hunt with grid coordinates"],
      },
      {
        id: "c5-ct-5",
        stream: "CT",
        name: "Chapter 5: Far and Near",
        outcomes: [
          "Estimate distances around the school",
          "Use scaling on simple maps",
        ],
        activities: ["Pace-out distances and graph"],
      },
      {
        id: "c5-ct-6",
        stream: "CT",
        name: "Chapter 6: The Dairy Farm",
        outcomes: [
          "Use multiplication and division in measurement",
          "Reason with rates (litres per cow)",
        ],
        activities: ["Plan daily milk supply for a school"],
      },
      {
        id: "c5-ct-7",
        stream: "CT",
        name: "Chapter 7: Shapes and Patterns",
        outcomes: [
          "Identify polygons and tile patterns",
          "Generate patterns from a rule",
        ],
        activities: ["Tessellation craft with paper polygons"],
      },
      {
        id: "c5-ct-8",
        stream: "CT",
        name: "Chapter 8: Weight and Capacity",
        outcomes: [
          "Convert between g/kg and ml/l",
          "Solve word problems with measures",
        ],
        activities: ["Kitchen recipe scaling"],
      },
      {
        id: "c5-ct-9",
        stream: "CT",
        name: "Chapter 9: Coconut Farm",
        outcomes: [
          "Apply multiplication & division in farm contexts",
          "Estimate and verify totals",
        ],
        activities: ["Yield-per-tree estimation puzzle"],
      },
      {
        id: "c5-ct-10",
        stream: "CT",
        name: "Chapter 10: Symmetrical Designs",
        outcomes: [
          "Use lines and rotational symmetry",
          "Design rangoli using symmetry rules",
        ],
        activities: ["Make a symmetric rangoli on paper"],
      },
      {
        id: "c5-ct-11",
        stream: "CT",
        name: "Chapter 11: Grandmother's Quilt",
        outcomes: [
          "Spot tile patterns and fractions of a whole",
          "Reason about area through tiles",
        ],
        activities: ["Design a 4x4 quilt with two colours"],
      },
      {
        id: "c5-ct-12",
        stream: "CT",
        name: "Chapter 12: Racing Seconds",
        outcomes: [
          "Read time in seconds, minutes and hours",
          "Compute durations and order events",
        ],
        activities: ["Stopwatch relay & timeline"],
      },
      {
        id: "c5-ct-13",
        stream: "CT",
        name: "Chapter 13: Animal Jumps",
        outcomes: [
          "Use number-line jumps for arithmetic",
          "Find missing numbers from sequences",
        ],
        activities: ["Number-line jump puzzles"],
      },
      {
        id: "c5-ct-14",
        stream: "CT",
        name: "Chapter 14: Maps and Locations",
        outcomes: [
          "Use scale, direction and grid references",
          "Locate places on simple maps",
        ],
        activities: ["Mark school landmarks on a grid"],
      },
      {
        id: "c5-ct-15",
        stream: "CT",
        name: "Chapter 15: Data Through Pictures",
        outcomes: [
          "Read pictographs and infer values",
          "Solve problems where each picture stands for many",
        ],
        activities: ["Build a pictograph for class library books"],
        intro:
          "A pictograph uses a small picture to stand for a larger number. To read it, multiply the count of pictures by the value of one picture.",
        examples: [
          {
            id: "ex-1",
            title: "One symbol = many items",
            problem:
              "In a chart, one tree icon stands for 10 trees. A row has 4 full tree icons and 1 half icon. How many trees does the row show?",
            solution:
              "4 full × 10 = 40, plus a half icon = 5. Total = 45 trees.",
          },
          {
            id: "ex-2",
            title: "Comparing two rows",
            problem:
              "Team A has 3 full tree icons; Team B has 5 full tree icons. Each icon = 10 trees. How many more trees does B have?",
            solution: "B has 50, A has 30, so B has 20 more trees.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "If 1 book icon = 5 books, and a row shows 6 icons, how many books does the row represent?",
            options: ["11", "25", "30", "35"],
            answerIndex: 2,
            explanation: "6 × 5 = 30.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Class A has 4 icons, Class B has 7 icons. If 1 icon = 10 students, how many more students does Class B have?",
            options: ["3", "10", "30", "70"],
            answerIndex: 2,
            explanation: "(7 - 4) × 10 = 30.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A pictograph with half-icons can represent values that aren't whole multiples of the icon value.",
            answer: true,
            explanation:
              "Yes — a half-icon is commonly used to mean half the value of one icon.",
          },
        ],
      },
    ],
  },
  {
    classLevel: 6,
    title: "Class 6 — Computational Thinking & Introduction to AI",
    pillars: ["Computational Thinking", "Artificial Intelligence"],
    description:
      "Part 1 deepens CT through math-grounded patterns, geometry, primes, fractions and integers. Part 2 introduces AI in everyday life, basic data concepts, and pattern-recognition for decision making.",
    units: [
      {
        id: "c6-ct-1",
        stream: "CT",
        name: "Chapter 1: Patterns in Mathematics",
        outcomes: [
          "Recognise and describe number patterns",
          "Predict the next term using a rule",
        ],
        activities: ["Build patterns with dot diagrams"],
      },
      {
        id: "c6-ct-2",
        stream: "CT",
        name: "Chapter 2: Lines and Angles",
        outcomes: [
          "Classify angles and pairs of lines",
          "Measure angles using a protractor",
        ],
        activities: ["Angle-hunt around the classroom"],
      },
      {
        id: "c6-ct-3",
        stream: "CT",
        name: "Chapter 3: Number Play",
        outcomes: [
          "Decompose numbers using place value",
          "Reason about properties of numbers",
        ],
        activities: ["Number-tricks investigation"],
      },
      {
        id: "c6-ct-4",
        stream: "CT",
        name: "Chapter 4: Data Handling and Presentation",
        outcomes: [
          "Organise data into tables and charts",
          "Choose an appropriate chart for a question",
        ],
        activities: ["Survey & bar graph project"],
      },
      {
        id: "c6-ct-5",
        stream: "CT",
        name: "Chapter 5: Prime Time",
        outcomes: [
          "Identify factors, multiples and primes",
          "Apply prime factorisation",
        ],
        activities: ["Sieve of Eratosthenes hands-on"],
      },
      {
        id: "c6-ct-6",
        stream: "CT",
        name: "Chapter 6: Perimeter and Area",
        outcomes: [
          "Compute perimeter and area of rectangles & triangles",
          "Compare shapes with the same perimeter",
        ],
        activities: ["Grid-paper shape-design challenge"],
      },
      {
        id: "c6-ct-7",
        stream: "CT",
        name: "Chapter 7: Fractions",
        outcomes: [
          "Add, subtract and compare fractions",
          "Convert between fractions and decimals",
        ],
        activities: ["Fraction-bar matching cards"],
      },
      {
        id: "c6-ct-8",
        stream: "CT",
        name: "Chapter 8: Playing with Constructions",
        outcomes: [
          "Construct basic figures with ruler & compass",
          "Reason about congruence",
        ],
        activities: ["Construct an equilateral triangle"],
      },
      {
        id: "c6-ct-9",
        stream: "CT",
        name: "Chapter 9: Symmetry",
        outcomes: [
          "Identify lines and rotational symmetry",
          "Create symmetric designs",
        ],
        activities: ["Mirror-paint symmetric butterflies"],
      },
      {
        id: "c6-ct-10",
        stream: "CT",
        name: "Chapter 10: The Other Side of Zero",
        outcomes: [
          "Place integers on a number line",
          "Add and subtract positive and negative integers",
        ],
        activities: ["Temperature-change number-line tasks"],
      },
      {
        id: "c6-ai-1",
        stream: "AI",
        name: "Chapter 1: Introduction to AI and Everyday Examples",
        outcomes: [
          "Define intelligence and Artificial Intelligence in your own words",
          "Spot AI in everyday tools (search, voice, recommendations)",
        ],
        activities: ["AI/non-AI sort cards", "Story: a day with smart helpers"],
      },
      {
        id: "c6-ai-2",
        stream: "AI",
        name: "Chapter 2: Basic Data Concepts",
        outcomes: [
          "Define data and information with examples",
          "Classify data as numbers, text, images, audio or video",
        ],
        activities: ["Collect class attendance and present as data"],
        intro:
          "Data is raw, unorganised facts. When we organise and analyse data, it becomes information that helps us decide things.",
        examples: [
          {
            id: "ex-1",
            title: "Data vs Information",
            problem:
              "A list of every student's marks in a test is _____. The class average computed from that list is _____.",
            solution:
              "The list is data; the average is information — it summarises the raw data so we can act on it.",
          },
          {
            id: "ex-2",
            title: "Classify the data",
            problem:
              "Tag each item: (a) a photo of a leaf, (b) the temperature 28°C, (c) a song clip, (d) the word 'apple'.",
            solution:
              "(a) image, (b) numeric, (c) audio, (d) text. Modern AI systems learn from all of these data types.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which of these is the BEST example of 'information' rather than just data?",
            options: [
              "A spreadsheet of every sale at a shop",
              "A long list of temperature readings",
              "'It rained more in July than in June'",
              "A folder full of photos",
            ],
            answerIndex: 2,
            explanation:
              "The first three rows are raw data. The conclusion 'it rained more in July' summarises the data — that's information.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A weather app predicts rain. Which kind of data does it MOST likely use?",
            options: [
              "Only one student's homework",
              "Numbers from satellites and weather stations",
              "Random words from a book",
              "A single photograph",
            ],
            answerIndex: 1,
            explanation:
              "Weather predictions use lots of numeric data from sensors and satellites.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: The number of students in your class is an example of data.",
            answer: true,
            explanation: "Yes — any factual measurement counts as data.",
          },
        ],
      },
      {
        id: "c6-ai-3",
        stream: "AI",
        name: "Chapter 3: Simple Pattern Recognition and Decision Making",
        outcomes: [
          "Spot patterns in shapes, colours and numbers",
          "Use observed patterns to make simple decisions",
        ],
        activities: ["Rule-based decision tree on paper"],
      },
    ],
  },
  {
    classLevel: 7,
    title: "Class 7 — Computational Thinking & AI Domains",
    pillars: ["Computational Thinking", "Artificial Intelligence"],
    description:
      "Part 1 builds CT via large numbers, expressions, decimals, algebra and geometry. Part 2 explores AI domains and applications, AI in industries, data visualisation, and ethics & bias.",
    units: [
      {
        id: "c7-ct-1",
        stream: "CT",
        name: "Chapter 1: Large Numbers Around Us",
        outcomes: [
          "Read and write numbers up to crores",
          "Use Indian and international place value",
        ],
        activities: ["Reading-large-numbers relay"],
      },
      {
        id: "c7-ct-2",
        stream: "CT",
        name: "Chapter 2: Arithmetic Expressions",
        outcomes: [
          "Evaluate expressions using order of operations",
          "Translate word problems into expressions",
        ],
        activities: ["BODMAS station puzzles"],
      },
      {
        id: "c7-ct-3",
        stream: "CT",
        name: "Chapter 3: A Peek Beyond the Point",
        outcomes: [
          "Read, write and order decimals",
          "Add and subtract decimals",
        ],
        activities: ["Bill-and-change decimal tasks"],
      },
      {
        id: "c7-ct-4",
        stream: "CT",
        name: "Chapter 4: Expressions using Letter-Numbers",
        outcomes: [
          "Use variables to represent unknowns",
          "Form and simplify simple algebraic expressions",
        ],
        activities: ["Variable-as-bag concrete tasks"],
      },
      {
        id: "c7-ct-5",
        stream: "CT",
        name: "Chapter 5: Parallel and Intersecting Lines",
        outcomes: [
          "Identify parallel, intersecting & transversal lines",
          "Use angle properties to solve problems",
        ],
        activities: ["Geo-board angle exploration"],
      },
      {
        id: "c7-ct-6",
        stream: "CT",
        name: "Chapter 6: Number Play",
        outcomes: [
          "Investigate divisibility rules",
          "Reason about even/odd and prime properties",
        ],
        activities: ["Divisibility-rule conjecture lab"],
      },
      {
        id: "c7-ct-7",
        stream: "CT",
        name: "Chapter 7: A Tale of Three Intersecting Lines",
        outcomes: [
          "Classify triangles by sides and angles",
          "Apply the angle-sum property of triangles",
        ],
        activities: ["Cut-and-paste angle-sum proof"],
      },
      {
        id: "c7-ct-8",
        stream: "CT",
        name: "Chapter 8: Working with Fractions",
        outcomes: [
          "Multiply and divide fractions",
          "Solve word problems with fractional quantities",
        ],
        activities: ["Recipe-scaling with fractional servings"],
      },
      {
        id: "c7-ai-1",
        stream: "AI",
        name: "Chapter 1: AI Domains and Applications",
        outcomes: [
          "Name key AI domains: Data Science, Computer Vision, NLP",
          "Match real applications to the right AI domain",
        ],
        activities: ["Match-the-app to its AI domain card sort"],
        intro:
          "AI is not one big thing — it is a collection of domains. The three most common are Data Science (working with numbers and tables), Computer Vision (working with images and video), and Natural Language Processing (working with text and speech).",
        examples: [
          {
            id: "ex-1",
            title: "Pick the right domain",
            problem:
              "Which AI domain is at work when your phone unlocks by recognising your face?",
            solution: "Computer Vision — the system understands the image of your face.",
          },
          {
            id: "ex-2",
            title: "When the input is text",
            problem:
              "A chatbot replies to your typed question. Which domain is most involved?",
            solution: "Natural Language Processing — it works with human language.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "A streaming app predicts which song you'll like next from a table of past listens. Which domain is this?",
            options: ["Computer Vision", "Data Science", "NLP", "Robotics"],
            answerIndex: 1,
            explanation:
              "It works with structured numeric data (your listening history) — that's Data Science.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A self-driving car detects pedestrians in camera images. Which domain is this?",
            options: ["NLP", "Data Science", "Computer Vision", "None"],
            answerIndex: 2,
            explanation: "Recognising things in images is Computer Vision.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Every machine that follows fixed instructions is an AI.",
            answer: false,
            explanation:
              "False — fixed-rule machines are automation. AI specifically learns from data.",
          },
        ],
      },
      {
        id: "c7-ai-2",
        stream: "AI",
        name: "Chapter 2: AI in Industries",
        outcomes: [
          "Describe AI use in healthcare, finance, retail and food delivery",
          "Discuss benefits and risks of AI in each industry",
        ],
        activities: ["Industry case-study presentation in pairs"],
      },
      {
        id: "c7-ai-3",
        stream: "AI",
        name: "Chapter 3: Data Visualisation and Analysis",
        outcomes: [
          "Pick a suitable chart for a given question",
          "Read insights from line, bar and pie charts",
        ],
        activities: ["Build charts from a small school dataset"],
      },
      {
        id: "c7-ai-4",
        stream: "AI",
        name: "Chapter 4: Ethics and AI Bias Awareness",
        outcomes: [
          "Explain how biased data leads to biased AI",
          "Suggest steps to make AI use responsible",
        ],
        activities: ["Spot-the-bias scenario discussion"],
      },
    ],
  },
  {
    classLevel: 8,
    title: "Class 8 — Advanced CT & AI Project Lifecycle",
    pillars: ["Computational Thinking", "Artificial Intelligence"],
    description:
      "Part 1 advances CT through powers, the history of numbers, quadrilaterals and proportional reasoning. Part 2 walks through the full AI project lifecycle, real-world applications, fairness and ethical AI.",
    units: [
      {
        id: "c8-ct-1",
        stream: "CT",
        name: "Chapter 1: A Square and a Cube",
        outcomes: [
          "Compute squares, square roots, cubes and cube roots",
          "Reason about perfect squares and cubes",
        ],
        activities: ["Square-tile and cube-stack investigation"],
      },
      {
        id: "c8-ct-2",
        stream: "CT",
        name: "Chapter 2: Power Play",
        outcomes: [
          "Use exponents and laws of exponents",
          "Express large/small numbers in standard form",
        ],
        activities: ["Powers-of-ten timeline of distances"],
      },
      {
        id: "c8-ct-3",
        stream: "CT",
        name: "Chapter 3: A Story of Numbers",
        outcomes: [
          "Trace how number systems evolved historically",
          "Compare positional vs non-positional systems",
        ],
        activities: ["Mini-poster on number systems"],
      },
      {
        id: "c8-ct-4",
        stream: "CT",
        name: "Chapter 4: Quadrilaterals",
        outcomes: [
          "Classify quadrilaterals by properties",
          "Apply angle-sum and side properties",
        ],
        activities: ["Construct & classify with paper folds"],
      },
      {
        id: "c8-ct-5",
        stream: "CT",
        name: "Chapter 5: Number Play",
        outcomes: [
          "Investigate patterns in integers and primes",
          "Form and test conjectures with examples",
        ],
        activities: ["Conjecture-and-test number lab"],
      },
      {
        id: "c8-ct-6",
        stream: "CT",
        name: "Chapter 6: We Distribute Yet Things Multiply",
        outcomes: [
          "Apply the distributive property",
          "Use it to simplify expressions and computations",
        ],
        activities: ["Mental-math distributive shortcuts"],
      },
      {
        id: "c8-ct-7",
        stream: "CT",
        name: "Chapter 7: Proportional Reasoning",
        outcomes: [
          "Use ratios and proportions to compare quantities",
          "Solve direct and inverse proportion problems",
        ],
        activities: ["Recipe & map-scale proportion tasks"],
      },
      {
        id: "c8-ai-1",
        stream: "AI",
        name: "Chapter 1: AI Project Lifecycle",
        outcomes: [
          "List the stages of an AI project (problem → data → model → deploy)",
          "Apply the lifecycle to a small classroom problem",
        ],
        activities: ["Plan an AI project canvas in groups"],
        intro:
          "Every AI project follows a similar journey: define the problem, collect data, prepare the data, train a model, evaluate it, and deploy it. After deployment, you keep monitoring and improving it.",
        examples: [
          {
            id: "ex-1",
            title: "Stage spotter",
            problem:
              "You photograph 200 leaves and label each one as healthy or diseased so the model can learn. Which stage of the lifecycle are you in?",
            solution:
              "Data collection and preparation — you are gathering the labelled examples the model will learn from.",
          },
          {
            id: "ex-2",
            title: "Why we evaluate",
            problem:
              "Your trained model says it is 99% accurate on the training set but only 60% accurate on new pictures. What is happening?",
            solution:
              "The model has memorised the training set rather than learning the pattern. You need more diverse data and to evaluate on a separate test set.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which is the FIRST stage of an AI project lifecycle?",
            options: [
              "Train the model",
              "Define the problem",
              "Deploy to production",
              "Collect data",
            ],
            answerIndex: 1,
            explanation:
              "You need a clear problem statement first — otherwise you don't know what data to collect.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which stage usually takes the MOST time in real AI projects?",
            options: [
              "Defining the problem",
              "Collecting and cleaning data",
              "Training the model",
              "Writing the final report",
            ],
            answerIndex: 1,
            explanation:
              "Data work — collecting, cleaning and labelling — is famously the longest stage in real-world AI projects.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Once a model is deployed, the AI project is finished and no more work is needed.",
            answer: false,
            explanation:
              "False — deployed models drift over time, so monitoring and re-training are part of the lifecycle.",
          },
        ],
      },
      {
        id: "c8-ai-2",
        stream: "AI",
        name: "Chapter 2: Artificial Intelligence and Its Applications",
        outcomes: [
          "Describe how AI analyses data, recognises patterns, learns and predicts",
          "Map AI applications to daily-life examples",
        ],
        activities: ["Daily-life AI inventory worksheet"],
      },
      {
        id: "c8-ai-3",
        stream: "AI",
        name: "Chapter 3: Data and Fairness in AI",
        outcomes: [
          "Identify how data quality affects AI outcomes",
          "Reason about fairness and representativeness",
        ],
        activities: ["Audit a sample dataset for fairness"],
      },
      {
        id: "c8-ai-4",
        stream: "AI",
        name: "Chapter 4: Ethics and Responsible AI",
        outcomes: [
          "Explain key ethical principles for AI use",
          "Apply them to evaluate a real AI tool",
        ],
        activities: ["Class debate: 'Should AI grade homework?'"],
      },
    ],
  },
];

export function getClass(classLevel) {
  return curriculum.find((c) => c.classLevel === Number(classLevel));
}

export function listClasses() {
  return curriculum.map(({ classLevel, title, pillars, description }) => ({
    classLevel,
    title,
    pillars,
    description,
  }));
}
