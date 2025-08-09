"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const phrases = [
  "Sleep Optimization",
  "Cognitive Enhancement",
  "Beauty / Inner Glow",
  "Metabolic & Weight",
  "Energy Boost",
  "Longevity & Immune",
];

export const phraseColorClass: Record<string, string> = {
  "Sleep Optimization": "text-violet-700",
  "Cognitive Enhancement": "text-blue-700",
  "Beauty / Inner Glow": "text-pink-600",
  "Metabolic & Weight": "text-teal-700",
  "Energy Boost": "text-amber-600",
  "Longevity & Immune": "text-emerald-700",
};

type AnimatedTextProps = {
  onPhraseChange?: (phrase: string) => void;
};

export function AnimatedText({ onPhraseChange }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onPhraseChange?.(phrases[0]);
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onPhraseChange?.(phrases[index]);
  }, [index, onPhraseChange]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={phrases[index]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`inline-block font-semibold ${
          phraseColorClass[phrases[index]] ?? "text-black"
        }`}
      >
        {phrases[index]}
      </motion.span>
    </AnimatePresence>
  );
}
