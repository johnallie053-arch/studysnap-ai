export type Subject = "Math" | "Science" | "English" | "Other";

export type Tier = "free" | "premium";

export type ToneLevel = "eli10" | "highschool" | "visual";

export interface QuestionQuery {
  text: string;
  subject: Subject;
  tone: ToneLevel;
}

export interface ExplanationData {
  title: string;
  simpleExplanation: string;
  keyPoints: string[];
  example: string;
  analogy: string;
  takeaways: string[];
  formula?: string;
}

export interface SimplifiedExplanation {
  title: string;
  explanation: string;
  analogy: string;
  example: string;
}

export interface PracticeChallenge {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface PracticeFeedback {
  isCorrect: boolean;
  message: string;
  tip: string;
  detailedSolution: string;
}

export interface AppState {
  tier: Tier;
  questionsRemaining: number;
  activeScreen: "home" | "answer";
  currentQuery: QuestionQuery | null;
  currentExplanation: ExplanationData | null;
  currentSimplified: SimplifiedExplanation | null;
  showPractice: boolean;
  showUpgrade: boolean;
  practiceStreak: number;
  history: QuestionQuery[];
}
