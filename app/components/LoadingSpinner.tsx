// app/components/LoadingSpinner.tsx
"use client";

import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-16 h-16 border-4 border-[#5f22a3] border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
