import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import type { Tier, QuestionQuery, ExplanationData, SimplifiedExplanation } from "@/types";
import { getExplanation, getSimplifiedExplanation } from "@/data/mockCurriculum";
import Header from "@/components/Header";
import HomeScreen from "@/components/HomeScreen";
import AnswerScreen from "@/components/AnswerScreen";
import PracticeModal from "@/components/PracticeModal";

const MAX_FREE = 30;

export default function App() {
  const [tier, setTier] = useState<Tier>("free");
  const [questionsRemaining, setQuestionsRemaining] = useState(MAX_FREE);
  const [activeScreen, setActiveScreen] = useState<"home" | "answer">("home");
  const [currentQuery, setCurrentQuery] = useState<QuestionQuery | null>(null);
  const [currentExplanation, setCurrentExplanation] = useState<ExplanationData | null>(null);
  const [currentSimplified, setCurrentSimplified] = useState<SimplifiedExplanation | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);

  const isDisabled = tier === "free" && questionsRemaining <= 0;

  const handleExplain = (query: QuestionQuery) => {
    if (isDisabled) {
      toast.error("You've used all free questions. Upgrade to Premium!");
      return;
    }
    if (tier === "free") {
      setQuestionsRemaining((prev) => prev - 1);
    }
    setCurrentQuery(query);
    const explanation = getExplanation(query.subject, query.text, query.tone);
    setCurrentExplanation(explanation);
    setCurrentSimplified(null);
    setActiveScreen("answer");
    toast.success("Explanation ready!", { description: query.text.slice(0, 40) });
  };

  const handleExplainSimpler = () => {
    if (!currentQuery) return;
    const simplified = getSimplifiedExplanation(currentQuery.subject, currentQuery.text);
    setCurrentSimplified(simplified);
  };

  const handlePractice = () => {
    if (tier === "free") {
      toast("Practice Mode is a Premium feature", {
        description: "Upgrade to unlock interactive quizzes with AI feedback.",
        action: { label: "Upgrade", onClick: () => setTier("premium") },
      });
      return;
    }
    setShowPractice(true);
  };

  const handleBack = () => {
    setActiveScreen("home");
    setCurrentExplanation(null);
    setCurrentSimplified(null);
  };

  const handleTierChange = (t: Tier) => {
    setTier(t);
    if (t === "premium") {
      toast.success("Premium activated!", { description: "Unlimited questions and Practice Mode unlocked." });
    } else {
      setQuestionsRemaining(MAX_FREE);
      toast("Switched to Free tier", { description: `${MAX_FREE} questions available.` });
    }
  };

  const handleUpgrade = () => {
    setTier("premium");
    toast.success("Welcome to Premium!", { description: "All features unlocked instantly." });
  };

  return (
    <div className="min-h-[100dvh] bg-zinc-50">
      <Toaster position="top-right" richColors />
      <Header
        tier={tier}
        questionsRemaining={questionsRemaining}
        onTierChange={handleTierChange}
        onUpgrade={handleUpgrade}
      />

      <main className="pt-6 pb-12">
        <AnimatePresence mode="wait">
          {activeScreen === "home" && (
            <HomeScreen key="home" onExplain={handleExplain} disabled={isDisabled} />
          )}
          {activeScreen === "answer" && currentExplanation && currentQuery && (
            <AnswerScreen
              key="answer"
              explanation={currentExplanation}
              simplified={currentSimplified}
              subject={currentQuery.subject}
              onBack={handleBack}
              onExplainSimpler={handleExplainSimpler}
              onPractice={handlePractice}
              practiceLocked={tier === "free"}
            />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showPractice && currentQuery && (
          <PracticeModal
            subject={currentQuery.subject}
            query={currentQuery.text}
            streak={practiceStreak}
            onStreakChange={setPracticeStreak}
            onClose={() => setShowPractice(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
