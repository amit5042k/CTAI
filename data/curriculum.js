// CTAI (Coding, Computational Thinking & Artificial Intelligence) Curriculum
// Mapped across Classes 3-8 for educational use.

export const curriculum = [
  {
    classLevel: 3,
    title: "Class 3 — Foundations of Computational Thinking",
    pillars: ["Computational Thinking", "Digital Citizenship", "AI Awareness"],
    description:
      "Introduces young learners to thinking in steps, identifying patterns, and recognising AI in everyday life through stories and unplugged activities.",
    units: [
      {
        id: "c3-u1",
        name: "What is a Computer?",
        outcomes: [
          "Identify input, output and processing devices",
          "Differentiate between hardware and software",
          "Use age-appropriate digital tools safely",
        ],
        activities: ["Label a computer diagram", "Match device to its job"],
      },
      {
        id: "c3-u2",
        name: "Thinking in Steps (Sequencing)",
        outcomes: [
          "Break a daily routine into ordered steps",
          "Follow and give a sequence of instructions",
        ],
        activities: ["Brushing teeth as an algorithm", "Robot-and-driver game"],
      },
      {
        id: "c3-u3",
        name: "Patterns Around Us",
        outcomes: [
          "Spot repeating patterns in shapes, sounds and nature",
          "Continue and create a pattern",
        ],
        activities: ["Bead pattern craft", "Clap-rhythm patterns"],
      },
      {
        id: "c3-u4",
        name: "Meet AI: Smart Helpers",
        outcomes: [
          "Recognise AI assistants (voice, recommendations)",
          "Discuss safe and polite use of AI helpers",
        ],
        activities: ["Story circle: 'My friend, the AI'", "Spot AI in the home"],
      },
    ],
  },
  {
    classLevel: 4,
    title: "Class 4 — Patterns, Loops & AI in Daily Life",
    pillars: ["Computational Thinking", "Coding (Unplugged)", "AI Literacy"],
    description:
      "Builds on sequencing with loops and decisions, and explores how AI learns from examples through fun classification games.",
    units: [
      {
        id: "c4-u1",
        name: "Loops — Doing Things Again",
        outcomes: [
          "Identify repetition in everyday tasks",
          "Use 'repeat n times' in unplugged activities",
        ],
        activities: ["Dance step loops", "Draw squares using repeat blocks"],
      },
      {
        id: "c4-u2",
        name: "Decisions (If-Then)",
        outcomes: [
          "Use conditional statements in plain language",
          "Map choices to outcomes",
        ],
        activities: ["If it rains, then carry an umbrella — flowcharts"],
      },
      {
        id: "c4-u3",
        name: "How AI Learns from Examples",
        outcomes: [
          "Understand 'training' through sorting games",
          "Identify supervised classification at a basic level",
        ],
        activities: ["Sorting fruits vs vegetables", "Teachable-machine demo"],
      },
      {
        id: "c4-u4",
        name: "Being Safe Online",
        outcomes: [
          "Know what personal information is",
          "Identify trusted adults and report unsafe content",
        ],
        activities: ["Safe/Unsafe sort cards"],
      },
    ],
  },
  {
    classLevel: 5,
    title: "Class 5 — Algorithms, Data & First Code",
    pillars: ["Algorithms", "Block Coding", "Data Literacy", "AI Ethics"],
    description:
      "Learners write their first block-based programs, read simple data, and discuss fairness in AI.",
    units: [
      {
        id: "c5-u1",
        name: "Algorithms & Flowcharts",
        outcomes: [
          "Draw flowcharts using start/process/decision/end",
          "Trace an algorithm step by step",
        ],
        activities: ["Flowchart for making a sandwich"],
      },
      {
        id: "c5-u2",
        name: "Block Coding with Scratch",
        outcomes: [
          "Create a sprite-based animation",
          "Use events, motion and looks blocks",
        ],
        activities: ["Cat chases mouse mini-game"],
      },
      {
        id: "c5-u3",
        name: "Data: Tally, Tables & Charts",
        outcomes: [
          "Collect and organise simple data",
          "Read bar charts and pictographs",
        ],
        activities: ["Favourite-fruit class survey"],
      },
      {
        id: "c5-u4",
        name: "Fairness in AI",
        outcomes: [
          "Spot bias in classroom examples",
          "Discuss why diverse data matters",
        ],
        activities: ["Image-set fairness discussion"],
      },
    ],
  },
  {
    classLevel: 6,
    title: "Class 6 — Building Projects with Scratch & Intro to AI",
    pillars: ["Block Coding", "Project Work", "AI Concepts"],
    description:
      "Students build small interactive projects, learn variables and lists, and explore how machines see and hear.",
    units: [
      {
        id: "c6-u1",
        name: "Variables, Inputs & Lists",
        outcomes: [
          "Use variables to store user input",
          "Maintain a list/score across runs",
        ],
        activities: ["Quiz game with score"],
      },
      {
        id: "c6-u2",
        name: "Decomposition & Project Planning",
        outcomes: [
          "Break a project into modules",
          "Use a simple Kanban (To-do / Doing / Done)",
        ],
        activities: ["Plan a 2-week mini-project"],
      },
      {
        id: "c6-u3",
        name: "How Machines See & Hear",
        outcomes: [
          "Explain image and speech recognition at a basic level",
          "Identify use cases (accessibility, search)",
        ],
        activities: ["Train a 3-class image model in Teachable Machine"],
      },
      {
        id: "c6-u4",
        name: "Digital Citizenship",
        outcomes: [
          "Practice respectful online behaviour",
          "Recognise misinformation and fake media",
        ],
        activities: ["Spot the deepfake — guided discussion"],
      },
    ],
  },
  {
    classLevel: 7,
    title: "Class 7 — Python Basics & Machine Learning Concepts",
    pillars: ["Text Coding (Python)", "Data Handling", "ML Concepts"],
    description:
      "Transitions students from blocks to text-based Python and introduces the ML lifecycle.",
    units: [
      {
        id: "c7-u1",
        name: "Python: Variables, Types, I/O",
        outcomes: [
          "Write programs with input(), print() and arithmetic",
          "Use strings, integers and floats",
        ],
        activities: ["Tip calculator", "Mad-libs generator"],
      },
      {
        id: "c7-u2",
        name: "Control Flow & Functions",
        outcomes: [
          "Use if/elif/else, while and for loops",
          "Define and call functions with parameters",
        ],
        activities: ["Number-guessing game", "Times-table function"],
      },
      {
        id: "c7-u3",
        name: "Data with Lists & CSV",
        outcomes: [
          "Read, filter and summarise list data",
          "Open and process a CSV in Python",
        ],
        activities: ["Top-5 list from a CSV of student marks"],
      },
      {
        id: "c7-u4",
        name: "ML Lifecycle: Data → Model → Predict",
        outcomes: [
          "Describe the stages of an ML project",
          "Distinguish classification vs regression",
        ],
        activities: ["Build & evaluate a Teachable-Machine image classifier"],
      },
    ],
  },
  {
    classLevel: 8,
    title: "Class 8 — Applied Coding, AI Projects & Ethics",
    pillars: ["Python Projects", "AI Applications", "Ethics & Society"],
    description:
      "Capstone-style class — students build end-to-end AI projects and reason about responsibility, privacy and societal impact.",
    units: [
      {
        id: "c8-u1",
        name: "Python: Dictionaries, Files & Modules",
        outcomes: [
          "Use dictionaries for keyed data",
          "Read/write files; import and use modules",
        ],
        activities: ["Build a contacts CLI app"],
      },
      {
        id: "c8-u2",
        name: "Intro to NumPy & Pandas (Optional)",
        outcomes: [
          "Load a dataset into a DataFrame",
          "Compute mean, median and groupby",
        ],
        activities: ["Analyse a school attendance CSV"],
      },
      {
        id: "c8-u3",
        name: "AI Project: Build, Test, Reflect",
        outcomes: [
          "Frame a problem and pick a suitable AI approach",
          "Train, evaluate and document a model",
        ],
        activities: ["Image classifier OR rule-based chatbot capstone"],
      },
      {
        id: "c8-u4",
        name: "Ethics, Privacy & Future of Work",
        outcomes: [
          "Identify privacy risks in AI systems",
          "Debate responsible AI use cases",
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
