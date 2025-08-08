"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const phrases = [
  "Better sleep",
  "Boost focus",
  "Live longer",
  "Glow naturally",
  "More energy",
  "Stay healthy",
];

export const phraseColorClass: Record<string, string> = {
  "Better sleep": "text-violet-700",
  "Boost focus": "text-blue-700",
  "Live longer": "text-emerald-700",
  "Glow naturally": "text-pink-600",
  "More energy": "text-amber-600",
  "Stay healthy": "text-teal-700",
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
