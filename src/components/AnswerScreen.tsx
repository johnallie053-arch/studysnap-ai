import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Target, Volume2, Copy, Check, Lightbulb, BookOpen } from "lucide-react";
import type { ExplanationData, SimplifiedExplanation, Subject } from "@/types";

interface AnswerScreenProps {
  explanation: ExplanationData;
  simplified: SimplifiedExplanation | null;
  subject: Subject;
  onBack: () => void;
  onExplainSimpler: () => void;
  onPractice: () => void;
  practiceLocked: boolean;
}

export default function AnswerScreen({
  explanation,
  simplified,
  subject,
  onBack,
  onExplainSimpler,
  onPractice,
  practiceLocked,
}: AnswerScreenProps) {
  const [showSimpler, setShowSimpler] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = () => {
    const text = `${explanation.title}

${explanation.simpleExplanation}

Example: ${explanation.example}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${explanation.title}. ${explanation.simpleExplanation}. Example: ${explanation.example}`
    );
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis?.speak(utterance);
  };

  const handleExplainSimpler = () => {
    onExplainSimpler();
    setShowSimpler(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all active:scale-[0.97]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ask
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-zinc-100 transition-all"
            title="Copy explanation"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-500" />}
          </button>
          <button
            onClick={handleSpeak}
            className={`p-2 rounded-lg transition-all ${speaking ? "bg-indigo-100" : "hover:bg-zinc-100"}`}
            title="Read aloud"
          >
            <Volume2 className={`w-4 h-4 ${speaking ? "text-indigo-600" : "text-zinc-500"}`} />
          </button>
        </div>
      </div>

      {/* Main Explanation Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden mb-4"
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Simple Explanation</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">{explanation.title}</h2>
          <p className="text-zinc-700 leading-relaxed">{explanation.simpleExplanation}</p>
        </div>

        {/* Key Points */}
        <div className="px-5 pb-4">
          <div className="bg-zinc-50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Key Points</h3>
            <ul className="space-y-1.5">
              {explanation.keyPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-zinc-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Formula if present */}
        {explanation.formula && (
          <div className="px-5 pb-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <span className="text-xs text-indigo-500 font-medium">Formula</span>
              <p className="text-lg font-mono font-bold text-indigo-900 mt-1">{explanation.formula}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Example Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Real-World Example</span>
        </div>
        <p className="text-zinc-700 leading-relaxed text-sm">{explanation.example}</p>
      </motion.div>

      {/* Analogy Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">Think of it like...</span>
        </div>
        <p className="text-amber-900 text-sm leading-relaxed">{explanation.analogy}</p>
      </motion.div>

      {/* Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 mb-6"
      >
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Key Takeaways</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {explanation.takeaways.map((t, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-zinc-50">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-xs text-zinc-700">{t}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Simplified Version */}
      <AnimatePresence>
        {showSimpler && simplified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-semibold text-violet-700">Even Simpler Version</span>
              </div>
              <p className="text-zinc-800 text-sm leading-relaxed mb-3">{simplified.explanation}</p>
              <div className="bg-white/60 rounded-xl p-3 mb-3">
                <p className="text-xs text-zinc-600 italic">{simplified.analogy}</p>
              </div>
              <p className="text-sm text-zinc-700">{simplified.example}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {!showSimpler && (
          <button
            onClick={handleExplainSimpler}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-violet-500" />
            Explain Simpler
          </button>
        )}
        <button
          onClick={onPractice}
          disabled={practiceLocked}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Target className="w-4 h-4" />
          {practiceLocked ? "Practice (Premium)" : "Practice Me "}
        </button>
      </div>
    </motion.div>
  );
}
