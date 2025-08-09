"use client";

import { useState, useCallback } from "react";
import { AnimatedText, phraseColorClass } from "./animated-text";

export default function HeroHeader() {
  const [activePhrase, setActivePhrase] =
    useState<string>("Sleep Optimization");

  const handleChange = useCallback((phrase: string) => {
    setActivePhrase(phrase);
  }, []);

  const accentClass = phraseColorClass[activePhrase] ?? "text-stone-900";

  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-stone-900">
        <span className="block">
          <AnimatedText onPhraseChange={handleChange} />
        </span>
        <span className="block">for your own longevity plan.</span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 text-stone-600">
        Discover curated supplement stacks, backed by science and nature, to
        unlock your full potential.
      </p>
      <h2
        className={`text-2xl md:text-3xl font-semibold mb-4 md:mb-6 ${accentClass}`}
      >
        Choose your goal
      </h2>
    </>
  );
}
