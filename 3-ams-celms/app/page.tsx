// File: app/page.tsx
"use client";

import React from "react";
import HeroVideoContainer from "@/app/components/home/HeroVideoContainer";
import WhoWeAreSection from "@/app/components/home/WhoWeAreSection"; // import the new section
import CompetitiveAdvantageSection from "./components/home/CompetitiveAdvantageSection";
import PartnershipsSection from "./components/home/PartnershipsSection";
import QuoteSection from "./components/home/QuoteSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section */}
      <HeroVideoContainer duration={7000} />

      {/* Who We Are + Our Areas section */}
      <WhoWeAreSection />
      <CompetitiveAdvantageSection />
      <PartnershipsSection />
      <QuoteSection />

      {/* You can add more sections here, e.g., Testimonials, Partners, etc. */}
    </div>
  );
}
