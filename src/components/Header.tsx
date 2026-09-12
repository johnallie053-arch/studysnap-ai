import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Zap, X, Lock, Check } from "lucide-react";
import type { Tier } from "@/types";

interface HeaderProps {
  tier: Tier;
  questionsRemaining: number;
  onTierChange: (t: Tier) => void;
  onUpgrade: () => void;
}

const MAX_FREE = 30;

export default function Header({ tier, questionsRemaining, onTierChange, onUpgrade }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const pct = tier === "premium" ? 100 : (questionsRemaining / MAX_FREE) * 100;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-zinc-900 text-lg tracking-tight">StudySnap</span>
            <span className="text-indigo-600 font-semibold text-sm hidden sm:inline">AI</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Tier Toggle */}
            <div className="flex items-center bg-zinc-100 rounded-full p-0.5">
              <button
                onClick={() => onTierChange("free")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${tier === "free" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"}`}
              >
                Free
              </button>
              <button
                onClick={() => onTierChange("premium")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${tier === "premium" ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm" : "text-zinc-500"}`}
              >
                <Crown className="w-3 h-3 inline mr-0.5" />
                Premium
              </button>
            </div>

            {/* Quota */}
            {tier === "free" && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-20 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </div>
                <span className="text-xs font-medium text-zinc-500 tabular-nums">{questionsRemaining}/{MAX_FREE}</span>
              </div>
            )}
            {tier === "premium" && (
              <span className="text-xs font-medium text-amber-600 flex items-center gap-1">
                <Check className="w-3 h-3" /> Unlimited
              </span>
            )}

            {/* Upgrade button */}
            {tier === "free" && (
              <button
                onClick={() => setShowModal(true)}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.97]"
              >
                <Lock className="w-3 h-3" />
                Upgrade
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-zinc-100">
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">Upgrade to Premium</h3>
              <p className="text-sm text-zinc-500 mb-4">Unlock the full StudySnap experience</p>

              <div className="space-y-3 mb-6">
                {[
                  "Unlimited questions - never hit a wall",
                  "Deep Practice Mode with progressive difficulty",
                  "Step-by-step visual solver for every concept",
                  "Audio narration for on-the-go learning",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm text-zinc-700">{perk}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { onUpgrade(); setShowModal(false); }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-200 transition-all active:scale-[0.98]"
              >
                Activate Premium (Simulated)
              </button>
              <p className="text-[10px] text-zinc-400 text-center mt-2">This is a demo - no real payment</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
