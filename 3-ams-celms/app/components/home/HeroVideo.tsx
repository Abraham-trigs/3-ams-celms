// File: app/components/home/HeroVideo.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function HeroVideo() {
  const { videos, currentIndex, nextVideo } = useVideoStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videos.length === 0) return null;

  const { src, headline, subtext, ctaText } = videos[currentIndex];
  const nextVideoIndex = (currentIndex + 1) % videos.length;
  const nextVideoSrc = videos[nextVideoIndex]?.src;

  // Rotate videos every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextVideo();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, nextVideo, videos.length]);

  // Attempt autoplay on mount / index change
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => console.warn("Video autoplay failed:", err));
    }
  }, [currentIndex]);

  // Preload next video for smoother transitions
  useEffect(() => {
    if (!nextVideoSrc) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = nextVideoSrc;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [nextVideoSrc]);

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
        poster="/video-poster.jpg" // optional per-video poster if you want
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
