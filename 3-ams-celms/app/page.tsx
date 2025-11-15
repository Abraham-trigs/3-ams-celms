// File: app/page.tsx
"use client";

import React from "react";
import HeroVideoContainer from "@/app/components/home/HeroVideoContainer";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section */}
      <HeroVideoContainer duration={7000} />

      {/* Other sections: Services grid, About, etc. */}
    </div>
  );
}
