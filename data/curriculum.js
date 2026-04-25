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
        teacherNotes: {
          overview:
            "Use this chapter to introduce the idea that information sometimes needs to be hidden, and that hiding follows a rule (a key). The Caesar cipher gives a concrete, hands-on rule that students can apply, undo and even break by trying all shifts.",
          lessonPlan: [
            {
              stage: "Hook",
              minutes: 5,
              detail:
                "Write a short ciphered word on the board (e.g. CBU for shift 1) and invite students to guess what the word should be. Connect to ATM PINs and online passwords.",
            },
            {
              stage: "Demo & Make",
              minutes: 15,
              detail:
                "Show how a Caesar wheel works for shift 1, 2 and 3. Students cut and paste two paper strips to build a personal cipher wheel; they encode their first name with a chosen shift.",
            },
            {
              stage: "Pair practice",
              minutes: 15,
              detail:
                "In pairs students swap encoded words and a shift hint. Each child decodes their partner's message. Discuss what happens when the shift is wrong.",
            },
            {
              stage: "Discuss & connect",
              minutes: 5,
              detail:
                "Ask: how many shifts are possible (25)? Why is that not very secure? Bridge to the idea that real online encryption uses much larger keys.",
            },
          ],
          ctSkills: [
            "Algorithmic thinking — applying a step-by-step rule",
            "Pattern recognition — letters always move by the same amount",
            "Generalisation — the rule works for any message",
            "Evaluation — judging when the cipher is strong enough",
          ],
          misconceptions: [
            "Some students confuse shifting forward with shifting backward when decoding.",
            "Students may forget to wrap around at Z back to A.",
          ],
          assessmentIdeas: [
            "Exit ticket: encode the word HELP with shift 2.",
            "Quick poll: with only 25 shifts to try, can a friend always guess your message? Why?",
          ],
          differentiation: [
            "Support: provide a printed alphabet strip and let learners physically slide a marker.",
            "Stretch: ask learners to invent their own non-shift cipher and explain the rule.",
          ],
        },
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
        teacherNotes: {
          overview:
            "Anchor 3D solids in things students already touch — pencil boxes, dice, cans. The aim is to move from naming shapes to describing them by faces, edges and corners.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Hold up a tin and a brick. Ask what is alike and different. Collect words on the board." },
            { stage: "Investigate", minutes: 15, detail: "Pairs hunt for cubes, cuboids, cylinders, spheres in the classroom and tally findings." },
            { stage: "Top view game", minutes: 15, detail: "Place real solids in a row and have one student describe only the top view; the partner names the solid." },
            { stage: "Connect", minutes: 5, detail: "Draw a table on the board: faces, edges, corners — fill in for cube, cuboid, cylinder, sphere." },
          ],
          ctSkills: ["Pattern recognition", "Abstraction (top view ignores depth)", "Generalisation across solids"],
          misconceptions: ["Calling any 3D shape a 'cube'.", "Confusing faces with edges."],
          assessmentIdeas: ["Show 3 objects; students sort into 'rolls' / 'slides only' piles.", "Quick draw: top view of a cuboid."],
          differentiation: ["Support: provide pre-printed shape templates to compare.", "Stretch: ask how many top views a cylinder can have."],
        },
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
        teacherNotes: {
          overview:
            "Strengthen the place-value mental model. Students should be fluent moving between a number, its expanded form, and its name in words.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Show '137' on flashcards and ask: how many hundred-rupee notes, ten-rupee notes, one-rupee coins?" },
            { stage: "Build", minutes: 15, detail: "Use bundles of 10 sticks plus loose sticks to physically build numbers up to 200." },
            { stage: "Skip-count", minutes: 15, detail: "Pairs build a counting strip from 95 to 200 in steps of 5; circle the patterns they spot." },
            { stage: "Connect", minutes: 5, detail: "Quick reflection: which digits change when adding 10? When adding 100?" },
          ],
          ctSkills: ["Pattern recognition (counting in steps)", "Abstraction (one bundle = ten)", "Decomposition into hundreds, tens, ones"],
          misconceptions: ["Reading '107' as 'seventeen' (zero ignored).", "Believing larger digit means larger value, regardless of place."],
          assessmentIdeas: ["Exit slip: write 184 in expanded form.", "True/false: 199 + 1 has no hundreds."],
          differentiation: ["Support: place-value mat with labelled columns.", "Stretch: ask which 3-digit numbers read the same backwards (palindromes)."],
        },
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
        teacherNotes: {
          overview:
            "Connect everyday journeys to two CT habits: sequencing (do things in order) and decomposition (break a big task into small ones). Story sums then practise reading a problem and choosing the right operation.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Ask: 'How would you pack for a 2-day trip?' Capture steps in any order, then re-order them as a class." },
            { stage: "Plan", minutes: 10, detail: "Pairs draft a 5-step plan for travelling from home to a relative's house." },
            { stage: "Story sums", minutes: 15, detail: "Three short money problems on the board; students annotate which operation is needed and why." },
            { stage: "Reflect", minutes: 5, detail: "What changes if you add a stop on the way? Discuss how the plan adapts." },
          ],
          ctSkills: ["Sequencing", "Decomposition", "Algorithmic thinking"],
          misconceptions: ["Doing a step out of order and not noticing the impact.", "Adding when 'altogether' actually requires totalling and then subtracting change."],
          assessmentIdeas: ["Number the steps for making a sandwich in order.", "Two-step word problem: total cost then change."],
          differentiation: ["Support: provide step-cards already written, just arrange them.", "Stretch: write a 6-step plan with a missing step for a friend to find."],
        },
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
        teacherNotes: {
          overview:
            "Move beyond shape names to descriptions: how many sides, how many corners, are sides equal? Patterns of shapes practise prediction.",
          lessonPlan: [
            { stage: "Sort", minutes: 8, detail: "Hand each pair a bag of paper shapes. They sort by number of sides without telling each other the rule." },
            { stage: "Tangram", minutes: 17, detail: "Students assemble a simple tangram cat; review sides and corners as they fit pieces." },
            { stage: "Patterns", minutes: 10, detail: "Show shape sequences on the board (▲ ● ▲ ● ?) and ask for the rule, not just the next shape." },
            { stage: "Reflect", minutes: 5, detail: "Which shape was the trickiest to describe? Why?" },
          ],
          ctSkills: ["Classification", "Pattern recognition", "Generalisation"],
          misconceptions: ["Counting a corner twice when shapes share a vertex.", "Believing a tilted square is a 'diamond', not a square."],
          assessmentIdeas: ["Quick draw: any shape with exactly 5 corners.", "Continue the pattern ★ ◆ ★ ◆ ★ ?"],
          differentiation: ["Support: pre-grouped shape sets (triangles only, quads only).", "Stretch: invent a 3-symbol pattern that repeats every 4 steps."],
        },
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
        teacherNotes: {
          overview:
            "Use base-ten material (flats, longs, units) so children can see place value as 'how big each pile is' before they manipulate digits abstractly.",
          lessonPlan: [
            { stage: "Build", minutes: 10, detail: "Each pair is given a number card; they build it with flats/longs/units and read it aloud." },
            { stage: "Compare", minutes: 10, detail: "Pairs swap built numbers and decide which is bigger by comparing piles, not digits." },
            { stage: "Order", minutes: 15, detail: "Whole class lines up holding number cards in ascending order; resolve disagreements at hundreds first, then tens, then ones." },
            { stage: "Connect", minutes: 5, detail: "Ask: when comparing 320 vs 287 do we ever need to look at ones? Why not?" },
          ],
          ctSkills: ["Decomposition", "Abstraction", "Algorithmic thinking (compare digit by digit)"],
          misconceptions: ["Comparing only the rightmost digits.", "Thinking 100 has 'two zeros' so it's equal to '20'."],
          assessmentIdeas: ["Order four numbers smallest to largest.", "True/False: 999 is the largest 3-digit number."],
          differentiation: ["Support: physical place-value cards (200 + 50 + 7).", "Stretch: how many 3-digit numbers have all different digits?"],
        },
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
        teacherNotes: {
          overview:
            "Use the festival as a friendly context to compare different mental-addition strategies — split into tens & ones, friendly numbers, doubles.",
          lessonPlan: [
            { stage: "Story", minutes: 5, detail: "Read a short scenario about preparing rakhis; pull out the numbers." },
            { stage: "Strategy share", minutes: 12, detail: "Pose 27 + 38 and let three students show three different strategies on the board." },
            { stage: "Plan", minutes: 15, detail: "Pairs plan items + quantities for a class celebration; total each row." },
            { stage: "Reflect", minutes: 8, detail: "Vote on the strategy that felt easiest; ask why that may not be best for every problem." },
          ],
          ctSkills: ["Decomposition", "Pattern recognition (fact families)", "Generalisation"],
          misconceptions: ["Forgetting to carry when ones exceed 9.", "Lining up digits incorrectly when numbers have different lengths."],
          assessmentIdeas: ["Solve 45 + 30 mentally and explain the trick.", "Two-step sum: 24 + 18 + 7."],
          differentiation: ["Support: 100-square to count on.", "Stretch: write three sums all equal to 50."],
        },
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
        teacherNotes: {
          overview:
            "Build the meaning of division as equal sharing. Surface remainders naturally — most real shares don't divide evenly.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Place 12 counters and 4 children. How many each? Now try 13 counters." },
            { stage: "Share", minutes: 15, detail: "Pairs use counters to share quantities the teacher calls out: 18 ÷ 3, 20 ÷ 4, 17 ÷ 5." },
            { stage: "Record", minutes: 12, detail: "Students draw a quick picture for each share, writing 'each gets ___, left over ___'." },
            { stage: "Connect", minutes: 8, detail: "Discuss: when remainders matter (sharing money) vs when they don't (forming teams)." },
          ],
          ctSkills: ["Decomposition", "Abstraction (sharing → division)", "Generalisation"],
          misconceptions: ["Believing every division has remainder 0.", "Sharing 'one for me, one for you' but losing track for larger sets."],
          assessmentIdeas: ["Share 14 toffees among 4 children — each? leftover?", "True/False: equal sharing is another name for division."],
          differentiation: ["Support: provide physical counters.", "Stretch: pose a 2-step share — share 30 sweets among 5, then double the share."],
        },
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
        teacherNotes: {
          overview:
            "Make the carrying rule explicit before drilling vertical addition. Estimating first builds number sense and gives a quick check.",
          lessonPlan: [
            { stage: "Estimate", minutes: 8, detail: "On the board: 198 + 305. Students round to the nearest hundred and predict the answer." },
            { stage: "Compute", minutes: 12, detail: "Whole class works the exact sum on whiteboards; teacher highlights when carrying is needed." },
            { stage: "Subtract with regrouping", minutes: 12, detail: "Show 405 − 178; introduce 'borrowing' from the tens, then from the hundreds." },
            { stage: "Check", minutes: 8, detail: "Pairs check each other's answers using estimation as a sanity test." },
          ],
          ctSkills: ["Algorithmic thinking", "Evaluation (estimation as a check)", "Decomposition"],
          misconceptions: ["Forgetting to bring down a carry.", "Subtracting the smaller-from-larger digit even when borrowing is needed."],
          assessmentIdeas: ["Quick row of 5 vertical sums with mixed regrouping.", "Pose: estimate 297 + 198."],
          differentiation: ["Support: place-value mat to keep columns aligned.", "Stretch: write a 3-digit sum that requires carrying twice."],
        },
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
        teacherNotes: {
          overview:
            "Anchor multiplication as 'equal groups'. Tables and arrays make the structure visible before students rely on memorised facts.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Stack chairs in 4 rows of 5. Ask for the count without counting one by one." },
            { stage: "Build arrays", minutes: 12, detail: "Pairs build arrays with counters for 3×6, 4×5, 6×4 and notice 4×5 = 5×4." },
            { stage: "Plan", minutes: 15, detail: "Students plan items for a party using a small table (item × quantity per group × groups)." },
            { stage: "Reflect", minutes: 8, detail: "Why is multiplication faster than adding? When isn't it useful?" },
          ],
          ctSkills: ["Pattern recognition", "Abstraction", "Generalisation"],
          misconceptions: ["Adding instead of multiplying when groups look small.", "Believing 4×3 ≠ 3×4."],
          assessmentIdeas: ["6 boxes × 7 balloons each — total?", "Write 5+5+5+5 as a multiplication."],
          differentiation: ["Support: dot arrays printed on grid paper.", "Stretch: find a number that can be made with two different arrays."],
        },
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
        teacherNotes: {
          overview:
            "Make capacity and weight tangible. The big idea: estimate first, then measure, then check.",
          lessonPlan: [
            { stage: "Estimate", minutes: 8, detail: "Show three containers; pairs predict which holds the most." },
            { stage: "Measure", minutes: 15, detail: "Pour using a marked cup; record actual capacities; rank in order." },
            { stage: "Balance", minutes: 12, detail: "Use a simple balance to decide which of two objects is heavier; bring in a third object and place all three in order." },
            { stage: "Connect", minutes: 5, detail: "When did your estimate match? When was it surprising?" },
          ],
          ctSkills: ["Estimation", "Comparison", "Algorithmic thinking (sort by repeated comparison)"],
          misconceptions: ["Confusing tall containers with high capacity.", "Believing big objects must be heavy."],
          assessmentIdeas: ["Order three containers by capacity from least to most.", "True/False: 1 litre = 1000 ml."],
          differentiation: ["Support: pre-marked cups with 100 ml steps.", "Stretch: find two containers that look different but hold the same."],
        },
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
        teacherNotes: {
          overview:
            "Money links naturally to addition (cost) and subtraction (change). Role-play makes the operations meaningful.",
          lessonPlan: [
            { stage: "Set up", minutes: 5, detail: "Tag classroom items with prices in rupees." },
            { stage: "Shop", minutes: 18, detail: "Pairs alternate as shopkeeper and buyer; transactions must include both total and change." },
            { stage: "Ledger", minutes: 12, detail: "Each pair records four transactions; teacher checks for total = price + change pattern." },
            { stage: "Reflect", minutes: 5, detail: "Why does the shopkeeper's mental subtraction matter?" },
          ],
          ctSkills: ["Decomposition", "Algorithmic thinking", "Evaluation"],
          misconceptions: ["Adding the change instead of subtracting it.", "Confusing 'change' with 'total cost'."],
          assessmentIdeas: ["A toy is ₹95; you pay ₹100. Change?", "List three items from the room and compute total."],
          differentiation: ["Support: provide play-money to manipulate.", "Stretch: introduce two-item bills and a discount of ₹5."],
        },
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
        teacherNotes: {
          overview:
            "Time is harder than it looks because it mixes two number systems (60 and 12) and two displays. Practise reading and ordering across both.",
          lessonPlan: [
            { stage: "Demo", minutes: 7, detail: "Show a real analog clock; ask which hand moves faster." },
            { stage: "Read", minutes: 13, detail: "Pairs match analog clock pictures to digital times on cards." },
            { stage: "Sequence", minutes: 15, detail: "Build a timeline of a school day from arrival to dismissal, labelling start time of each block." },
            { stage: "Connect", minutes: 5, detail: "Ask: how much time was spent on lunch?" },
          ],
          ctSkills: ["Sequencing", "Pattern recognition (clock face)", "Decomposition (hours vs minutes)"],
          misconceptions: ["Reading the minute hand as 'minutes-past' for the wrong hour.", "Thinking 1 hour = 100 minutes."],
          assessmentIdeas: ["Draw the hands for 3:45.", "What time is 30 minutes after 7:50?"],
          differentiation: ["Support: use a clock with bold minute markings.", "Stretch: how many minutes from 9:15 to 11:00?"],
        },
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
        teacherNotes: {
          overview:
            "Pictographs introduce the idea that one symbol can stand for many. Students learn to read both 'one-to-one' and 'one-to-many' representations.",
          lessonPlan: [
            { stage: "Survey", minutes: 8, detail: "Quick poll: favourite fair item; tally on the board." },
            { stage: "Build", minutes: 15, detail: "Decide a key (1 picture = 2 children). Pairs draw the pictograph." },
            { stage: "Read", minutes: 12, detail: "Swap pictographs and answer: which item is most popular? By how much?" },
            { stage: "Connect", minutes: 5, detail: "If we used 1 picture = 5 children, would the chart still work? Why simpler?" },
          ],
          ctSkills: ["Abstraction (symbol stands for value)", "Pattern recognition", "Evaluation"],
          misconceptions: ["Counting half-symbols as full ones.", "Forgetting to multiply by the key."],
          assessmentIdeas: ["1 ★ = 5 visitors; 4 stars in a row → how many?", "Which item is least popular?"],
          differentiation: ["Support: provide squared paper and an example pictograph.", "Stretch: introduce a key of 1 picture = 10 with halves."],
        },
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
        teacherNotes: {
          overview:
            "Build the habit of describing shapes by their properties, not just their names. Move from 'a square' to 'a 4-sided shape with equal sides and right angles'.",
          lessonPlan: [
            { stage: "Hunt", minutes: 8, detail: "Pairs find 5 examples each of 2D and 3D shapes around the classroom." },
            { stage: "Describe", minutes: 12, detail: "Each pair picks one find and describes it without naming it; classmates guess." },
            { stage: "Sort", minutes: 12, detail: "Hand out a mixed-shape pack; sort first by 2D/3D, then by number of corners or faces." },
            { stage: "Connect", minutes: 8, detail: "Discuss: which property tells you the most? Why?" },
          ],
          ctSkills: ["Classification", "Abstraction (property over name)", "Pattern recognition"],
          misconceptions: ["Calling a tilted square a 'diamond'.", "Counting curved surfaces as faces."],
          assessmentIdeas: ["Name a 3D shape with 0 vertices.", "Identify the odd one out from 4 shape pictures."],
          differentiation: ["Support: 2D-only round before adding 3D.", "Stretch: design a riddle for a peer about a hidden shape."],
        },
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
        teacherNotes: {
          overview:
            "This is logical elimination — a CT habit students will reuse for years. Make 'crossing out' an explicit action so reasoning is visible.",
          lessonPlan: [
            { stage: "Demo", minutes: 8, detail: "Teacher thinks of a number 1-20; gives clues one at a time. Class crosses out impossibilities on the board." },
            { stage: "Pairs", minutes: 15, detail: "Pairs play 'Guess my number' with 1-30; each clue must rule out at least one option." },
            { stage: "Logic puzzle", minutes: 12, detail: "Three children, three favourite colours; clues reveal who likes what." },
            { stage: "Reflect", minutes: 5, detail: "Which clue was the most useful? Why?" },
          ],
          ctSkills: ["Logical reasoning", "Decomposition", "Evaluation"],
          misconceptions: ["Stopping at the first match without checking remaining clues.", "Using a clue twice instead of taking the next one."],
          assessmentIdeas: ["Logic mini-puzzle on exit slip with 3 clues.", "Spot the redundant clue from a list of 4."],
          differentiation: ["Support: provide a printed grid for crossing out.", "Stretch: invent your own 3-clue puzzle for a friend."],
        },
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
        teacherNotes: {
          overview:
            "The coin-flip parity activity is a powerful demo of pattern recognition. The point is the rule, not the trick.",
          lessonPlan: [
            { stage: "Hook", minutes: 5, detail: "Show four numbers and ask for the rule before the next number." },
            { stage: "Coin grid", minutes: 18, detail: "Pairs build a 5×5 grid where each row and column has an even number of black sides; teacher flips one coin and the class spots the row & column with odd counts." },
            { stage: "Generalise", minutes: 12, detail: "What if the grid were 3×3? Would the trick still work? Try it." },
            { stage: "Connect", minutes: 5, detail: "Computers use parity in a similar way to detect errors." },
          ],
          ctSkills: ["Pattern recognition", "Generalisation", "Algorithmic thinking"],
          misconceptions: ["Believing 0 is not even.", "Thinking the trick relies on memory, not parity."],
          assessmentIdeas: ["Continue: 1, 3, 5, 7, ?", "Is the sum of two odd numbers odd or even?"],
          differentiation: ["Support: smaller 3×3 grid.", "Stretch: extend the trick to 6×6 and explain why it still works."],
        },
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
        teacherNotes: {
          overview:
            "Extend place-value reasoning to thousands. Comma placement makes large numbers readable.",
          lessonPlan: [
            { stage: "Build", minutes: 10, detail: "Pairs use place-value cards (1000, 200, 30, 4) to build 4-digit numbers and read them aloud." },
            { stage: "Compare", minutes: 12, detail: "Show two 4-digit numbers; class compares thousands first, then hundreds, etc." },
            { stage: "Order", minutes: 12, detail: "Six numbers on cards; line up smallest to largest in the centre of the room." },
            { stage: "Connect", minutes: 6, detail: "Why do we place a comma after thousands?" },
          ],
          ctSkills: ["Decomposition", "Algorithmic thinking (compare digit by digit)", "Generalisation"],
          misconceptions: ["Mixing up the order when 0 is in a middle digit.", "Forgetting to compare leftmost digits first."],
          assessmentIdeas: ["Order: 4123, 4132, 4231, 4321.", "Write 5,007 in expanded form."],
          differentiation: ["Support: place-value mat with labelled columns.", "Stretch: largest 4-digit number with all different digits."],
        },
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
        teacherNotes: {
          overview:
            "Introduce fractions through fair sharing. Stress 'equal' parts — unequal parts are not fractions.",
          lessonPlan: [
            { stage: "Share a snack", minutes: 8, detail: "Demonstrate cutting a paper chapati into halves, then quarters; label each piece." },
            { stage: "Partition", minutes: 14, detail: "Pairs fold paper strips into halves, thirds and quarters; mark them clearly." },
            { stage: "Story sums", minutes: 13, detail: "Three problems: share 8 sweets among 2 / 4 / 8 friends; what fraction does each get?" },
            { stage: "Connect", minutes: 5, detail: "Compare 1/2 vs 1/4: more pieces means smaller pieces." },
          ],
          ctSkills: ["Decomposition", "Abstraction", "Comparison"],
          misconceptions: ["Believing 1/4 > 1/2 because 4 > 2.", "Cutting unequal parts and calling them fractions."],
          assessmentIdeas: ["A pizza in 8 equal pieces; what is each called?", "Order 1/2, 1/4, 1/8 from largest to smallest."],
          differentiation: ["Support: paper-fold with creases pre-marked.", "Stretch: how many quarters make 1 1/2?"],
        },
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
        teacherNotes: {
          overview:
            "Estimation builds a feel for size. Always estimate before measuring; the gap between estimate and reality is where learning happens.",
          lessonPlan: [
            { stage: "Calibrate", minutes: 8, detail: "Show what 10 cm and 1 m look like using a ruler and a metre stick." },
            { stage: "Estimate", minutes: 7, detail: "Five classroom items; pairs estimate each in cm and write the guess." },
            { stage: "Measure", minutes: 15, detail: "Pairs measure each item with a ruler/tape; record the actual value next to the estimate." },
            { stage: "Reflect", minutes: 5, detail: "Whose estimate was closest overall? What helped them?" },
          ],
          ctSkills: ["Estimation", "Algorithmic thinking (consistent procedure)", "Evaluation"],
          misconceptions: ["Reading the ruler from 1 cm instead of 0 cm.", "Mixing cm and inches on the same ruler."],
          assessmentIdeas: ["Estimate the height of the door in metres.", "Convert 250 cm to m."],
          differentiation: ["Support: rulers with bold cm marks only.", "Stretch: measure perimeter of a desk and convert to metres."],
        },
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
        teacherNotes: {
          overview:
            "Bar graphs are a workhorse chart for comparison. Make sure students see that bar height encodes value, not the bar itself.",
          lessonPlan: [
            { stage: "Read", minutes: 8, detail: "Display a sample 4-village bar graph; class answers: highest, lowest, by how much." },
            { stage: "Build", minutes: 15, detail: "Pairs collect a quick survey (favourite snack) and draw a bar graph on grid paper." },
            { stage: "Question", minutes: 10, detail: "Pairs swap graphs and write 3 questions; partner answers." },
            { stage: "Connect", minutes: 7, detail: "Why does the y-axis scale matter? Show same data with different scales." },
          ],
          ctSkills: ["Abstraction", "Pattern recognition", "Evaluation"],
          misconceptions: ["Inconsistent bar widths.", "Reading the wrong axis."],
          assessmentIdeas: ["Which village scored most? By how much more than the lowest?", "Build a bar from a small data table."],
          differentiation: ["Support: pre-printed grid with labelled axes.", "Stretch: introduce double-bar graphs for two related categories."],
        },
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
        teacherNotes: {
          overview:
            "Tie units to real referents — a notebook is about 200 g, a water bottle is about 1 l. Conversions follow naturally.",
          lessonPlan: [
            { stage: "Anchor", minutes: 6, detail: "Pass around objects of 100 g, 500 g, 1 kg so students feel the differences." },
            { stage: "Measure", minutes: 14, detail: "Pairs weigh five items on a kitchen scale and record results." },
            { stage: "Pour", minutes: 13, detail: "Two-jug pouring puzzle: how to leave exactly 1 litre in a 1.5 litre jug?" },
            { stage: "Convert", minutes: 7, detail: "Whole class practice: 2 kg + 500 g = ?, 1 l − 350 ml = ?" },
          ],
          ctSkills: ["Estimation", "Decomposition", "Algorithmic thinking"],
          misconceptions: ["Believing volume and weight are the same thing.", "Forgetting unit when adding (2 kg + 500 ≠ 502)."],
          assessmentIdeas: ["A jug holds 1 litre; how many 250 ml glasses fill it?", "Convert 1.5 kg to g."],
          differentiation: ["Support: provide a conversion chart 1 kg = 1000 g.", "Stretch: design your own pouring puzzle."],
        },
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
        teacherNotes: {
          overview:
            "Arrays make multiplication structural rather than memorised. Build, count, then notice the commutative property.",
          lessonPlan: [
            { stage: "Roll & build", minutes: 12, detail: "Dice game: roll two dice, build that array with counters, write the multiplication." },
            { stage: "Commute", minutes: 8, detail: "Show that turning the array 90° gives the same total — 4×5 = 5×4." },
            { stage: "Word problems", minutes: 15, detail: "Three problems where students draw the array first, then solve." },
            { stage: "Connect", minutes: 5, detail: "Compare with repeated addition: which is faster?" },
          ],
          ctSkills: ["Pattern recognition", "Generalisation (commutativity)", "Abstraction"],
          misconceptions: ["Counting border counters twice.", "Believing 3×4 ≠ 4×3."],
          assessmentIdeas: ["Build any array with 24 counters; how many ways?", "9 rows of 3 = ?"],
          differentiation: ["Support: counters and grid paper.", "Stretch: list all rectangle arrays for 36."],
        },
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
        teacherNotes: {
          overview:
            "Division extends sharing into formal computation. Remainders are not errors — they often carry meaning in the story.",
          lessonPlan: [
            { stage: "Hook", minutes: 6, detail: "Story: 23 mangoes shared among 5 friends. What does the leftover 3 mean?" },
            { stage: "Compute", minutes: 14, detail: "Whole-class long-division-light: model 36 ÷ 4 and 25 ÷ 4 with counters." },
            { stage: "Word problems", minutes: 15, detail: "Five sharing stories with mixed remainders; students decide what the remainder represents." },
            { stage: "Reflect", minutes: 5, detail: "When does a remainder mean 'leftover food' vs 'one more bus needed'?" },
          ],
          ctSkills: ["Decomposition", "Algorithmic thinking", "Evaluation (remainder in context)"],
          misconceptions: ["Always rounding remainder up.", "Treating remainder as just a smaller answer."],
          assessmentIdeas: ["25 ÷ 4: quotient and remainder.", "Pose: 30 students into vans of 8 — how many vans?"],
          differentiation: ["Support: counters & sharing mats.", "Stretch: make up a story where the remainder must round up."],
        },
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
        teacherNotes: {
          overview:
            "Symmetry is best taught through hands and eyes, not definitions. Folding, painting and mirror-checking make the idea concrete.",
          lessonPlan: [
            { stage: "Fold", minutes: 8, detail: "Each child folds a paper, draws half a butterfly along the crease, cuts it out." },
            { stage: "Mirror", minutes: 10, detail: "Use a small mirror on a printed letter to check whether each letter has a line of symmetry." },
            { stage: "Sort", minutes: 12, detail: "Pairs sort 8 shape cards by number of lines of symmetry (0, 1, 2, more)." },
            { stage: "Connect", minutes: 5, detail: "Why does a circle seem to have 'too many' lines of symmetry?" },
          ],
          ctSkills: ["Pattern recognition", "Generalisation", "Abstraction"],
          misconceptions: ["Confusing 'symmetric' with 'has a corner'.", "Missing the diagonal lines of symmetry of a square."],
          assessmentIdeas: ["How many lines of symmetry does a regular triangle have?", "Mirror-test the letter H."],
          differentiation: ["Support: pre-cut paper shapes.", "Stretch: design a flag with exactly 2 lines of symmetry."],
        },
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
        teacherNotes: {
          overview:
            "Combine clock-reading with calendar reasoning. Durations are subtraction problems, often crossing the hour or the month.",
          lessonPlan: [
            { stage: "Read", minutes: 8, detail: "Pairs match analog clocks to digital times for fractions of an hour (quarter past, half past)." },
            { stage: "Compute", minutes: 10, detail: "Three duration problems: how long from 8:30 to 2:00? From 11:45 to 1:15?" },
            { stage: "Plan", minutes: 15, detail: "Plan a 3-day school trip on a paper calendar; mark events at specific times." },
            { stage: "Reflect", minutes: 7, detail: "Which months have 30 days? 31? Why is February different?" },
          ],
          ctSkills: ["Algorithmic thinking", "Decomposition (hours + minutes)", "Evaluation"],
          misconceptions: ["Subtracting times like decimals (e.g. 1:00 − 0:45 = 0:55).", "Forgetting that a duration can cross noon."],
          assessmentIdeas: ["How long from 9:15 to 11:00?", "How many days from 28 March to 5 April?"],
          differentiation: ["Support: number-line on the board for time arithmetic.", "Stretch: schedule a busy day with 5 events back-to-back."],
        },
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
        teacherNotes: {
          overview:
            "Tally marks teach grouping and unitising — a small but real win for counting fluency. Use a real-world tally activity if possible.",
          lessonPlan: [
            { stage: "Demo", minutes: 5, detail: "Show four tallies plus a slash; introduce groups of 5." },
            { stage: "Field count", minutes: 12, detail: "From a window, tally vehicles for 5 minutes; collate as a class." },
            { stage: "Read", minutes: 13, detail: "Build a small table; find totals, max, min." },
            { stage: "Connect", minutes: 10, detail: "Convert tallies into a quick bar chart and discuss which is faster to read." },
          ],
          ctSkills: ["Pattern recognition", "Abstraction", "Decomposition"],
          misconceptions: ["Counting tallies one by one instead of by 5.", "Drawing 5 vertical lines instead of 4 + slash."],
          assessmentIdeas: ["Three groups of 5 tally marks — total?", "Most-common item from a tally table."],
          differentiation: ["Support: pre-printed tally squares.", "Stretch: tally then convert to a labelled bar graph."],
        },
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
        teacherNotes: {
          overview:
            "Tie the data cycle together: ask a question, collect data, organise, represent, interpret. Each step is a chance for student reasoning.",
          lessonPlan: [
            { stage: "Ask", minutes: 5, detail: "Class agrees on a question (favourite fruit / favourite sport)." },
            { stage: "Collect", minutes: 10, detail: "Each student records one response on a slip; tally totals." },
            { stage: "Represent", minutes: 15, detail: "Decide a key (1 picture = 2 children). Draw a pictograph or bar graph." },
            { stage: "Interpret", minutes: 10, detail: "Pairs answer 3 questions from each other's chart: most, least, total." },
          ],
          ctSkills: ["Decomposition (data → chart)", "Abstraction", "Evaluation"],
          misconceptions: ["Counting the question line as a category.", "Choosing a key that doesn't fit the data."],
          assessmentIdeas: ["Build a quick pictograph from 8 tallies with key 1=2.", "Which category is least?"],
          differentiation: ["Support: pre-formatted chart frame.", "Stretch: chart same data as both bar and pictograph; compare."],
        },
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
        intro:
          "Planning a journey means deciding the route, the stops and how long each part takes. Adding distances and times needs careful arithmetic.",
        examples: [
          {
            id: "ex-1",
            title: "Total distance",
            problem:
              "A bus goes 25 km from town A to B, then 40 km from B to C. What is the total distance?",
            solution: "25 + 40 = 65 km.",
          },
          {
            id: "ex-2",
            title: "Trip duration",
            problem:
              "If a train leaves at 9:15 and reaches at 11:45, how long is the trip?",
            solution:
              "From 9:15 to 11:15 is 2 hours; from 11:15 to 11:45 is 30 minutes. Total: 2 hours 30 minutes.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "A car drives 35 km, then another 48 km. How many km altogether?",
            answer: "83",
            explanation: "35 + 48 = 83 km.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A bus leaves at 7:00 and arrives at 9:30. How long is the journey?",
            options: ["1 h 30 min", "2 h", "2 h 30 min", "3 h"],
            answerIndex: 2,
            explanation: "From 7:00 to 9:30 is 2 hours 30 minutes.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: To find total distance for a multi-stop journey, you add up each leg.",
            answer: true,
            explanation: "Yes — total distance = sum of all legs.",
          },
        ],
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
        intro:
          "A fraction has a top number (numerator) and a bottom number (denominator). The bottom tells how many equal parts the whole is split into; the top tells how many parts we have.",
        examples: [
          {
            id: "ex-1",
            title: "Add like fractions",
            problem: "Find 2/7 + 3/7.",
            solution:
              "Denominators are the same, so add the tops: 2 + 3 = 5. Answer: 5/7.",
          },
          {
            id: "ex-2",
            title: "Compare fractions",
            problem: "Which is bigger: 3/8 or 5/8?",
            solution: "Same denominator, so the bigger top wins: 5/8 > 3/8.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 1/5 + 2/5? (write as a fraction like 3/5)",
            answer: "3/5",
            explanation: "1 + 2 = 3 over the same 5.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is the largest fraction?",
            options: ["1/4", "1/2", "1/3", "1/5"],
            answerIndex: 1,
            explanation: "With the same numerator, the smallest denominator gives the largest fraction.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 4/4 is the same as 1 whole.",
            answer: true,
            explanation: "Yes — all 4 of 4 equal parts make a whole.",
          },
        ],
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
        intro:
          "An angle is the amount of turn between two rays. A quarter turn is 90° (a right angle), a half turn is 180°, and a full turn is 360°. Angles smaller than 90° are acute; between 90° and 180° they are obtuse.",
        examples: [
          {
            id: "ex-1",
            title: "Right angle",
            problem: "What kind of angle is exactly 90°?",
            solution: "A right angle.",
          },
          {
            id: "ex-2",
            title: "Acute or obtuse?",
            problem: "Is a 45° angle acute or obtuse?",
            solution: "Acute — it is less than 90°.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many degrees are there in a full turn?",
            answer: "360",
            explanation: "A full turn = 360°.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which angle is obtuse?",
            options: ["30°", "60°", "90°", "120°"],
            answerIndex: 3,
            explanation: "120° is greater than 90° and less than 180°, so it's obtuse.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A half turn is the same as a 180° angle.",
            answer: true,
            explanation: "Yes — a half turn is 180°.",
          },
        ],
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
        intro:
          "On a grid map, places are described by columns (letters) and rows (numbers). Directions like North, South, East and West help us find our way.",
        examples: [
          {
            id: "ex-1",
            title: "Grid reference",
            problem:
              "On a grid, the school is at column B, row 3. Write its grid reference.",
            solution: "B3.",
          },
          {
            id: "ex-2",
            title: "Direction sense",
            problem: "If you are facing North and turn right, which direction do you face?",
            solution: "East.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Facing East, you turn left. Which direction do you face now?",
            options: ["North", "South", "East", "West"],
            answerIndex: 0,
            explanation: "East → left turn → North.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "If a place is at column D, row 5, write its grid reference.",
            answer: "D5",
            explanation: "Column letter then row number → D5.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A right turn from South leads to West.",
            answer: true,
            explanation: "Yes — South → right turn → West.",
          },
        ],
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
        intro:
          "Estimating means making a sensible guess before measuring. On a map, a scale tells us how a small distance on paper stands for a real distance.",
        examples: [
          {
            id: "ex-1",
            title: "Use the scale",
            problem:
              "On a map, 1 cm represents 100 m. Two points are 4 cm apart on the map. What is the real distance?",
            solution: "4 × 100 = 400 m.",
          },
          {
            id: "ex-2",
            title: "Best estimate",
            problem:
              "Which is the best estimate for the length of a school playground: 5 m, 50 m, or 5 km?",
            solution: "50 m is most realistic.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "On a map where 1 cm = 200 m, what real distance is 3 cm?",
            answer: "600",
            explanation: "3 × 200 = 600 m.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is closest to the height of a typical adult?",
            options: ["1 m", "1.7 m", "5 m", "10 m"],
            answerIndex: 1,
            explanation: "Most adults are about 1.5 m to 1.8 m tall.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A scale on a map lets us turn a small distance on paper into a real-world distance.",
            answer: true,
            explanation: "Yes — that is what a scale is for.",
          },
        ],
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
        intro:
          "Rates compare two quantities — like litres of milk per cow per day. With a rate we can scale up (more cows, more milk) or scale down (fewer cows, less milk).",
        examples: [
          {
            id: "ex-1",
            title: "Total milk",
            problem:
              "A cow gives 8 litres of milk a day. How much milk do 6 cows give in a day?",
            solution: "6 × 8 = 48 litres.",
          },
          {
            id: "ex-2",
            title: "Per-cow milk",
            problem:
              "A farm collects 60 litres of milk in one day from 5 cows. How much per cow on average?",
            solution: "60 ÷ 5 = 12 litres per cow.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "If each cow gives 7 litres a day, how many litres do 9 cows give in a day?",
            answer: "63",
            explanation: "9 × 7 = 63 litres.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "If 4 cows give 32 litres in a day, what is the average per cow?",
            options: ["6 l", "7 l", "8 l", "9 l"],
            answerIndex: 2,
            explanation: "32 ÷ 4 = 8 litres per cow.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: To find total milk, you multiply the number of cows by the milk per cow.",
            answer: true,
            explanation: "Yes — total = number of cows × milk per cow.",
          },
        ],
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
        intro:
          "Polygons are flat shapes with straight sides. Some polygons fit together with no gaps to cover a surface — that is called a tiling or tessellation.",
        examples: [
          {
            id: "ex-1",
            title: "Polygon name",
            problem: "What do we call a polygon with 8 sides?",
            solution: "An octagon.",
          },
          {
            id: "ex-2",
            title: "Make a pattern",
            problem:
              "If a pattern starts 1, 4, 9, 16 (squares of 1, 2, 3, 4), what comes next?",
            solution: "5² = 25.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many sides does a heptagon have?",
            answer: "7",
            explanation: "A heptagon has 7 sides.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which shape can tile a floor with no gaps?",
            options: ["Circle", "Square", "Pentagon", "Heart"],
            answerIndex: 1,
            explanation: "Squares tile perfectly with no gaps.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: All polygons have straight sides.",
            answer: true,
            explanation: "Yes — by definition, polygons have straight sides.",
          },
        ],
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
        intro:
          "We weigh things in grams (g) and kilograms (kg), and measure liquids in millilitres (ml) and litres (l). The big units are 1000 times the small ones: 1 kg = 1000 g, 1 l = 1000 ml.",
        examples: [
          {
            id: "ex-1",
            title: "Convert kg to g",
            problem: "How many grams are in 3.5 kg?",
            solution: "3.5 × 1000 = 3500 g.",
          },
          {
            id: "ex-2",
            title: "Recipe scaling",
            problem:
              "A recipe needs 250 ml of milk for 1 person. How much milk for 4 people?",
            solution: "250 × 4 = 1000 ml = 1 l.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Convert 2 l to ml.",
            answer: "2000",
            explanation: "2 × 1000 = 2000 ml.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "How many grams are in half a kilogram?",
            options: ["50 g", "100 g", "500 g", "5000 g"],
            answerIndex: 2,
            explanation: "1 kg = 1000 g; half is 500 g.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 750 ml + 250 ml = 1 litre.",
            answer: true,
            explanation: "Yes — 750 + 250 = 1000 ml = 1 l.",
          },
        ],
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
        intro:
          "On a farm we use multiplication to find totals (trees × fruit per tree) and division to share or to find the average per tree.",
        examples: [
          {
            id: "ex-1",
            title: "Total coconuts",
            problem:
              "A farm has 25 coconut trees. If each tree gives 12 coconuts a month, how many coconuts in a month?",
            solution: "25 × 12 = 300 coconuts.",
          },
          {
            id: "ex-2",
            title: "Per tree",
            problem:
              "If 200 coconuts are shared equally among 8 baskets, how many per basket?",
            solution: "200 ÷ 8 = 25 coconuts per basket.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "15 trees, each gives 20 coconuts. Total?",
            answer: "300",
            explanation: "15 × 20 = 300.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "If a farm produces 144 coconuts and packs them into baskets of 12, how many baskets?",
            options: ["10", "11", "12", "14"],
            answerIndex: 2,
            explanation: "144 ÷ 12 = 12 baskets.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Estimating before computing helps you check whether your answer is reasonable.",
            answer: true,
            explanation: "Yes — estimation is a great check.",
          },
        ],
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
        intro:
          "A figure has rotational symmetry if it looks the same after a turn. The order of symmetry counts how many times it matches in one full turn.",
        examples: [
          {
            id: "ex-1",
            title: "Order of rotational symmetry",
            problem:
              "An equilateral triangle looks the same every 120° turn. What is its order of rotational symmetry?",
            solution: "It matches 3 times in a full turn, so order = 3.",
          },
          {
            id: "ex-2",
            title: "Square symmetry",
            problem: "What is the order of rotational symmetry of a square?",
            solution: "A square matches every 90°, so order = 4.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "What is the order of rotational symmetry of a regular hexagon?",
            answer: "6",
            explanation: "It matches every 60°, so order = 6.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which letter has rotational symmetry of order 2?",
            options: ["A", "B", "S", "T"],
            answerIndex: 2,
            explanation: "S looks the same after a 180° turn — order 2.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A circle has rotational symmetry for any angle.",
            answer: true,
            explanation: "Yes — a circle is unchanged after any rotation.",
          },
        ],
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
        intro:
          "A quilt is made of tiles. Counting tiles helps us see fractions of the whole and to reason about area.",
        examples: [
          {
            id: "ex-1",
            title: "Fraction of a quilt",
            problem:
              "A quilt has 16 squares; 4 are red. What fraction of the quilt is red?",
            solution: "4/16, which simplifies to 1/4.",
          },
          {
            id: "ex-2",
            title: "Area in tiles",
            problem:
              "A rectangular patch is 3 tiles long and 5 tiles wide. How many tiles does it cover?",
            solution: "3 × 5 = 15 tiles.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Out of 20 tiles, 5 are blue. What fraction is blue (in simplest form)?",
            options: ["1/2", "1/4", "1/5", "1/10"],
            answerIndex: 1,
            explanation: "5/20 = 1/4.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "A rectangle is 6 tiles by 4 tiles. How many tiles total?",
            answer: "24",
            explanation: "6 × 4 = 24.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Counting unit tiles is one way to find the area of a rectangle.",
            answer: true,
            explanation: "Yes — counting tiles equals area in tile-units.",
          },
        ],
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
        intro:
          "60 seconds make a minute and 60 minutes make an hour. To find a duration, subtract the start time from the end time.",
        examples: [
          {
            id: "ex-1",
            title: "Convert minutes to seconds",
            problem: "How many seconds are in 5 minutes?",
            solution: "5 × 60 = 300 seconds.",
          },
          {
            id: "ex-2",
            title: "Race times",
            problem:
              "Two runners finish at 1 minute 20 seconds and 1 minute 35 seconds. What is the difference?",
            solution: "35 − 20 = 15 seconds.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many seconds are there in 1 hour?",
            answer: "3600",
            explanation: "60 × 60 = 3600 seconds.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Runner A: 42 s. Runner B: 38 s. Who is faster and by how much?",
            options: ["A by 4 s", "B by 4 s", "A by 6 s", "B by 6 s"],
            answerIndex: 1,
            explanation: "Smaller time = faster. 42 − 38 = 4 s, so B is faster by 4 s.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 90 seconds is the same as 1 minute 30 seconds.",
            answer: true,
            explanation: "Yes — 60 + 30 = 90 seconds.",
          },
        ],
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
        intro:
          "Every step on a number line is a jump of a fixed size. If we know the start, the jump and the number of jumps, we can find where we land.",
        examples: [
          {
            id: "ex-1",
            title: "Jumps of 4",
            problem: "Start at 7 and take 3 jumps of 4 forward. Where do you land?",
            solution: "7 + (3 × 4) = 7 + 12 = 19.",
          },
          {
            id: "ex-2",
            title: "Find the rule",
            problem: "What rule continues the sequence 6, 11, 16, 21, ?",
            solution: "Add 5 each time. Next: 21 + 5 = 26.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Start at 12 and take 5 jumps of 3. Where do you land?",
            answer: "27",
            explanation: "12 + (5 × 3) = 27.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "What number is missing? 4, 9, 14, ?, 24",
            options: ["18", "19", "20", "21"],
            answerIndex: 1,
            explanation: "Add 5 each step: 14 + 5 = 19.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: To go backward on a number line, you can use subtraction.",
            answer: true,
            explanation: "Yes — backward jumps are subtractions.",
          },
        ],
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
        intro:
          "A map uses scale to shrink distances, directions to show which way is which, and grid references to pinpoint locations. Together they help us find places quickly.",
        examples: [
          {
            id: "ex-1",
            title: "Scale to real distance",
            problem:
              "On a map 1 cm = 500 m. The library is 6 cm from the school on the map. How far in real life?",
            solution: "6 × 500 = 3000 m, or 3 km.",
          },
          {
            id: "ex-2",
            title: "Combined direction",
            problem:
              "Start facing East. Take a half turn (180°). Which direction now?",
            solution: "West.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "On a 1 cm = 1 km map, two cities are 25 cm apart on paper. Real distance?",
            options: ["2.5 km", "25 km", "100 km", "250 km"],
            answerIndex: 1,
            explanation: "25 × 1 km = 25 km.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "Facing North, turn through 90° clockwise. Which direction now?",
            answer: "East",
            explanation: "Clockwise from North → East.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A grid reference like C4 tells you which column and row a place is in.",
            answer: true,
            explanation: "Yes — column letter and row number.",
          },
        ],
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
        intro:
          "Many number sequences follow a rule — add a constant, multiply by a constant, or follow a more complex pattern (like squares or triangular numbers). Spotting the rule lets us predict what comes next.",
        examples: [
          {
            id: "ex-1",
            title: "Triangular numbers",
            problem: "1, 3, 6, 10, 15, ? — what comes next?",
            solution:
              "Differences are 2, 3, 4, 5; the next difference is 6. So 15 + 6 = 21.",
          },
          {
            id: "ex-2",
            title: "Square numbers",
            problem: "1, 4, 9, 16, ? — what is the next number?",
            solution: "These are 1², 2², 3², 4². Next is 5² = 25.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What comes next? 2, 4, 8, 16, ?",
            answer: "32",
            explanation: "Each term doubles the last. 16 × 2 = 32.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is the rule for 5, 9, 13, 17, …?",
            options: ["Add 3", "Add 4", "Multiply by 2", "Add 5"],
            answerIndex: 1,
            explanation: "Each term increases by 4.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A pattern's rule must always be 'add a fixed number'.",
            answer: false,
            explanation:
              "False — patterns can use multiplication, squares, or any other rule.",
          },
        ],
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
        intro:
          "Angles can be acute (<90°), right (=90°), obtuse (90°–180°), straight (=180°) or reflex (>180°). Pairs of angles on a straight line add up to 180°.",
        examples: [
          {
            id: "ex-1",
            title: "Linear pair",
            problem:
              "Two angles together form a straight line. One is 65°. What is the other?",
            solution: "180° − 65° = 115°.",
          },
          {
            id: "ex-2",
            title: "Classify the angle",
            problem: "Is 92° acute, right or obtuse?",
            solution: "Obtuse — between 90° and 180°.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Two angles on a straight line; one is 110°. What is the other?",
            answer: "70",
            explanation: "180 − 110 = 70°.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which angle is acute?",
            options: ["95°", "60°", "120°", "180°"],
            answerIndex: 1,
            explanation: "60° is less than 90°, so it's acute.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A right angle measures 90°.",
            answer: true,
            explanation: "Yes — that is the definition of a right angle.",
          },
        ],
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
        intro:
          "Numbers have rich properties — they can be even/odd, prime/composite, factors of others. Spotting these properties helps in mental maths and puzzles.",
        examples: [
          {
            id: "ex-1",
            title: "Sum of digits",
            problem: "What is the sum of the digits of 4729?",
            solution: "4 + 7 + 2 + 9 = 22.",
          },
          {
            id: "ex-2",
            title: "Even or odd",
            problem: "Is the product 17 × 24 even or odd?",
            solution:
              "Any number times an even number is even. 24 is even, so the product is even.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is the sum of digits of 1234?",
            answer: "10",
            explanation: "1 + 2 + 3 + 4 = 10.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which of these is odd?",
            options: ["12 + 14", "13 × 4", "9 × 7", "8 + 6"],
            answerIndex: 2,
            explanation: "9 × 7 = 63, an odd number. The others are even.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: Adding two odd numbers always gives an even number.",
            answer: true,
            explanation: "Yes — odd + odd = even.",
          },
        ],
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
        intro:
          "Different charts answer different questions. Bar charts compare categories; line charts show change over time; pie charts show parts of a whole.",
        examples: [
          {
            id: "ex-1",
            title: "Best chart",
            problem:
              "You want to show how the temperature changed every hour for a day. Which chart is best?",
            solution: "A line chart — it shows change over time.",
          },
          {
            id: "ex-2",
            title: "Find the mode",
            problem: "In the list 4, 7, 7, 8, 9, 7, 5, what is the mode?",
            solution: "The most frequent value is 7. So the mode is 7.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Which chart is best for showing parts of a whole?",
            options: ["Bar chart", "Line chart", "Pie chart", "Pictograph"],
            answerIndex: 2,
            explanation:
              "Pie charts split a circle into slices that show fractions of the whole.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "What is the mode of: 2, 5, 5, 6, 7, 5, 8?",
            answer: "5",
            explanation: "5 appears most often.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Line charts are good for comparing things that don't change over time.",
            answer: false,
            explanation:
              "Line charts work best for change-over-time data. Bar charts are better for static comparisons.",
          },
        ],
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
        intro:
          "A prime number is a number greater than 1 with exactly two factors: 1 and itself. Numbers that are not prime (and greater than 1) are composite. Every composite number can be written as a product of primes — its prime factorisation.",
        examples: [
          {
            id: "ex-1",
            title: "Prime or composite?",
            problem: "Is 17 prime or composite?",
            solution: "The only factors of 17 are 1 and 17. So 17 is prime.",
          },
          {
            id: "ex-2",
            title: "Prime factorisation",
            problem: "Find the prime factorisation of 30.",
            solution: "30 = 2 × 15 = 2 × 3 × 5. Answer: 2 × 3 × 5.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt: "Which of these is a prime number?",
            options: ["9", "15", "21", "23"],
            answerIndex: 3,
            explanation:
              "23 has only 1 and 23 as factors. The others have more.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "What is the smallest prime number?",
            answer: "2",
            explanation: "2 is the smallest prime — and the only even prime.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: 1 is a prime number.",
            answer: false,
            explanation:
              "False — by definition, primes have exactly two distinct factors. 1 has only one.",
          },
        ],
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
        intro:
          "Perimeter is the total length around a shape. Area is the space inside it. For a rectangle: perimeter = 2(l + w), area = l × w.",
        examples: [
          {
            id: "ex-1",
            title: "Rectangle area",
            problem: "Find the area of a rectangle 8 cm long and 5 cm wide.",
            solution: "Area = 8 × 5 = 40 cm².",
          },
          {
            id: "ex-2",
            title: "Same perimeter, different area",
            problem:
              "Two rectangles each have a perimeter of 16 cm. One is 5×3, the other 4×4. Which has larger area?",
            solution: "5×3 = 15; 4×4 = 16. The square has more area.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is the perimeter of a rectangle 7 cm by 3 cm?",
            answer: "20",
            explanation: "2(7 + 3) = 20 cm.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "What is the area of a rectangle 9 m by 4 m?",
            options: ["13 m²", "26 m²", "36 m²", "40 m²"],
            answerIndex: 2,
            explanation: "9 × 4 = 36 m².",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: For a fixed perimeter, a square has the largest area among rectangles.",
            answer: true,
            explanation: "Yes — among rectangles with a fixed perimeter, the square is biggest.",
          },
        ],
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
        intro:
          "To add or subtract fractions with different denominators, first find a common denominator. Some fractions have neat decimal forms: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75.",
        examples: [
          {
            id: "ex-1",
            title: "Add unlike fractions",
            problem: "Find 1/2 + 1/3.",
            solution:
              "Common denominator 6: 1/2 = 3/6 and 1/3 = 2/6. Sum = 5/6.",
          },
          {
            id: "ex-2",
            title: "Fraction to decimal",
            problem: "Write 3/4 as a decimal.",
            solution: "3 ÷ 4 = 0.75.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 1/4 + 1/4? (write like 1/2)",
            answer: "1/2",
            explanation: "2/4 simplifies to 1/2.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which fraction is the largest?",
            options: ["1/2", "2/5", "3/8", "5/16"],
            answerIndex: 0,
            explanation: "1/2 = 0.5, 2/5 = 0.4, 3/8 = 0.375, 5/16 = 0.3125. Largest: 1/2.",
          },
          {
            id: "q3",
            type: "short",
            prompt: "Write 1/2 as a decimal.",
            answer: "0.5",
            explanation: "1 ÷ 2 = 0.5.",
          },
        ],
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
        intro:
          "Using just a ruler and a compass, we can draw exact figures. Two figures that have the same shape and size are called congruent.",
        examples: [
          {
            id: "ex-1",
            title: "Equilateral triangle",
            problem: "How many sides of an equilateral triangle are equal?",
            solution: "All three sides are equal in length.",
          },
          {
            id: "ex-2",
            title: "Congruence test",
            problem:
              "Two triangles each have sides of 5 cm, 6 cm and 7 cm. Are they congruent?",
            solution:
              "Yes — three pairs of equal sides (SSS) means the triangles are congruent.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which tool draws perfect circles for constructions?",
            options: ["Ruler", "Set square", "Compass", "Protractor"],
            answerIndex: 2,
            explanation: "A compass is the standard tool for circles and arcs.",
          },
          {
            id: "q2",
            type: "short",
            prompt:
              "If a triangle has all sides equal, what is it called? (one word)",
            answer: "equilateral",
            explanation: "An equilateral triangle has three equal sides.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Two figures that look alike but differ in size are congruent.",
            answer: false,
            explanation:
              "Congruent figures must have the same shape AND size.",
          },
        ],
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
        intro:
          "A figure has line symmetry if it can be folded along a line so the two halves match. It has rotational symmetry if it looks the same after a partial turn.",
        examples: [
          {
            id: "ex-1",
            title: "Lines of symmetry",
            problem: "How many lines of symmetry does a regular pentagon have?",
            solution: "5 — one through each vertex.",
          },
          {
            id: "ex-2",
            title: "Order of rotation",
            problem:
              "What is the order of rotational symmetry of a rectangle (not a square)?",
            solution: "Order 2 — it looks the same after a 180° turn.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many lines of symmetry does a regular hexagon have?",
            answer: "6",
            explanation: "6 lines of symmetry in a regular hexagon.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "The order of rotational symmetry of a square is:",
            options: ["1", "2", "3", "4"],
            answerIndex: 3,
            explanation: "A square matches every 90° turn, so 4.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A scalene triangle has no lines of symmetry.",
            answer: true,
            explanation:
              "Yes — scalene triangles have no equal sides, so no folding line works.",
          },
        ],
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
        intro:
          "Integers extend the number line below zero. Negative numbers represent things like below-zero temperatures or money owed. Adding a negative is the same as subtracting.",
        examples: [
          {
            id: "ex-1",
            title: "Temperature drop",
            problem:
              "It is 5°C. The temperature drops by 8°C. What is the new temperature?",
            solution: "5 − 8 = −3°C.",
          },
          {
            id: "ex-2",
            title: "Add negatives",
            problem: "Find (−4) + (−7).",
            solution: "Both are negative, so add magnitudes: 4 + 7 = 11. Sign stays −. Answer: −11.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is (−6) + 10?",
            answer: "4",
            explanation: "Going up 10 from −6 lands at 4.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "What is 3 − 9?",
            options: ["6", "−5", "−6", "12"],
            answerIndex: 2,
            explanation: "3 − 9 = −6.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: −5 is greater than −2.",
            answer: false,
            explanation: "On the number line, −5 lies to the LEFT of −2, so −5 is smaller.",
          },
        ],
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
        intro:
          "Intelligence is the ability to learn, reason and solve problems. Artificial Intelligence (AI) means making machines do tasks that need such intelligence, by learning from data instead of following only fixed rules.",
        examples: [
          {
            id: "ex-1",
            title: "AI vs not-AI",
            problem:
              "Which is AI: (a) a calculator that always does 2+2=4, (b) a spam filter that learns from emails you mark as junk?",
            solution:
              "(b) is AI — it learns from examples. (a) just follows fixed rules.",
          },
          {
            id: "ex-2",
            title: "Where do we meet AI?",
            problem: "Name two everyday places where you meet AI.",
            solution:
              "Examples: voice assistants on phones, video recommendations on a streaming app, autocorrect on a keyboard, face-unlock on a phone.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which of these BEST describes AI?",
            options: [
              "Any computer program",
              "Programs that learn from data and improve",
              "Only robots that walk",
              "Programs that can never be wrong",
            ],
            answerIndex: 1,
            explanation:
              "AI focuses on learning from data and improving with experience.",
          },
          {
            id: "q2",
            type: "tf",
            prompt:
              "True or False: A simple alarm clock is an example of AI.",
            answer: false,
            explanation:
              "A simple alarm clock follows fixed instructions — it doesn't learn.",
          },
          {
            id: "q3",
            type: "short",
            prompt:
              "What is the short form for Artificial Intelligence? (two letters)",
            answer: "AI",
            explanation: "Artificial Intelligence is shortened to AI.",
          },
        ],
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
        intro:
          "AI systems often work by spotting patterns and making decisions from them. We can practise this by hand using simple if-then rules and decision trees.",
        examples: [
          {
            id: "ex-1",
            title: "Decision rule",
            problem:
              "An umbrella app gets the rule: IF rain probability > 50% THEN suggest umbrella. If today's rain probability is 70%, what should it do?",
            solution: "Suggest the umbrella, since 70% > 50%.",
          },
          {
            id: "ex-2",
            title: "Pattern in shapes",
            problem: "★ ◆ ★ ◆ ★ ?  What comes next?",
            solution: "The pattern alternates star and diamond, so next is ◆.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "An app uses the rule: IF battery < 20% THEN show low-battery alert. The battery is 18%. What does the app do?",
            options: [
              "Nothing",
              "Show a low-battery alert",
              "Charge the phone",
              "Switch off",
            ],
            answerIndex: 1,
            explanation: "18% < 20%, so the rule fires.",
          },
          {
            id: "q2",
            type: "short",
            prompt: "What comes next? 5, 10, 20, 40, ?",
            answer: "80",
            explanation: "Each term doubles. 40 × 2 = 80.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A decision tree asks a series of yes/no questions to reach a decision.",
            answer: true,
            explanation: "Yes — that is exactly how decision trees work.",
          },
        ],
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
        intro:
          "In the Indian system we group digits as lakhs and crores; in the international system we use thousands, millions and billions. Commas help us read large numbers correctly.",
        examples: [
          {
            id: "ex-1",
            title: "Place a comma",
            problem:
              "Insert commas in 12345678 using the Indian system.",
            solution: "1,23,45,678 (one crore twenty-three lakh forty-five thousand six hundred seventy-eight).",
          },
          {
            id: "ex-2",
            title: "How many lakhs in a crore?",
            problem: "1 crore is how many lakhs?",
            solution: "100 lakhs.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "How many zeros are there in 1 crore?",
            answer: "7",
            explanation: "1 crore = 1,00,00,000 (seven zeros).",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is the same as 50 lakhs?",
            options: ["5,00,000", "50,00,000", "5,00,00,000", "50,000"],
            answerIndex: 1,
            explanation: "50 lakhs = 50,00,000.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: 1 million is the same as 10 lakhs.",
            answer: true,
            explanation: "Yes — 1 million = 10,00,000 = 10 lakhs.",
          },
        ],
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
        intro:
          "When several operations are mixed, we follow the BODMAS order: Brackets, Of, Division, Multiplication, Addition, Subtraction.",
        examples: [
          {
            id: "ex-1",
            title: "BODMAS in action",
            problem: "Evaluate 8 + 2 × 5.",
            solution: "Multiply first: 2 × 5 = 10. Then add: 8 + 10 = 18.",
          },
          {
            id: "ex-2",
            title: "Brackets matter",
            problem: "Evaluate (8 + 2) × 5.",
            solution: "Brackets first: 8 + 2 = 10. Then 10 × 5 = 50.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Evaluate 12 − 3 × 2.",
            answer: "6",
            explanation: "Multiply first: 3 × 2 = 6. Then 12 − 6 = 6.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Evaluate 24 ÷ (4 + 2).",
            options: ["2", "3", "4", "6"],
            answerIndex: 2,
            explanation: "Brackets: 4 + 2 = 6. Then 24 ÷ 6 = 4.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: In BODMAS, multiplication is done before addition.",
            answer: true,
            explanation: "Yes — multiplication comes before addition in BODMAS.",
          },
        ],
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
        intro:
          "Decimals extend place value to the right of the decimal point: tenths, hundredths, thousandths. Line up the decimal points before adding or subtracting.",
        examples: [
          {
            id: "ex-1",
            title: "Add decimals",
            problem: "Add 3.45 and 2.7.",
            solution:
              "Line up the points: 3.45 + 2.70 = 6.15.",
          },
          {
            id: "ex-2",
            title: "Compare decimals",
            problem: "Which is bigger: 0.6 or 0.59?",
            solution:
              "0.6 = 0.60. 0.60 > 0.59, so 0.6 is bigger.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 5.2 + 1.85?",
            answer: "7.05",
            explanation: "5.20 + 1.85 = 7.05.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is the smallest?",
            options: ["0.5", "0.55", "0.05", "0.5005"],
            answerIndex: 2,
            explanation: "0.05 has only 5 hundredths — smallest.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: 0.50 is equal to 0.5.",
            answer: true,
            explanation: "Yes — trailing zeros after the decimal point don't change the value.",
          },
        ],
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
        intro:
          "A letter like x or n can stand for an unknown number. We can write expressions with it: 3n means '3 times n'. Like terms — terms with the same letter — can be combined.",
        examples: [
          {
            id: "ex-1",
            title: "Write the expression",
            problem: "I think of a number n. I add 5 to it. Write the expression.",
            solution: "n + 5.",
          },
          {
            id: "ex-2",
            title: "Combine like terms",
            problem: "Simplify 3a + 2a + 4.",
            solution: "3a + 2a = 5a, so the expression is 5a + 4.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Simplify 4x + 3x. (write like 5x)",
            answer: "7x",
            explanation: "4x + 3x = 7x.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "If n = 4, what is 2n + 3?",
            options: ["7", "9", "11", "12"],
            answerIndex: 2,
            explanation: "2(4) + 3 = 8 + 3 = 11.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: 5a and 5b can be combined into one term.",
            answer: false,
            explanation: "They are not like terms — different letters.",
          },
        ],
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
        intro:
          "Two lines are parallel if they never meet. They intersect if they cross. When a transversal cuts two parallel lines, it makes pairs of equal angles (corresponding) and pairs that add to 180° (co-interior).",
        examples: [
          {
            id: "ex-1",
            title: "Vertically opposite",
            problem:
              "Two lines cross. One angle is 70°. What is its vertically opposite angle?",
            solution: "Vertically opposite angles are equal: 70°.",
          },
          {
            id: "ex-2",
            title: "Linear pair",
            problem:
              "Two angles on a straight line add to 180°. One is 65°. What is the other?",
            solution: "180 − 65 = 115°.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "Two lines meet. One angle is 40°. What is the vertically opposite angle?",
            answer: "40",
            explanation: "Vertically opposite angles are equal.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Parallel lines:",
            options: [
              "Always meet at one point",
              "Never meet",
              "Meet at infinity only",
              "Cross at right angles",
            ],
            answerIndex: 1,
            explanation: "Parallel lines never meet.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Co-interior angles between two parallel lines and a transversal add to 180°.",
            answer: true,
            explanation: "Yes — co-interior (same-side interior) angles are supplementary.",
          },
        ],
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
        intro:
          "Quick divisibility checks: by 2 if last digit is even; by 3 if sum of digits divisible by 3; by 5 if last digit is 0 or 5; by 9 if sum of digits divisible by 9.",
        examples: [
          {
            id: "ex-1",
            title: "Divisible by 3?",
            problem: "Is 432 divisible by 3?",
            solution: "Sum of digits 4+3+2 = 9, which is divisible by 3. Yes.",
          },
          {
            id: "ex-2",
            title: "Divisible by 9?",
            problem: "Is 459 divisible by 9?",
            solution: "Sum 4+5+9 = 18, which is divisible by 9. Yes.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "tf",
            prompt: "True or False: 765 is divisible by 5.",
            answer: true,
            explanation: "Last digit is 5, so yes.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which number is divisible by 9?",
            options: ["123", "234", "345", "729"],
            answerIndex: 3,
            explanation: "Sum 7+2+9 = 18, divisible by 9.",
          },
          {
            id: "q3",
            type: "short",
            prompt: "Sum of digits of 4536 is?",
            answer: "18",
            explanation: "4+5+3+6 = 18.",
          },
        ],
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
        intro:
          "The three angles of any triangle add up to 180°. Triangles can be classified by sides (scalene, isosceles, equilateral) or by angles (acute, right, obtuse).",
        examples: [
          {
            id: "ex-1",
            title: "Find the missing angle",
            problem: "A triangle has angles 50° and 70°. What is the third angle?",
            solution: "180 − (50 + 70) = 60°.",
          },
          {
            id: "ex-2",
            title: "Classify by sides",
            problem:
              "A triangle has sides 5, 5 and 7 cm. By sides, what is it called?",
            solution: "Two sides equal — isosceles.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "Two angles of a triangle are 40° and 60°. What is the third?",
            answer: "80",
            explanation: "180 − (40 + 60) = 80°.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A triangle with all sides different is called:",
            options: ["Equilateral", "Isosceles", "Scalene", "Right"],
            answerIndex: 2,
            explanation: "All-different-sides → scalene.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: A triangle's angles always sum to 180°.",
            answer: true,
            explanation: "Yes — this is the angle-sum property.",
          },
        ],
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
        intro:
          "To multiply fractions, multiply the tops and the bottoms separately. To divide by a fraction, multiply by its reciprocal (flip it over).",
        examples: [
          {
            id: "ex-1",
            title: "Multiply fractions",
            problem: "Find 2/3 × 3/4.",
            solution: "(2 × 3) / (3 × 4) = 6/12 = 1/2.",
          },
          {
            id: "ex-2",
            title: "Divide fractions",
            problem: "Find 3/4 ÷ 1/2.",
            solution: "Flip the second: 3/4 × 2/1 = 6/4 = 3/2.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "What is 1/2 × 1/3? (write like 1/6)",
            answer: "1/6",
            explanation: "(1 × 1) / (2 × 3) = 1/6.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "What is 4/5 ÷ 2/5?",
            options: ["2/25", "1/2", "2", "8/25"],
            answerIndex: 2,
            explanation: "4/5 ÷ 2/5 = 4/5 × 5/2 = 20/10 = 2.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: To divide by a fraction, you multiply by its reciprocal.",
            answer: true,
            explanation: "Yes — flip the divisor and multiply.",
          },
        ],
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
        intro:
          "AI is being used in many industries — from spotting diseases in medical scans to detecting fraud in banks and recommending products in shops. Each use brings benefits but also risks like bias and over-reliance.",
        examples: [
          {
            id: "ex-1",
            title: "AI in healthcare",
            problem:
              "Name one way AI helps doctors.",
            solution:
              "AI can analyse medical images (X-rays, scans) and flag possible problems faster than a human reading every image.",
          },
          {
            id: "ex-2",
            title: "AI risk",
            problem:
              "Name one risk if a bank uses AI to decide loans without checking the data.",
            solution:
              "If the training data is biased (e.g. against certain groups), the AI may unfairly reject some applicants.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "A food-delivery app predicts how long an order will take. Which industry is this AI in?",
            options: ["Healthcare", "Finance", "Food delivery", "Education"],
            answerIndex: 2,
            explanation: "Food delivery uses AI to estimate prep + delivery times.",
          },
          {
            id: "q2",
            type: "tf",
            prompt:
              "True or False: AI can be useful in finance for spotting unusual transactions.",
            answer: true,
            explanation:
              "Yes — banks use AI to flag possibly fraudulent transactions.",
          },
          {
            id: "q3",
            type: "mcq",
            prompt:
              "A risk of using AI in a hospital is:",
            options: [
              "Patients can't be helped at all",
              "AI may give wrong advice if data is bad",
              "AI is always perfect",
              "Doctors stop being needed",
            ],
            answerIndex: 1,
            explanation:
              "AI is only as good as its data; bad or biased data leads to bad advice.",
          },
        ],
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
        intro:
          "Charts make patterns easy to see. Bar charts compare categories; line charts show trends over time; pie charts show parts of a whole. Mean, median and mode summarise a dataset.",
        examples: [
          {
            id: "ex-1",
            title: "Find the mean",
            problem: "Find the mean of 4, 6, 8, 10.",
            solution: "Sum = 28; count = 4; mean = 28 ÷ 4 = 7.",
          },
          {
            id: "ex-2",
            title: "Best chart",
            problem:
              "You want to show the share of total marks scored by 4 subjects. Which chart is best?",
            solution: "A pie chart — each slice shows a fraction of the total.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Find the mean of 5, 7, 9.",
            answer: "7",
            explanation: "(5 + 7 + 9) ÷ 3 = 21 ÷ 3 = 7.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which chart is best for trend over time?",
            options: ["Bar chart", "Pie chart", "Line chart", "Pictograph"],
            answerIndex: 2,
            explanation: "Line charts show how a value changes over time.",
          },
          {
            id: "q3",
            type: "short",
            prompt:
              "What is the mode of 3, 5, 5, 7, 9, 5, 2?",
            answer: "5",
            explanation: "5 appears most often.",
          },
        ],
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
        intro:
          "AI learns patterns from data. If the data only represents one group of people, the AI will work poorly for everyone else. This is called bias, and avoiding it is part of using AI responsibly.",
        examples: [
          {
            id: "ex-1",
            title: "Spot the bias",
            problem:
              "A face-recognition AI is trained only on photos of adults. Why might it work poorly on children?",
            solution:
              "Children's faces look different from adults' and were never shown to the model, so it cannot recognise them well.",
          },
          {
            id: "ex-2",
            title: "Fix the bias",
            problem: "How could we improve the model in Example 1?",
            solution:
              "Add many photos of children of different ages, lighting and backgrounds to the training data, then retrain.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "tf",
            prompt:
              "True or False: An AI is fair if its training data represents all the people who will use it.",
            answer: true,
            explanation:
              "Representative data is one of the most important steps toward fairness.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "A medical AI works well for adults but poorly for teenagers. Most likely cause:",
            options: [
              "Too many doctors used it",
              "Training data had few teenage cases",
              "The colour of the screen",
              "It was used at night",
            ],
            answerIndex: 1,
            explanation:
              "Bias most often comes from underrepresented groups in the training data.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Once an AI is deployed, fairness no longer matters.",
            answer: false,
            explanation:
              "Fairness must be monitored throughout the AI's lifetime as data and people change.",
          },
        ],
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
        intro:
          "The square of a number n is n × n; the cube is n × n × n. The square root undoes squaring, and the cube root undoes cubing. Numbers like 1, 4, 9, 16 are perfect squares; 1, 8, 27, 64 are perfect cubes.",
        examples: [
          {
            id: "ex-1",
            title: "Find the square root",
            problem: "What is the square root of 81?",
            solution: "9 × 9 = 81, so √81 = 9.",
          },
          {
            id: "ex-2",
            title: "Find the cube",
            problem: "What is 4³?",
            solution: "4 × 4 × 4 = 64.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is √144?",
            answer: "12",
            explanation: "12 × 12 = 144.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which is a perfect square?",
            options: ["50", "60", "64", "72"],
            answerIndex: 2,
            explanation: "64 = 8 × 8.",
          },
          {
            id: "q3",
            type: "short",
            prompt: "What is the cube root of 27?",
            answer: "3",
            explanation: "3 × 3 × 3 = 27.",
          },
        ],
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
        intro:
          "Exponents are a short way to write repeated multiplication. Laws: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1.",
        examples: [
          {
            id: "ex-1",
            title: "Multiply powers",
            problem: "Simplify 2³ × 2⁴.",
            solution: "Add exponents: 2³⁺⁴ = 2⁷ = 128.",
          },
          {
            id: "ex-2",
            title: "Standard form",
            problem: "Write 3000 in standard form.",
            solution: "3000 = 3 × 10³.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "What is 2⁵?",
            answer: "32",
            explanation: "2 × 2 × 2 × 2 × 2 = 32.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Simplify 5⁶ ÷ 5².",
            options: ["5²", "5³", "5⁴", "5⁵"],
            answerIndex: 2,
            explanation: "Subtract exponents: 5⁶⁻² = 5⁴.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: Any non-zero number raised to the power 0 is 1.",
            answer: true,
            explanation: "Yes — a⁰ = 1 for any a ≠ 0.",
          },
        ],
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
        intro:
          "Different cultures invented different number systems. Roman numerals (I, V, X, L, C, D, M) are non-positional. Our everyday system is positional with base 10 — the value of a digit depends on its place.",
        examples: [
          {
            id: "ex-1",
            title: "Roman to decimal",
            problem: "What number is XIV?",
            solution: "X is 10, IV is 4 (5 − 1). XIV = 14.",
          },
          {
            id: "ex-2",
            title: "Place value",
            problem: "In the number 4567, what is the place value of the digit 5?",
            solution: "5 is in the hundreds place: 5 × 100 = 500.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Convert XL to a decimal number.",
            answer: "40",
            explanation: "X (10) before L (50) means 50 − 10 = 40.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which of these systems is positional?",
            options: [
              "Roman numerals",
              "Egyptian hieroglyphic numbers",
              "Hindu-Arabic decimal system",
              "Tally marks",
            ],
            answerIndex: 2,
            explanation:
              "Our common decimal (Hindu-Arabic) system is positional — place determines value.",
          },
          {
            id: "q3",
            type: "tf",
            prompt: "True or False: The digit 0 was a major invention in number systems.",
            answer: true,
            explanation:
              "Yes — zero allowed positional notation and made arithmetic far easier.",
          },
        ],
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
        intro:
          "A quadrilateral has 4 sides. The 4 interior angles always sum to 360°. Common kinds include square, rectangle, rhombus, parallelogram and trapezium.",
        examples: [
          {
            id: "ex-1",
            title: "Find the missing angle",
            problem: "Three angles of a quadrilateral are 90°, 100° and 80°. What is the fourth?",
            solution: "360 − (90 + 100 + 80) = 90°.",
          },
          {
            id: "ex-2",
            title: "Classify it",
            problem:
              "A quadrilateral has both pairs of opposite sides parallel and all angles 90°. What is it?",
            solution: "A rectangle.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt:
              "Three angles of a quadrilateral are 70°, 110° and 60°. What is the fourth?",
            answer: "120",
            explanation: "360 − (70 + 110 + 60) = 120°.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Which quadrilateral has all four sides equal?",
            options: ["Trapezium", "Rectangle", "Rhombus", "Kite"],
            answerIndex: 2,
            explanation: "A rhombus has all four sides of equal length.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: A square is also a rectangle.",
            answer: true,
            explanation: "A square has all the properties of a rectangle (and more).",
          },
        ],
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
        intro:
          "A conjecture is a guess based on patterns we see. We test it with examples; one counter-example is enough to disprove it.",
        examples: [
          {
            id: "ex-1",
            title: "Conjecture and test",
            problem:
              "Conjecture: 'The sum of two even numbers is always even.' Test with 6 and 10.",
            solution: "6 + 10 = 16, which is even. Try more examples — they all work, so the conjecture seems true.",
          },
          {
            id: "ex-2",
            title: "Find a counter-example",
            problem:
              "Conjecture: 'Every odd number greater than 1 is prime.' Find a counter-example.",
            solution:
              "9 is odd and greater than 1, but 9 = 3 × 3, so it is not prime. The conjecture is false.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "tf",
            prompt: "True or False: One counter-example is enough to disprove a conjecture.",
            answer: true,
            explanation: "Yes — a single counter-example breaks a 'for all' claim.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which is a counter-example to 'all multiples of 3 are even'?",
            options: ["6", "12", "9", "30"],
            answerIndex: 2,
            explanation: "9 is a multiple of 3 but is odd, disproving the claim.",
          },
          {
            id: "q3",
            type: "short",
            prompt:
              "What is the smallest prime number greater than 20?",
            answer: "23",
            explanation: "21 = 3×7, 22 = 2×11, 23 is prime.",
          },
        ],
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
        intro:
          "The distributive property: a × (b + c) = a × b + a × c. We can use it to break tricky multiplications into easier pieces.",
        examples: [
          {
            id: "ex-1",
            title: "Mental shortcut",
            problem: "Compute 7 × 102 quickly.",
            solution: "7 × (100 + 2) = 700 + 14 = 714.",
          },
          {
            id: "ex-2",
            title: "Algebra use",
            problem: "Expand 3(x + 4).",
            solution: "3 × x + 3 × 4 = 3x + 12.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "Compute 6 × 99 using the distributive property.",
            answer: "594",
            explanation: "6 × (100 − 1) = 600 − 6 = 594.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt: "Expand 5(2x + 3).",
            options: ["10x + 15", "5x + 15", "10x + 3", "7x + 15"],
            answerIndex: 0,
            explanation: "5 × 2x + 5 × 3 = 10x + 15.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: a × (b + c) is always equal to a × b + a × c.",
            answer: true,
            explanation: "Yes — that is the distributive property.",
          },
        ],
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
        intro:
          "A ratio compares two quantities (like 2:3). A proportion is two equal ratios. In direct proportion, both quantities grow together; in inverse proportion, one grows as the other shrinks.",
        examples: [
          {
            id: "ex-1",
            title: "Direct proportion",
            problem:
              "If 4 pens cost ₹60, what do 7 pens cost at the same rate?",
            solution: "Cost per pen = 60 ÷ 4 = ₹15. So 7 pens cost 7 × 15 = ₹105.",
          },
          {
            id: "ex-2",
            title: "Inverse proportion",
            problem:
              "If 5 workers take 12 days to finish a job, how long for 10 workers (same speed)?",
            solution:
              "Doubling workers halves the time: 12 ÷ 2 = 6 days.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "short",
            prompt: "If 3 books cost ₹120, what do 5 books cost?",
            answer: "200",
            explanation: "Per book = 40; 5 × 40 = 200.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "8 taps fill a tank in 6 hours. How long for 4 taps at the same rate?",
            options: ["3 h", "6 h", "12 h", "16 h"],
            answerIndex: 2,
            explanation: "Halving the taps doubles the time: 12 hours.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: In a direct proportion, doubling one quantity doubles the other.",
            answer: true,
            explanation: "Yes — that is the meaning of direct proportion.",
          },
        ],
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
        intro:
          "AI systems usually do four things: analyse data, recognise patterns, learn from experience, and make predictions or decisions. We meet AI in maps, search, photos, voice assistants and many other apps.",
        examples: [
          {
            id: "ex-1",
            title: "What is AI doing?",
            problem:
              "When a music app suggests a new song you might like, which AI step is it doing?",
            solution:
              "It is making a prediction based on patterns in what you (and similar users) have listened to.",
          },
          {
            id: "ex-2",
            title: "Daily-life AI",
            problem: "Name two AI features in a smartphone.",
            solution:
              "Examples: face unlock, voice assistant, autocorrect, photo search, predictive text, smart camera modes.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "An AI app translates spoken words from English to Hindi. Which AI step is most prominent?",
            options: [
              "Building hardware",
              "Pattern recognition in language",
              "Drawing pictures",
              "Counting people",
            ],
            answerIndex: 1,
            explanation:
              "Translation depends on recognising language patterns and producing equivalent ones in another language.",
          },
          {
            id: "q2",
            type: "tf",
            prompt:
              "True or False: A maps app suggesting a faster route is an example of AI making a prediction.",
            answer: true,
            explanation:
              "Yes — it predicts travel time using current and past traffic data.",
          },
          {
            id: "q3",
            type: "short",
            prompt:
              "What do we call the data that an AI uses to learn? (one word)",
            answer: "training",
            explanation: "Data used to teach the model is called training data.",
          },
        ],
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
        intro:
          "An AI is only as good as its data. Data should be accurate, complete and representative of all the groups who will use the system. Otherwise the AI may give bad or unfair results.",
        examples: [
          {
            id: "ex-1",
            title: "Spot the issue",
            problem:
              "An AI for selecting school cricket captains is trained only on past men's-team data. Why is this a problem if girls' teams use it too?",
            solution:
              "The data does not represent girls' play, so the AI's choices may be unfair to them.",
          },
          {
            id: "ex-2",
            title: "Improve the data",
            problem: "What could improve the AI from Example 1?",
            solution:
              "Train it on a balanced dataset that includes both boys' and girls' teams, plus diverse playing styles.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "tf",
            prompt:
              "True or False: A small, one-sided dataset is likely to make an AI unfair.",
            answer: true,
            explanation: "Yes — narrow data leads to narrow learning.",
          },
          {
            id: "q2",
            type: "mcq",
            prompt:
              "Which is the BEST way to make an AI fairer?",
            options: [
              "Use less data",
              "Use more representative data and check outcomes for all groups",
              "Hide the AI's predictions",
              "Stop using AI altogether",
            ],
            answerIndex: 1,
            explanation:
              "Better data + ongoing checks across groups is the standard recipe for fairness.",
          },
          {
            id: "q3",
            type: "tf",
            prompt:
              "True or False: Fairness only matters before an AI is deployed.",
            answer: false,
            explanation:
              "Fairness must be monitored continually after deployment too.",
          },
        ],
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
        intro:
          "Responsible AI follows principles such as fairness, transparency, privacy, accountability and human oversight. Anyone building or using AI should ask: who benefits, who could be harmed, and how can we keep humans in the loop?",
        examples: [
          {
            id: "ex-1",
            title: "Privacy first",
            problem:
              "An app records every voice command for marketing. Is this likely to respect privacy?",
            solution:
              "No — recording personal data without clear consent and a need is a privacy concern.",
          },
          {
            id: "ex-2",
            title: "Human in the loop",
            problem:
              "Should an AI alone decide whether a student passes or fails?",
            solution:
              "No — important decisions about people should keep a human reviewer in the loop.",
          },
        ],
        exercises: [
          {
            id: "q1",
            type: "mcq",
            prompt:
              "Which of these is NOT a principle of responsible AI?",
            options: ["Fairness", "Transparency", "Maximum profit", "Privacy"],
            answerIndex: 2,
            explanation:
              "'Maximum profit' is not an ethics principle. Responsible AI focuses on fairness, transparency, privacy, accountability and oversight.",
          },
          {
            id: "q2",
            type: "tf",
            prompt:
              "True or False: Telling users that an AI is making decisions about them is part of being transparent.",
            answer: true,
            explanation:
              "Yes — transparency means being open about what the AI is doing.",
          },
          {
            id: "q3",
            type: "short",
            prompt:
              "What is the principle of keeping a person involved in important AI decisions called? (3 words)",
            answer: "human in the loop",
            explanation:
              "Human-in-the-loop means a person reviews or approves the AI's decision.",
          },
        ],
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
