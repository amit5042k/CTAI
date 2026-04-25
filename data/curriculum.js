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
        intro:
          "Solid shapes look different from different sides. The top view, front view and side view together describe the shape. Faces, edges and corners are also useful ways to compare solids.",
        examples: [
          {
            id: "ex-1",
            title: "Top view of a cube",
            problem: "Lakshmi looks straight down at a wooden cube. What shape does she see?",
            solution:
              "The top of a cube is a flat square, so the top view is a square.",
          },
          {
            id: "ex-2",
            title: "Counting parts of a cube",
            problem: "How many faces, edges and corners does a cube have?",
            solution:
              "A cube has 6 faces, 12 edges and 8 corners.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which of these solids has a circle as its top view?",
            options: ["Cube", "Cylinder", "Pyramid", "Cuboid"],
            answerIndex: 1,
            explanation: "Looking straight down a cylinder, you see its round top — a circle.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "How many corners does a cube have?",
            answer: "8",
            explanation: "A cube has 8 corners (also called vertices).",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A ball has flat faces.",
            answer: false,
            explanation: "A ball is a sphere — it has one curved surface and no flat faces.",
          },
        ],
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
        intro:
          "Every number can be broken into hundreds, tens and ones. Spotting place value helps us read, write and compare numbers, and seeing patterns helps us predict what comes next.",
        examples: [
          {
            id: "ex-1",
            title: "Place value of 137",
            problem: "How many hundreds, tens and ones are in the number 137?",
            solution: "1 hundred, 3 tens and 7 ones. So 137 = 100 + 30 + 7.",
          },
          {
            id: "ex-2",
            title: "Skip counting",
            problem: "What comes next? 95, 100, 105, 110, ?",
            solution:
              "The pattern adds 5 each step. Next number = 110 + 5 = 115.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "How would you write the number 184 using place value?",
            options: [
              "100 + 80 + 4",
              "100 + 8 + 4",
              "10 + 80 + 4",
              "100 + 4 + 80",
            ],
            answerIndex: 0,
            explanation: "1 hundred (100) + 8 tens (80) + 4 ones (4) = 184.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "What number comes after 199?",
            answer: "200",
            explanation: "After 199 comes 200.",
          },
          {
            id: "q3",
            type: "mcq",
            prompt: "Which number is the largest?",
            options: ["119", "191", "129", "109"],
            answerIndex: 1,
            explanation: "Compare hundreds, then tens. 191 has the highest tens digit (9).",
          },
        ],
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
        intro:
          "Many real-life tasks become easier when we break them into a sequence of small steps. Story problems with money or distance can be solved the same way: read, plan, compute, check.",
        examples: [
          {
            id: "ex-1",
            title: "A simple plan",
            problem:
              "List the first three steps to pack a bag for a 2-day trip to your grandmother's house.",
            solution:
              "1) Decide what you need each day. 2) Take out the items. 3) Pack them in your bag. (Other orders are fine — the key idea is breaking the task into steps.)",
          },
          {
            id: "ex-2",
            title: "Story sum",
            problem:
              "Aman had ₹50. He spent ₹18 on a snack and ₹12 on a bus ticket. How much money is left?",
            solution: "Total spent = 18 + 12 = ₹30. Money left = 50 − 30 = ₹20.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "Riya had 25 sweets. She gave 8 to her brother. How many are left?",
            answer: "17",
            explanation: "25 − 8 = 17.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which step usually comes FIRST when planning a journey?",
            options: [
              "Pack the bag",
              "Decide where you are going",
              "Buy snacks",
              "Wave goodbye",
            ],
            answerIndex: 1,
            explanation:
              "You need to know the destination first; everything else follows from that.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Solving a story problem becomes easier if you break it into smaller steps.",
            answer: true,
            explanation:
              "Yes — breaking a problem into steps is a key idea in computational thinking.",
          },
        ],
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
        intro:
          "We can recognise 2D shapes by counting their sides and corners. A triangle has 3, a square 4, a pentagon 5, and so on.",
        examples: [
          {
            id: "ex-1",
            title: "Naming a shape",
            problem: "A flat shape has 5 sides and 5 corners. What is it called?",
            solution: "A 5-sided polygon is called a pentagon.",
          },
          {
            id: "ex-2",
            title: "Continue the pattern",
            problem: "▲ ● ▲ ● ▲ ?  What comes next?",
            solution: "The pattern alternates triangle and circle, so the next shape is ●.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many sides does a hexagon have?",
            answer: "6",
            explanation: "A hexagon has 6 sides.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which shape has exactly 4 equal sides?",
            options: ["Triangle", "Rectangle", "Square", "Circle"],
            answerIndex: 2,
            explanation: "A square has 4 sides of equal length.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A circle has corners.",
            answer: false,
            explanation: "A circle is a smooth curve — it has no corners.",
          },
        ],
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
        intro:
          "Three-digit numbers are made of hundreds, tens and ones. To compare two numbers, look at the hundreds digit first; if they match, look at the tens; then the ones.",
        examples: [
          {
            id: "ex-1",
            title: "Compare 357 and 375",
            problem: "Which number is larger: 357 or 375?",
            solution:
              "Hundreds match (3 = 3). Tens: 5 < 7, so 375 is larger.",
          },
          {
            id: "ex-2",
            title: "Write in words",
            problem: "How do you read 408 in words?",
            solution: "Four hundred eight.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Which number is the smallest?",
            options: ["632", "623", "263", "326"],
            answerIndex: 2,
            explanation: "263 has the smallest hundreds digit (2), so it's smallest.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "What is the value of the digit 5 in 152?",
            answer: "50",
            explanation: "The 5 is in the tens place, so it stands for 5 × 10 = 50.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 999 is the largest three-digit number.",
            answer: true,
            explanation:
              "Yes — 999 is the biggest three-digit number; the next number, 1000, has four digits.",
          },
        ],
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
        intro:
          "Festivals are full of counting and adding. We can add bigger numbers more easily by breaking them into tens and ones, or by adding the easier parts first.",
        examples: [
          {
            id: "ex-1",
            title: "Add the easy way",
            problem: "Find 27 + 38 quickly.",
            solution:
              "Add tens: 20 + 30 = 50. Add ones: 7 + 8 = 15. Total: 50 + 15 = 65.",
          },
          {
            id: "ex-2",
            title: "Plan and add",
            problem:
              "Meera made 24 rakhis on Saturday and 18 on Sunday. How many rakhis in all?",
            solution: "24 + 18 = 42 rakhis.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 35 + 27?",
            answer: "62",
            explanation: "30 + 20 = 50; 5 + 7 = 12; 50 + 12 = 62.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A box has 45 sweets. Mother adds 30 more. How many sweets are in the box?",
            options: ["65", "70", "75", "85"],
            answerIndex: 2,
            explanation: "45 + 30 = 75.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Adding tens first and then ones is one good way to add numbers.",
            answer: true,
            explanation:
              "Yes — splitting into tens and ones is a common addition strategy.",
          },
        ],
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
        intro:
          "Sharing things equally is the same idea as dividing. If something does not share evenly, what is left over is called the remainder.",
        examples: [
          {
            id: "ex-1",
            title: "Equal share",
            problem: "Share 12 chocolates equally between 4 friends. How many does each get?",
            solution: "12 ÷ 4 = 3. Each friend gets 3 chocolates.",
          },
          {
            id: "ex-2",
            title: "Sharing with leftovers",
            problem: "Share 10 toffees equally among 3 friends. How many each, and what is left over?",
            solution:
              "Each friend can get 3 toffees (3 × 3 = 9). 10 − 9 = 1 toffee is left over.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "Share 20 marbles equally among 5 children. How many marbles does each get?",
            answer: "4",
            explanation: "20 ÷ 5 = 4 marbles each.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "If 14 sweets are shared equally among 4 friends, how many are left over?",
            options: ["0", "1", "2", "3"],
            answerIndex: 2,
            explanation: "Each friend gets 3 (4 × 3 = 12). 14 − 12 = 2 left over.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: Equal sharing is another name for dividing.",
            answer: true,
            explanation: "Yes — sharing into equal groups is the everyday meaning of division.",
          },
        ],
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
        intro:
          "When ones or tens add up to 10 or more, we 'carry' to the next column. Estimating first gives a rough answer so you can check whether the exact answer makes sense.",
        examples: [
          {
            id: "ex-1",
            title: "Estimate then add",
            problem: "Estimate 198 + 305 by rounding to the nearest hundred. Then find the exact sum.",
            solution:
              "Rounded: 200 + 300 = 500. Exact: 198 + 305 = 503. The estimate is close.",
          },
          {
            id: "ex-2",
            title: "Subtract with regrouping",
            problem: "Find 405 − 178.",
            solution:
              "Borrow from the tens, then from the hundreds. 405 − 178 = 227.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Find 256 + 187.",
            answer: "443",
            explanation: "256 + 187 = 443.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Estimate 297 + 198 by rounding to the nearest hundred.",
            options: ["400", "500", "600", "700"],
            answerIndex: 1,
            explanation: "300 + 200 = 500.",
          },
          {
            id: "q3",
            type: "short",
            prompt: "Find 600 − 245.",
            answer: "355",
            explanation: "600 − 245 = 355.",
          },
        ],
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
        intro:
          "When we have equal groups, repeated addition can be replaced by multiplication. Tables help us list the items we need and the quantity per group.",
        examples: [
          {
            id: "ex-1",
            title: "Equal groups",
            problem:
              "There are 6 tables in a hall and each table has 4 plates. How many plates in all?",
            solution: "6 × 4 = 24 plates.",
          },
          {
            id: "ex-2",
            title: "Reading a list",
            problem:
              "A teacher needs 5 packets of biscuits and each packet has 8 biscuits. How many biscuits in total?",
            solution: "5 × 8 = 40 biscuits.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "There are 4 boxes and each box has 7 balloons. How many balloons in all?",
            answer: "28",
            explanation: "4 × 7 = 28.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which of these is the same as 3 + 3 + 3 + 3 + 3?",
            options: ["3 × 4", "5 × 3", "3 × 6", "5 + 3"],
            answerIndex: 1,
            explanation: "Adding 3 five times = 5 × 3 = 15.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Multiplication is just a shorter way to write repeated addition of the same number.",
            answer: true,
            explanation: "Yes — that is the basic idea of multiplication.",
          },
        ],
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
        intro:
          "Capacity tells us how much liquid a container can hold. Weight tells us how heavy something is. We use a balance to compare the weights of two things.",
        examples: [
          {
            id: "ex-1",
            title: "Comparing capacities",
            problem:
              "A bottle holds 1 litre of water. A glass holds 200 millilitres. How many glasses fill the bottle?",
            solution: "1 litre = 1000 ml. 1000 ÷ 200 = 5 glasses.",
          },
          {
            id: "ex-2",
            title: "Balance scale",
            problem:
              "A balance has 3 oranges on one side and 1 mango on the other. The mango side goes down. Which is heavier?",
            solution: "The mango is heavier than 3 oranges put together.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Which unit is best for measuring a glass of milk?",
            options: ["Kilometres", "Millilitres", "Kilograms", "Hours"],
            answerIndex: 1,
            explanation: "A glass of milk is a small amount of liquid — millilitres fit best.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "How many millilitres are there in 1 litre?",
            answer: "1000",
            explanation: "1 litre = 1000 ml.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A balance scale shows which of two objects is heavier.",
            answer: true,
            explanation: "Yes — the heavier side goes down.",
          },
        ],
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
        intro:
          "When we buy or sell things, we use addition for the total cost and subtraction for the change. Reading a problem carefully helps us pick the right operation.",
        examples: [
          {
            id: "ex-1",
            title: "Total cost",
            problem:
              "A pencil costs ₹8 and an eraser costs ₹5. What do they cost together?",
            solution: "8 + 5 = ₹13.",
          },
          {
            id: "ex-2",
            title: "Change",
            problem:
              "Karan paid ₹50 for a notebook that costs ₹35. How much change does he get back?",
            solution: "50 − 35 = ₹15 change.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "A toy costs ₹95. Tara pays ₹100. How much change should she get?",
            answer: "5",
            explanation: "100 − 95 = ₹5.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "An apple costs ₹12 and a banana costs ₹7. How much do 1 apple and 1 banana cost together?",
            options: ["₹15", "₹17", "₹19", "₹21"],
            answerIndex: 2,
            explanation: "12 + 7 = ₹19.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: To find the change you got back, you subtract the cost from what you paid.",
            answer: true,
            explanation: "Yes — change = amount paid − cost.",
          },
        ],
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
        intro:
          "Clocks help us read the time. There are 60 minutes in an hour, 24 hours in a day, 7 days in a week. Putting events in the right order is part of computational thinking too.",
        examples: [
          {
            id: "ex-1",
            title: "Reading a clock",
            problem:
              "The hour hand is on 3 and the minute hand is on 12. What time is it?",
            solution: "3 o'clock (or 3:00).",
          },
          {
            id: "ex-2",
            title: "Order the events",
            problem:
              "Put these in the right order: 'eat lunch', 'wake up', 'go to school', 'go to bed'.",
            solution:
              "Wake up → go to school → eat lunch → go to bed.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many minutes are there in 1 hour?",
            answer: "60",
            explanation: "There are 60 minutes in an hour.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which day comes right after Wednesday?",
            options: ["Tuesday", "Thursday", "Friday", "Sunday"],
            answerIndex: 1,
            explanation: "After Wednesday comes Thursday.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: There are 7 days in a week.",
            answer: true,
            explanation: "Yes — Sunday to Saturday makes 7 days.",
          },
        ],
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
        intro:
          "Pictographs and bar charts use pictures or bars to show how much of something there is. Tall bars mean bigger numbers; short bars mean smaller numbers.",
        examples: [
          {
            id: "ex-1",
            title: "Reading a pictograph",
            problem:
              "Each ★ stands for 5 visitors. A row has 4 stars. How many visitors does it show?",
            solution: "4 × 5 = 20 visitors.",
          },
          {
            id: "ex-2",
            title: "Tallest bar",
            problem:
              "A bar chart shows: Toys 12, Sweets 18, Books 9, Clothes 15. Which item was bought the most?",
            solution: "Sweets, with 18.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Each picture in a chart stands for 10 fair visitors. A row has 7 pictures. How many visitors?",
            options: ["17", "70", "100", "700"],
            answerIndex: 1,
            explanation: "7 × 10 = 70 visitors.",
          },
          {
            id: "q2",
            type: "short",
            prompt:
              "In a chart, Day 1 has 25 visitors and Day 2 has 40. How many more visitors on Day 2?",
            answer: "15",
            explanation: "40 − 25 = 15.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A taller bar in a bar chart usually means a larger number.",
            answer: true,
            explanation: "Yes — bar height is proportional to the value.",
          },
        ],
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
        intro:
          "Shapes are everywhere — wheels are circles, books are rectangles, dice are cubes. We can describe shapes by counting their sides, corners, or — for 3D shapes — their faces, edges and vertices.",
        examples: [
          {
            id: "ex-1",
            title: "Naming a 3D shape",
            problem:
              "A solid has 6 rectangular faces, 12 edges and 8 corners. What is it?",
            solution: "A cuboid (like a brick or a matchbox).",
          },
          {
            id: "ex-2",
            title: "2D shapes around us",
            problem: "Name the 2D shape that the face of a clock most often is.",
            solution: "A circle.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Which of these is a 3D shape?",
            options: ["Triangle", "Sphere", "Square", "Pentagon"],
            answerIndex: 1,
            explanation: "A sphere is a solid (3D) shape. The others are flat (2D).",
          },
          {
            id: "q2",
            type: "short",
            prompt: "How many faces does a cuboid have?",
            answer: "6",
            explanation: "A cuboid has 6 rectangular faces.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A football is a 2D shape.",
            answer: false,
            explanation: "A football is a sphere, which is 3D.",
          },
        ],
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
        intro:
          "When we have many possibilities, each clue lets us cross some out. The answer is whatever is left after all the clues are used. This careful reasoning is called logical elimination.",
        examples: [
          {
            id: "ex-1",
            title: "Find the number",
            problem:
              "I am thinking of a number from 1 to 10. It is even. It is greater than 6. It is not 10. What is it?",
            solution:
              "From 1-10, even numbers are 2, 4, 6, 8, 10. 'Greater than 6' leaves 8 and 10. 'Not 10' leaves 8.",
          },
          {
            id: "ex-2",
            title: "Cross them out",
            problem:
              "Three friends are 9, 10 and 11 years old. Aru is not 11. Riya is older than Aru. Who is 10?",
            solution:
              "Aru is 9 or 10. Riya is older than Aru. If Aru is 10, Riya is 11. The third friend is 9. So Aru is 10? Yes — Aru is 10, Riya is 11, the third is 9.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "I am a number between 1 and 20. I am odd and I am a multiple of 5. Which number am I?",
            options: ["5", "10", "15", "20"],
            answerIndex: 2,
            explanation:
              "Multiples of 5 between 1 and 20: 5, 10, 15, 20. Odd ones: 5 and 15. The question allows either, but 15 is also between 1 and 20 — both 5 and 15 fit. Pick the larger one if asked between 10 and 20: 15.",
          },
          {
            id: "q2",
            type: "short",
            prompt:
              "I am a 2-digit number. My tens digit is 4 and my ones digit is 7. What number am I?",
            answer: "47",
            explanation: "Tens 4 + ones 7 → 47.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Each clue should usually let you cross out at least one possibility.",
            answer: true,
            explanation:
              "Yes — that is what makes a clue useful. Clues that don't reduce the possibilities don't help.",
          },
        ],
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
        intro:
          "Four-digit numbers are made of thousands, hundreds, tens and ones. To compare them, look at the leftmost digit first.",
        examples: [
          {
            id: "ex-1",
            title: "Read 4308",
            problem: "Write the number 4308 in words.",
            solution: "Four thousand three hundred eight.",
          },
          {
            id: "ex-2",
            title: "Compare 2945 and 2954",
            problem: "Which is bigger?",
            solution:
              "Thousands match (2 = 2). Hundreds match (9 = 9). Tens: 4 vs 5, so 2954 is bigger.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is the largest four-digit number?",
            answer: "9999",
            explanation: "9999 is the biggest four-digit number.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which of these is the smallest?",
            options: ["2310", "2103", "2301", "2031"],
            answerIndex: 3,
            explanation: "Compare digit by digit; 2031 has the smallest hundreds digit (0).",
          },
          {
            id: "q3",
            type: "short",
            prompt: "What is the value of the digit 7 in 5703?",
            answer: "700",
            explanation: "7 is in the hundreds place: 7 × 100 = 700.",
          },
        ],
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
        intro:
          "When a whole is split into equal parts, each part is a fraction. Half (1/2), quarter (1/4) and one-third (1/3) describe how big each share is.",
        examples: [
          {
            id: "ex-1",
            title: "Half of a pizza",
            problem: "A pizza is cut into 2 equal pieces. What is each piece called?",
            solution: "Each piece is one-half (1/2) of the pizza.",
          },
          {
            id: "ex-2",
            title: "Sharing into quarters",
            problem: "A cake is cut into 4 equal pieces. What is each piece called?",
            solution: "Each piece is one-quarter (1/4) of the cake.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "If you cut a chapati into 4 equal parts, each part is called:",
            options: ["A half", "A whole", "A quarter", "A double"],
            answerIndex: 2,
            explanation: "One out of four equal parts is one-quarter (1/4).",
          },
          {
            id: "q2",
            type: "short",
            prompt: "How many halves make a whole?",
            answer: "2",
            explanation: "Two halves make a whole.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 1/2 is bigger than 1/4.",
            answer: true,
            explanation: "Yes — half a pizza is more than a quarter of a pizza.",
          },
        ],
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
        intro:
          "We measure length using a ruler or a tape. The most common units are centimetres (cm) and metres (m). 100 cm = 1 m.",
        examples: [
          {
            id: "ex-1",
            title: "Convert 250 cm to metres",
            problem: "How many metres is 250 cm?",
            solution: "100 cm = 1 m. 250 ÷ 100 = 2 m 50 cm, or 2.5 m.",
          },
          {
            id: "ex-2",
            title: "Estimate the length",
            problem: "Which is the best estimate for the length of a school bench: 5 cm, 1 m or 50 m?",
            solution: "1 m is closest. 5 cm is too short; 50 m is far too long.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many centimetres are there in 1 metre?",
            answer: "100",
            explanation: "1 metre = 100 cm.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which unit is best for measuring the length of a pencil?",
            options: ["Kilometres", "Metres", "Centimetres", "Litres"],
            answerIndex: 2,
            explanation: "A pencil is small — centimetres are the right unit.",
          },
          {
            id: "q3",
            type: "short",
            prompt: "How many metres is 400 cm?",
            answer: "4",
            explanation: "400 ÷ 100 = 4 m.",
          },
        ],
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
        intro:
          "Bar graphs let us compare values quickly. The taller the bar, the larger the value. We can also subtract heights to find a difference.",
        examples: [
          {
            id: "ex-1",
            title: "Reading a bar graph",
            problem:
              "Village A scored 60, B scored 75, C scored 50. Which village is cleanest?",
            solution: "Village B with 75.",
          },
          {
            id: "ex-2",
            title: "Difference between bars",
            problem: "Village A scored 60 and Village C scored 50. How much higher is A?",
            solution: "60 − 50 = 10.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "In a bar graph, which village had the LEAST score: A=70, B=85, C=60, D=90?",
            options: ["A", "B", "C", "D"],
            answerIndex: 2,
            explanation: "60 is the smallest, so village C.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "If two villages scored 80 and 95, what is the difference?",
            answer: "15",
            explanation: "95 − 80 = 15.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A bar graph helps us see which group has the most.",
            answer: true,
            explanation: "Yes — the tallest bar marks the largest value.",
          },
        ],
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
        intro:
          "Weight is measured in grams (g) and kilograms (kg). Capacity is measured in millilitres (ml) and litres (l). 1 kg = 1000 g and 1 l = 1000 ml.",
        examples: [
          {
            id: "ex-1",
            title: "Add weights",
            problem: "A bag of rice is 2 kg and a bag of dal is 500 g. What is the total weight?",
            solution: "2 kg = 2000 g. Total = 2000 + 500 = 2500 g, or 2 kg 500 g.",
          },
          {
            id: "ex-2",
            title: "Subtract capacities",
            problem: "A jug has 1 litre of water. 350 ml is poured out. How much is left?",
            solution: "1 l = 1000 ml. 1000 − 350 = 650 ml.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many grams are there in 1 kilogram?",
            answer: "1000",
            explanation: "1 kg = 1000 g.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A bottle holds 750 ml. How much more is needed to make 1 litre?",
            options: ["150 ml", "250 ml", "350 ml", "500 ml"],
            answerIndex: 1,
            explanation: "1000 − 750 = 250 ml.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A litre is bigger than a millilitre.",
            answer: true,
            explanation: "Yes, 1 litre = 1000 ml, so 1 litre is much bigger.",
          },
        ],
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
        intro:
          "When we have many equal groups, multiplication is a quick way to count. An array is a rectangle of dots arranged in equal rows.",
        examples: [
          {
            id: "ex-1",
            title: "Array of dots",
            problem: "An array has 4 rows and 6 dots in each row. How many dots in total?",
            solution: "4 × 6 = 24 dots.",
          },
          {
            id: "ex-2",
            title: "From repeated addition",
            problem: "Write 7 + 7 + 7 as a multiplication.",
            solution: "Three 7s, so 3 × 7 = 21.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 5 × 8?",
            answer: "40",
            explanation: "5 × 8 = 40.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "An array has 9 rows and 3 dots in each row. How many dots in total?",
            options: ["12", "27", "30", "33"],
            answerIndex: 1,
            explanation: "9 × 3 = 27.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: 4 × 6 and 6 × 4 give the same answer.",
            answer: true,
            explanation:
              "Yes — multiplication is commutative; the order doesn't change the product.",
          },
        ],
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
        intro:
          "Division splits a total into equal groups. Sometimes the total does not divide evenly — what is left over is the remainder.",
        examples: [
          {
            id: "ex-1",
            title: "Even share",
            problem:
              "A zoo has 24 animals divided equally into 4 cages. How many animals per cage?",
            solution: "24 ÷ 4 = 6 animals per cage.",
          },
          {
            id: "ex-2",
            title: "Remainder",
            problem:
              "There are 23 mangoes to share equally among 5 children. How many each, and how many leftover?",
            solution: "23 ÷ 5 = 4 with remainder 3. Each child gets 4 mangoes; 3 are leftover.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Share 36 leaves equally into 6 piles. How many leaves per pile?",
            answer: "6",
            explanation: "36 ÷ 6 = 6.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "What is the remainder when 25 is divided by 4?",
            options: ["1", "2", "3", "4"],
            answerIndex: 0,
            explanation: "4 × 6 = 24; 25 − 24 = 1.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: If a number divides evenly, the remainder is 0.",
            answer: true,
            explanation: "Yes — no leftover means remainder 0.",
          },
        ],
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
        intro:
          "A figure is symmetric if you can fold it along a line so the two halves match exactly. That fold-line is called a line of symmetry.",
        examples: [
          {
            id: "ex-1",
            title: "Lines in a square",
            problem: "How many lines of symmetry does a square have?",
            solution:
              "A square has 4 lines of symmetry: 2 through opposite sides and 2 through the diagonals.",
          },
          {
            id: "ex-2",
            title: "Symmetric letter",
            problem: "Is the letter A symmetric?",
            solution: "Yes — A has one vertical line of symmetry through its top.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many lines of symmetry does an equilateral triangle have?",
            answer: "3",
            explanation: "An equilateral triangle has 3 lines of symmetry.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which of these letters has a line of symmetry?",
            options: ["F", "G", "H", "J"],
            answerIndex: 2,
            explanation: "H is symmetric — both vertically and horizontally.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A circle has only one line of symmetry.",
            answer: false,
            explanation:
              "False — a circle has infinitely many lines of symmetry through its centre.",
          },
        ],
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
        intro:
          "Clocks measure time in hours and minutes; calendars measure days, weeks and months. Knowing how to add and subtract time helps us plan.",
        examples: [
          {
            id: "ex-1",
            title: "Find the duration",
            problem: "School starts at 8:30 and ends at 2:00. How long is school?",
            solution:
              "From 8:30 to 12:30 is 4 hours; from 12:30 to 2:00 is 1 hour 30 minutes. Total: 5 hours 30 minutes.",
          },
          {
            id: "ex-2",
            title: "Days between dates",
            problem: "How many days are there from 5 March to 12 March?",
            solution: "12 − 5 = 7 days.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many minutes are there in 2 hours?",
            answer: "120",
            explanation: "2 × 60 = 120 minutes.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which month has 28 or 29 days?",
            options: ["January", "April", "February", "December"],
            answerIndex: 2,
            explanation: "February has 28 days, or 29 in a leap year.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A year has 12 months.",
            answer: true,
            explanation: "Yes — January through December is 12 months.",
          },
        ],
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
        intro:
          "Tally marks (||||) help us count quickly. A table summarises the totals for each category, so we can see what was most or least common.",
        examples: [
          {
            id: "ex-1",
            title: "Reading tally marks",
            problem:
              "A row of tally marks looks like four vertical bars with one diagonal across them. What number is it?",
            solution: "That standard tally pattern stands for 5.",
          },
          {
            id: "ex-2",
            title: "Find the most common",
            problem:
              "Cars 12, Buses 5, Bikes 18, Trucks 7. Which vehicle was seen the most?",
            solution: "Bikes, with 18.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Cars 8, Bikes 14, Buses 3. How many vehicles in total?",
            options: ["22", "24", "25", "27"],
            answerIndex: 2,
            explanation: "8 + 14 + 3 = 25.",
          },
          {
            id: "q2",
            type: "short",
            prompt:
              "If 3 groups of 5 tally marks were drawn, what total do they show?",
            answer: "15",
            explanation: "3 × 5 = 15.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: Tally marks make counting fast for big totals.",
            answer: true,
            explanation: "Yes — grouping in fives makes counting easier.",
          },
        ],
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
        intro:
          "We can collect data by asking questions, then organise it in a table or chart. Pictographs use pictures; bar graphs use bars. Both let us compare quickly.",
        examples: [
          {
            id: "ex-1",
            title: "Bar graph",
            problem:
              "Apples 6, Bananas 9, Mangoes 12. Which fruit was chosen the least?",
            solution: "Apples, with only 6.",
          },
          {
            id: "ex-2",
            title: "Pictograph value",
            problem: "Each ★ stands for 4 children. A row has 5 stars. How many children?",
            solution: "5 × 4 = 20 children.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "If each picture stands for 5 books, how many books does a row of 8 pictures show?",
            answer: "40",
            explanation: "8 × 5 = 40.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "From a graph: Class 4A has 25 students, Class 4B has 32. How many more in 4B?",
            options: ["5", "7", "9", "10"],
            answerIndex: 1,
            explanation: "32 − 25 = 7.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A pictograph and a bar graph can show the same information in different ways.",
            answer: true,
            explanation: "Yes — both are visual ways to compare counts.",
          },
        ],
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
