import type { Subject, ToneLevel, ExplanationData, SimplifiedExplanation, PracticeChallenge, PracticeFeedback } from "@/types";

interface TopicEntry {
  keywords: string[];
  explanation: ExplanationData;
  simplified: SimplifiedExplanation;
  practice: PracticeChallenge[];
}

const topics: Record<Subject, TopicEntry[]> = {
  Math: [
    {
      keywords: ["pythagorean", "theorem", "triangle", "hypotenuse"],
      explanation: {
        title: "Pythagorean Theorem",
        simpleExplanation: "In any right triangle, the square of the longest side (hypotenuse) equals the sum of the squares of the other two sides. Formula: a² + b² = c²",
        keyPoints: ["Only works for right triangles (90° angle)", "c is always the hypotenuse (longest side)", "You can rearrange to find any missing side", "Common triples: 3-4-5, 5-12-13, 8-15-17"],
        example: "A ladder leans against a wall. Base is 3 feet from wall, touches 4 feet up. How long? 3² + 4² = 9 + 16 = 25 → c = √25 = 5 feet",
        analogy: "Think of a map: if you walk 3 blocks east and 4 blocks north, the straight-line shortcut back is always 5 blocks.",
        takeaways: ["a² + b² = c² is the golden formula", "Always identify the right angle first", "The hypotenuse is opposite the 90° angle"],
        formula: "a² + b² = c²",
      },
      simplified: {
        title: "Pythagorean Theorem (Super Simple)",
        explanation: "The two short sides squared and added together equal the long side squared. That's it!",
        analogy: "Like checking if your TV screen is rectangular: measure width and height, the diagonal should match.",
        example: "3² + 4² = 9 + 16 = 25 = 5². A 3-4-5 triangle is a perfect right triangle.",
      },
      practice: [
        { question: "A right triangle has legs of 6 and 8. What is the hypotenuse?", options: ["10", "12", "14", "48"], correctIndex: 0, explanation: "6² + 8² = 36 + 64 = 100 → √100 = 10", difficulty: "easy" },
        { question: "If the hypotenuse is 13 and one leg is 5, what is the other leg?", options: ["8", "12", "10", "18"], correctIndex: 1, explanation: "169 - 25 = 144 → √144 = 12", difficulty: "medium" },
      ],
    },
    {
      keywords: ["quadratic", "equation", "parabola", "factoring"],
      explanation: {
        title: "Quadratic Equations",
        simpleExplanation: "A quadratic equation has the form ax² + bx + c = 0. It creates a U-shaped curve and can have 0, 1, or 2 solutions found using the quadratic formula.",
        keyPoints: ["Highest power of x is 2", "Formula: x = (-b ± √(b²-4ac)) / 2a", "Discriminant (b²-4ac) tells you how many solutions", "If > 0: two solutions, = 0: one, < 0: none"],
        example: "Solve x² - 5x + 6 = 0. Factor: (x-2)(x-3) = 0, so x = 2 or x = 3.",
        analogy: "Like throwing a ball upward. The path is a parabola. The equation tells you when it hits the ground.",
        takeaways: ["Always set equation to = 0 first", "Try factoring before the formula", "a > 0 opens upward, a < 0 opens downward"],
        formula: "x = (-b ± √(b² - 4ac)) / 2a",
      },
      simplified: {
        title: "Quadratic Equations (Super Simple)",
        explanation: "It's an equation where x is multiplied by itself (x²). You're finding where the U-curve touches the bottom line.",
        analogy: "Like finding the two moments when a thrown ball is at exactly your eye level.",
        example: "x² - 4 = 0 means x·x = 4, so x = 2 or x = -2.",
      },
      practice: [
        { question: "What are the solutions to x² - 9 = 0?", options: ["x = 3 and x = -3", "x = 9", "x = 0", "x = 4.5"], correctIndex: 0, explanation: "x² = 9, so x = ±√9 = ±3", difficulty: "easy" },
        { question: "What is the discriminant of 2x² + 3x + 1 = 0?", options: ["1", "9", "17", "-1"], correctIndex: 0, explanation: "b² - 4ac = 9 - 8 = 1", difficulty: "medium" },
      ],
    },
  ],
  Science: [
    {
      keywords: ["photosynthesis", "plant", "chlorophyll", "sunlight"],
      explanation: {
        title: "Photosynthesis",
        simpleExplanation: "Plants convert sunlight, water, and CO₂ into glucose (sugar) and oxygen. It happens in chloroplasts using the green pigment chlorophyll.",
        keyPoints: ["Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", "Two stages: light-dependent reactions and Calvin cycle", "Chlorophyll absorbs red and blue light, reflects green", "Oxygen is a byproduct - we breathe what plants exhale"],
        example: "A single large tree produces enough oxygen for 2-4 people per day. Leaves are solar panels capturing photons and building sugar.",
        analogy: "A leaf is a tiny kitchen. Sunlight is the stove, water and CO₂ are ingredients, glucose is the meal, and oxygen is the steam.",
        takeaways: ["Plants are solar-powered food factories", "Without photosynthesis, no oxygen = no animal life", "Light reactions make energy carriers"],
        formula: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
      },
      simplified: {
        title: "Photosynthesis (Super Simple)",
        explanation: "Plants eat sunlight! They take water and CO₂, use sun energy, make food (sugar), and give us fresh oxygen.",
        analogy: "Like a tiny chef cooking using sunshine instead of a stove, and the kitchen smells like fresh oxygen.",
        example: "Put a leaf in water under a lamp - you'll see tiny bubbles (oxygen) coming out!",
      },
      practice: [
        { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correctIndex: 1, explanation: "Plants absorb CO₂ and release O₂", difficulty: "easy" },
        { question: "Where does photosynthesis occur in a plant cell?", options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"], correctIndex: 2, explanation: "Chloroplasts contain chlorophyll which captures light energy", difficulty: "easy" },
      ],
    },
    {
      keywords: ["newton", "law", "motion", "force", "acceleration"],
      explanation: {
        title: "Newton's Three Laws of Motion",
        simpleExplanation: "Newton's laws describe how forces affect motion: (1) Objects resist changes (inertia), (2) Force = mass × acceleration, (3) Every action has equal opposite reaction.",
        keyPoints: ["1st Law: objects stay still or keep moving unless forced", "2nd Law: F=ma explains how much things accelerate", "3rd Law: forces always come in pairs", "These laws explain almost all everyday motion"],
        example: "Rocket launch: pushes gas down (action), gas pushes rocket up (reaction). Acceleration follows F=ma. Once in space, it coasts (1st law).",
        analogy: "1st: you lurch when a bus brakes. 2nd: pushing a cart is easy, pushing a car is not. 3rd: jumping off a boat pushes it backward.",
        takeaways: ["Inertia is why seatbelts exist", "F=ma lets you calculate motion", "Action-reaction pairs act on DIFFERENT objects"],
        formula: "F = ma",
      },
      simplified: {
        title: "Newton's Laws (Super Simple)",
        explanation: "Things keep doing what they're doing unless pushed. Pushing harder = faster. When you push something, it pushes back.",
        analogy: "Like a stubborn friend who won't move until nudged, and bumps back when you do.",
        example: "Soccer ball sits still until kicked (1st). Kick harder = goes faster (2nd). Your foot hurts because ball pushed back (3rd).",
      },
      practice: [
        { question: "A 10kg object accelerates at 2 m/s². What force?", options: ["5 N", "12 N", "20 N", "200 N"], correctIndex: 2, explanation: "F = ma = 10 × 2 = 20 N", difficulty: "easy" },
        { question: "Which law explains why you lurch when a car stops?", options: ["1st Law", "2nd Law", "3rd Law", "None"], correctIndex: 0, explanation: "Inertia (1st law): your body wants to keep moving", difficulty: "easy" },
      ],
    },
  ],
  English: [
    {
      keywords: ["metaphor", "simile", "comparison", "figurative"],
      explanation: {
        title: "Metaphor vs. Simile",
        simpleExplanation: "Both compare two things, but a simile uses 'like' or 'as' while a metaphor says one thing IS another. Similes compare; metaphors identify.",
        keyPoints: ["Simile: 'Her smile was LIKE sunshine'", "Metaphor: 'Her smile WAS sunshine'", "Metaphors are stronger (create identity)", "Both are figurative language"],
        example: "Simile: 'The classroom was as quiet as a library.' Metaphor: 'The classroom was a tomb of silence.' The metaphor hits harder.",
        analogy: "A simile says 'this photo looks like the real thing.' A metaphor says 'this photo IS the real thing.'",
        takeaways: ["Spot 'like' or 'as' = simile", "No comparison word, direct statement = metaphor", "Extended metaphors run through entire poems"],
      },
      simplified: {
        title: "Metaphor vs. Simile (Super Simple)",
        explanation: "A simile compares using 'like' or 'as'. A metaphor says something IS the other thing. Both make writing colorful.",
        analogy: "Simile: 'You run like a cheetah.' Metaphor: 'You ARE a cheetah on the track.'",
        example: `"Life is like a box of chocolates" = simile. "All the world's a stage" = metaphor.`,
      },
      practice: [
        { question: "Which is a metaphor?", options: ["The fog was a blanket over the city", "The fog was like a blanket", "Both are similes", "Neither"], correctIndex: 0, explanation: "'Was a blanket' = metaphor (says it IS). 'Was like a blanket' = simile.", difficulty: "easy" },
        { question: "What makes 'Time is a thief' a metaphor?", options: ["It uses 'like'", "It says time IS a thief directly", "It rhymes", "It is a question"], correctIndex: 1, explanation: "Directly states time = thief without 'like' or 'as'", difficulty: "easy" },
      ],
    },
    {
      keywords: ["thesis", "essay", "argument", "structure"],
      explanation: {
        title: "Writing a Strong Thesis Statement",
        simpleExplanation: "A thesis is ONE sentence stating exactly what your essay argues and why. It appears at the end of your intro and guides every paragraph.",
        keyPoints: ["Must be arguable (not just a fact)", "Must be specific (not vague)", "Must preview your main points", "Formula: [Topic] + [Position] + [Reasons]"],
        example: "Weak: 'Social media affects teenagers.' Strong: 'Social media damages teen mental health by promoting unrealistic comparisons, enabling cyberbullying, and disrupting sleep.'",
        analogy: "A thesis is like a GPS destination. Without it, your essay drives around randomly. With it, every paragraph turns toward the address.",
        takeaways: ["One sentence, end of intro", "Make someone able to disagree with it", "Revise your thesis AFTER writing the essay"],
      },
      simplified: {
        title: "Thesis Statement (Super Simple)",
        explanation: "It's the one sentence saying what you think and why. Everything in your essay proves that one sentence.",
        analogy: "It's the title of your movie, but in sentence form.",
        example: "'Dogs make better pets than cats because they are more loyal, trainable, and social.'",
      },
      practice: [
        { question: "Which is a stronger thesis?", options: ["Books are good.", "Reading fiction builds empathy because it lets you experience other perspectives.", "This essay is about books.", "I like reading."], correctIndex: 1, explanation: "It's specific, arguable, and gives a reason", difficulty: "easy" },
      ],
    },
  ],
  Other: [
    {
      keywords: ["supply", "demand", "economics", "market", "price"],
      explanation: {
        title: "Supply and Demand",
        simpleExplanation: "Supply is how much producers offer; demand is how much buyers want. Price is where these forces meet (equilibrium).",
        keyPoints: ["Law of Demand: higher price → fewer buyers", "Law of Supply: higher price → more sellers", "Equilibrium: where curves meet", "External shocks shift the curves"],
        example: "Concert tickets: 10,000 seats (fixed supply). If 50,000 want tickets, prices skyrocket. If only 2,000 want them, prices drop.",
        analogy: "Think of a seesaw. Buyers on one side, sellers on the other. Price is where it balances.",
        takeaways: ["Prices are signals, not arbitrary", "Scarcity drives prices up", "Markets self-correct over time"],
      },
      simplified: {
        title: "Supply and Demand (Super Simple)",
        explanation: "When everyone wants something and there's not enough, price goes up. When there's too much and nobody wants it, price goes down.",
        analogy: "Like lemonade on a hot day: if every kid wants one but you only made 5 cups, you can charge more.",
        example: "Umbrellas cost $2 normally but $20 when it suddenly starts raining.",
      },
      practice: [
        { question: "If demand increases but supply stays the same, what happens to price?", options: ["Decreases", "Increases", "Stays the same", "Cannot determine"], correctIndex: 1, explanation: "More buyers competing for same amount = higher prices", difficulty: "easy" },
      ],
    },
    {
      keywords: ["loop", "programming", "code", "iteration"],
      explanation: {
        title: "Loops in Programming",
        simpleExplanation: "A loop repeats code multiple times. 'for' loops run a known number of times; 'while' loops run until a condition becomes false.",
        keyPoints: ["for loop: known repeat count", "while loop: repeat until condition changes", "Avoid infinite loops", "Each pass is an 'iteration'"],
        example: "for (let i = 1; i <= 5; i++) { print(i) } → outputs 1, 2, 3, 4, 5 without writing print five times.",
        analogy: "Like a washing machine: set a program (for) or keep spinning until clean (while). Repeats the same motion automatically.",
        takeaways: ["Loops = DRY code", "Always check your exit condition", "for = fixed count, while = condition-based"],
      },
      simplified: {
        title: "Loops (Super Simple)",
        explanation: "A loop is a computer saying 'do this again until I say stop.' It saves you from typing the same thing 100 times.",
        analogy: "Like clapping: repeat a set number of times (for) or until someone says stop (while).",
        example: "while (count < 3) { say('hello'); count++ } prints 'hello' three times.",
      },
      practice: [
        { question: "How many times does 'for (let i = 0; i < 5; i++)' loop?", options: ["4 times", "5 times", "6 times", "Infinite"], correctIndex: 1, explanation: "i goes 0,1,2,3,4 (stops before 5) = 5 iterations", difficulty: "easy" },
      ],
    },
  ],
};

function findTopic(subject: Subject, query: string): TopicEntry | null {
  const lower = query.toLowerCase();
  for (const topic of topics[subject]) {
    for (const kw of topic.keywords) {
      if (lower.includes(kw)) return topic;
    }
  }
  return null;
}

function generateFallback(subject: Subject, query: string, tone: ToneLevel): ExplanationData {
  const ctx: Record<Subject, string> = { Math: "Mathematical concept", Science: "Scientific principle", English: "Language concept", Other: "General knowledge topic" };
  const toneHint = tone === "eli10" ? "Use simple words and everyday examples." : tone === "visual" ? "Picture it as a flowchart building layer by layer." : "Focus on key definitions and practical applications.";
  return {
    title: query.length > 50 ? query.slice(0, 50) + "..." : query,
    simpleExplanation: `${ctx[subject]}: "${query}" is best understood by breaking it into core components. ${toneHint}`,
    keyPoints: ["Start with the fundamental definition", "Identify what problem it solves", "Connect it to prior knowledge", "Practice applying it in context"],
    example: `Consider "${query}" in real life. Think about where you encounter it daily and how understanding it helps you solve problems more efficiently.`,
    analogy: `Think of "${query}" like building with LEGO. Each piece connects to others, forming a complete structure that makes sense from every angle.`,
    takeaways: ["Understanding beats memorization", "Connect new ideas to what you know", "Teaching others is the best way to learn deeply"],
  };
}

export function getExplanation(subject: Subject, query: string, tone: ToneLevel): ExplanationData {
  const topic = findTopic(subject, query);
  if (topic) return topic.explanation;
  return generateFallback(subject, query, tone);
}

export function getSimplifiedExplanation(subject: Subject, query: string): SimplifiedExplanation {
  const topic = findTopic(subject, query);
  if (topic) return topic.simplified;
  return {
    title: `${query} (The Simplest Version)`,
    explanation: `The super simple version: "${query}" is just a pattern that helps you predict what happens next.`,
    analogy: "Like learning to ride a bike. At first it seems complex, but once you get the idea, it becomes natural.",
    example: `Every time you encounter "${query}", remember: it's the pattern explaining why things happen the way they do.`,
  };
}

export function getPracticeQuestions(subject: Subject, query: string): PracticeChallenge[] {
  const topic = findTopic(subject, query);
  if (topic) return topic.practice;
  return [
    { question: `Based on what you learned about "${query}", which approach best helps you remember it?`, options: ["Memorizing without understanding", "Connecting to real-world examples", "Reading once and moving on", "Ignoring it"], correctIndex: 1, explanation: "Connecting concepts to real-world examples creates stronger memory pathways.", difficulty: "easy" },
    { question: `What is the first step when tackling a new ${subject} concept?`, options: ["Jump to advanced problems", "Understand the basic definition", "Skip the basics", "Only watch videos"], correctIndex: 1, explanation: "Always start with the fundamental definition before applications.", difficulty: "easy" },
  ];
}

export function evaluateAnswer(challenge: PracticeChallenge, selectedIndex: number): PracticeFeedback {
  const isCorrect = selectedIndex === challenge.correctIndex;
  return {
    isCorrect,
    message: isCorrect ? "Nailed it! You clearly understand this concept." : "Not quite, but you're getting closer!",
    tip: isCorrect ? "Try a harder question to push further!" : "Focus on the key principle and work through it step by step.",
    detailedSolution: challenge.explanation,
  };
}

export const SUGGESTED_PROMPTS: Record<Subject, string[]> = {
  Math: ["Pythagorean Theorem", "Quadratic Equations", "What is calculus?", "Fractions explained"],
  Science: ["Photosynthesis in plants", "Newton's 3rd Law", "How do cells work?", "The water cycle"],
  English: ["Metaphor vs Simile", "How to write a thesis", "Parts of speech", "Active vs passive voice"],
  Other: ["Supply and demand", "What is a loop in programming?", "How does the stock market work?", "Critical thinking"],
};