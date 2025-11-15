// File: app/components/home/HeroVideo.tsx
// Purpose: Rotating hero video section for 3-AMS-CELMS using Zustand store

"use client";

import React, { useEffect } from "react";
import { useHeroVideoStore } from "@/app/store/heroVideoStore";

export default function HeroVideo() {
  const { videos, currentIndex, duration, nextVideo } = useHeroVideoStore();

  // Rotate videos automatically
  useEffect(() => {
    if (videos.length === 0) return;

    const timer = setTimeout(() => {
      nextVideo();
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, duration, nextVideo, videos.length]);

  if (videos.length === 0) return null; // nothing to show

  const { src, headline, subtext, ctaText } = videos[currentIndex];

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Video */}
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop={false} // one play per clip
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          {headline}
        </h1>
        {subtext && (
          <p className="mt-4 text-lg md:text-xl text-white max-w-3xl">
            {subtext}
          </p>
        )}
        {ctaText && (
          <button className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-hover)]">
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
}

/*
Design reasoning
- Component now fully consumes Zustand store; no props required.
- Automatically rotates through videos based on `duration`.
- Overlay text comes directly from store per video, allowing dynamic updates.

Structure
- video element: plays current video
- overlay div: headline, subtext, CTA button
- useEffect: timer to advance video

Implementation guidance
- Initialize the store with videos in page or layout using `addVideo`.
- Example:
  const { addVideo } = useHeroVideoStore();
  addVideo({ src: "/video1.mp4", headline: "Headline", subtext: "Text", ctaText: "Learn More" });

Scalability insight
- Adding/removing videos dynamically updates the hero without modifying the component.
- Overlay content can be CMS-driven per video.
- Centralized store enables multiple components to reference or control the hero rotation.
*/
