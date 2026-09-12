import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, FlaskConical, BookOpen, Globe2, Sparkles, Send } from "lucide-react";
import type { Subject, ToneLevel, QuestionQuery } from "@/types";
import { SUGGESTED_PROMPTS } from "@/data/mockCurriculum";

interface HomeScreenProps {
  onExplain: (query: QuestionQuery) => void;
  disabled: boolean;
}

const SUBJECTS: { id: Subject; icon: typeof Calculator; color: string }[] = [
  { id: "Math", icon: Calculator, color: "from-blue-500 to-indigo-600" },
  { id: "Science", icon: FlaskConical, color: "from-emerald-500 to-teal-600" },
  { id: "English", icon: BookOpen, color: "from-rose-500 to-pink-600" },
  { id: "Other", icon: Globe2, color: "from-amber-500 to-orange-600" },
];

const TONES: { id: ToneLevel; label: string }[] = [
  { id: "eli10", label: "Explain like I'm 10" },
  { id: "highschool", label: "High School Simple" },
  { id: "visual", label: "Visual & Analogy-Rich" },
];

export default function HomeScreen({ onExplain, disabled }: HomeScreenProps) {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState<Subject>("Math");
  const [tone, setTone] = useState<ToneLevel>("highschool");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() || disabled || loading) return;
    setLoading(true);
    setTimeout(() => {
      onExplain({ text: text.trim(), subject, tone });
      setLoading(false);
    }, 1200);
  };

  const suggestions = SUGGESTED_PROMPTS[subject];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      {/* Hero Text */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight"
        >
          What are you stuck on?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 mt-2 text-sm md:text-base"
        >
          Pick a subject, type your question, and get an instant simple explanation.
        </motion.p>
      </div>

      {/* Subject Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {SUBJECTS.map((s) => {
          const Icon = s.icon;
          const active = subject === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.96] ${
                active
                  ? `bg-gradient-to-r ${s.color} text-white shadow-lg`
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {s.id}
            </button>
          );
        })}
      </div>

      {/* Input Card */}
      <motion.div
        layout
        className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden"
      >
        <div className="p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder={`Ask about ${subject.toLowerCase()}...`}
            className="w-full resize-none border-0 outline-none text-zinc-900 placeholder-zinc-400 text-base leading-relaxed min-h-[80px]"
            disabled={disabled}
          />
        </div>

        {/* Quick Suggestions */}
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setText(s)}
              className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs text-zinc-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all active:scale-[0.97]"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Tone Selector */}
        <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                tone === t.id
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "bg-zinc-50 text-zinc-500 border border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {disabled ? "You've used all free questions" : "Press Enter or click Explain"}
          </span>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || disabled || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.97]"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Thinking...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Explain
                <span className="text-indigo-200">✨</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Disabled Overlay */}
      {disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center"
        >
          <p className="text-sm text-amber-800 font-medium">
            You've used all 30 free questions! Upgrade to Premium for unlimited access.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
