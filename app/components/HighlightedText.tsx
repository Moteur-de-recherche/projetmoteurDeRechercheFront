// app/components/HighlightedText.tsx
"use client";

import React, { useMemo } from "react";

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
  const parts = useMemo(() => {
    if (!highlight.trim()) return [text];
    // Expression régulière insensible à la casse
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex);
  }, [text, highlight]);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index} className="bg-yellow-300 text-white font-bold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
