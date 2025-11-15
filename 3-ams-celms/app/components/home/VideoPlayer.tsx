// File: app/components/home/VideoPlayer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { videos, currentIndex, nextVideo } = useVideoStore();

  // Auto-advance to next video after 7s (adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => nextVideo(), 7000);
    return () => clearTimeout(timer);
  }, [currentIndex, nextVideo]);

  if (!videos || videos.length === 0) return null;

  return (
    <video
      key={videos[currentIndex].src}
      ref={videoRef}
      src={videos[currentIndex].src}
      autoPlay
      muted
      loop={false}
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
}
