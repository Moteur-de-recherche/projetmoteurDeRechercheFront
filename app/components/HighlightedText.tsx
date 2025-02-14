"use client";

import React, { useMemo } from "react";

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

// Fonction pour échapper les caractères spéciaux dans une chaîne
const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
  const parts = useMemo(() => {
    if (!highlight.trim()) return [text];
    const escapedHighlight = escapeRegExp(highlight);
    // Expression régulière insensible à la casse
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    return text.split(regex);
  }, [text, highlight]);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index} className="bg-[#ebf232] text-black font-bold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
