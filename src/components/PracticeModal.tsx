import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Check, RotateCcw, Star, ChevronRight } from "lucide-react";
import type { PracticeChallenge, PracticeFeedback, Subject } from "@/types";
import { getPracticeQuestions, evaluateAnswer } from "@/data/mockCurriculum";

interface PracticeModalProps {
  subject: Subject;
  query: string;
  streak: number;
  onStreakChange: (s: number) => void;
  onClose: () => void;
}

export default function PracticeModal({ subject, query, streak, onStreakChange, onClose }: PracticeModalProps) {
  const [questions] = useState<PracticeChallenge[]>(() => getPracticeQuestions(subject, query));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<PracticeFeedback | null>(null);
  const [answered, setAnswered] = useState(false);

  const challenge = questions[currentIdx % questions.length];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    const fb = evaluateAnswer(challenge, idx);
    setFeedback(fb);
    setAnswered(true);
    onStreakChange(fb.isCorrect ? streak + 1 : 0);
  };

  const handleNext = () => {
    setAnswered(false);
    setSelected(null);
    setFeedback(null);
    setCurrentIdx((i) => i + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Practice Mode</h3>
              <p className="text-[10px] text-zinc-400">{subject} &middot; {query.slice(0, 30)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-700">{streak}</span>
              </div>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 transition-all">
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-4">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i < currentIdx ? "bg-indigo-500" : i === currentIdx ? "bg-indigo-300" : "bg-zinc-100"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm font-medium text-zinc-900 mb-4">{challenge.question}</p>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {challenge.options.map((opt, idx) => {
                let style = "border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50";
                if (answered) {
                  if (idx === challenge.correctIndex) style = "border-emerald-300 bg-emerald-50";
                  else if (idx === selected && !feedback?.isCorrect) style = "border-rose-300 bg-rose-50";
                  else style = "border-zinc-100 opacity-50";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`w-full text-left px-4 py-3 border rounded-xl text-sm transition-all active:scale-[0.98] ${style}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {answered && feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={`p-4 rounded-xl mb-4 ${feedback.isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback.isCorrect ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <X className="w-4 h-4 text-rose-600" />
                  )}
                  <span className={`text-sm font-semibold ${feedback.isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                    {feedback.message}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mb-2">{feedback.detailedSolution}</p>
                <p className="text-xs text-zinc-500 italic">{feedback.tip}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Try Another Question
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
