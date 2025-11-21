// File: app/components/home/HeroVideo.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function HeroVideo() {
  const { videos, currentIndex, nextVideo } = useVideoStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotate videos automatically every 5 seconds
  useEffect(() => {
    if (videos.length === 0) return;

    const timer = setTimeout(() => {
      nextVideo();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, nextVideo, videos.length]);

  // Auto-play handling for production environments
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started
        })
        .catch((err) => {
          console.warn("Video autoplay failed:", err);
        });
    }
  }, [currentIndex]); // re-play when index changes

  if (videos.length === 0) return null;

  const { src, headline, subtext, ctaText } = videos[currentIndex];

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        key={src}
        src={src}
        autoPlay
        muted
        loop={false}
        playsInline
        preload="auto"
        poster="/video-poster.jpg" // optional: placeholder for slow loads
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
