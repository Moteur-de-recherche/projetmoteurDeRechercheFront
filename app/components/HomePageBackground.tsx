// app/components/HomepageBackground.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BackgroundGradientAnimation } from "./ui/BackgroundAnimationUi";
import VortexBackground from "./VortexBackground";

export default function HomepageBackground() {
  const pathname = usePathname();

  // Afficher le background uniquement sur la page d'accueil
  if (pathname !== "/") return null;

  return (
    <div className="absolute inset-0 -z-20">
      <BackgroundGradientAnimation />
      <VortexBackground />
    </div>
  );
}
