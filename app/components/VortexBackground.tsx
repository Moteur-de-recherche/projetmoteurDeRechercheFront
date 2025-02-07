"use client";

import React from "react";
import { Vortex } from "./ui/vortex";

interface VortexBackgroundProps {
  className?: string;
}

const VortexBackground: React.FC<VortexBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Vortex containerClassName="h-full w-full" />
    </div>
  );
};

export default VortexBackground;
