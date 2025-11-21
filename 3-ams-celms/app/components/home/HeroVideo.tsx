// File: app/components/home/HeroVideo.tsx
// Purpose: Rotating hero video section for 3-AMS-CELMS using Zustand store

"use client";

import React, { useEffect } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function HeroVideo() {
  const { videos, currentIndex, nextVideo } = useVideoStore();

  // Rotate videos automatically every 5 seconds (can be customized per clip)
  useEffect(() => {
    if (videos.length === 0) return;

    const timer = setTimeout(() => {
      nextVideo();
    }, 5000); // 5000ms per clip

    return () => clearTimeout(timer);
  }, [currentIndex, nextVideo, videos.length]);

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
        loop={false} // play once per clip
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
- Correctly consumes `useVideoStore` from Zustand.
- Automatically rotates through videos.
- Overlay content comes directly from the store for dynamic updates.

Scalability
- Adding/removing videos in `videoStore.ts` updates the hero automatically.
- Multiple components can access or control the hero rotation if needed.
*/
