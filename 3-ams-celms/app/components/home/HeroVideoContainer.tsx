"use client";

import React, { useEffect } from "react";
import { useVideoStore } from "@/app/store/videoStore";
import AnimatedTextOverlay from "./AnimatedTextOverlay";

interface HeroVideoContainerProps {
  duration?: number; // milliseconds each video plays
}

export default function HeroVideoContainer({
  duration = 7000,
}: HeroVideoContainerProps) {
  const videos = useVideoStore((state) => state.videos);
  const currentIndex = useVideoStore((state) => state.currentIndex);
  const nextVideo = useVideoStore((state) => state.nextVideo);

  // Auto-rotate videos
  useEffect(() => {
    const timer = setInterval(() => {
      nextVideo();
    }, duration);

    return () => clearInterval(timer);
  }, [duration, nextVideo]);

  if (!videos.length) return null;

  const currentVideo = videos[currentIndex];

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Video Player */}
      <video
        key={currentVideo.src} // ensures video updates on index change
        src={currentVideo.src}
        autoPlay
        muted
        loop={false}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Animated overlay keyed to currentIndex to trigger animations */}
      <AnimatedTextOverlay
        key={currentIndex} // forces remount on video change
        headline={currentVideo.headline}
        subtext={currentVideo.subtext}
        ctaText={currentVideo.ctaText}
        onCtaClick={() => console.log("CTA clicked:", currentVideo.ctaText)}
      />
    </section>
  );
}
