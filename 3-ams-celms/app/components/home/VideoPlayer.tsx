// File: app/components/home/VideoPlayer.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useVideoStore } from "@/app/store/videoStore";

export default function VideoPlayer() {
  const { videos, currentIndex, nextIndex, advanceVideo } = useVideoStore();
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  if (!videos.length) return null;

  // Initialize video layers
  useEffect(() => {
    videoRefs.forEach((ref, idx) => {
      if (!ref.current) return;
      ref.current.muted = true;
      ref.current.autoplay = true;
      ref.current.playsInline = true;
      ref.current.preload = "auto";
      ref.current.style.opacity = idx === activeLayer ? "1" : "0";
      ref.current.play().catch(() => {});
    });
  }, [activeLayer]);

  // Crossfade & loop logic
  useEffect(() => {
    const crossfadeDuration = 0.7; // seconds
    let rafId: number;

    const tick = () => {
      const topRef = videoRefs[activeLayer ? 1 : 0].current;
      const hiddenRef = videoRefs[activeLayer ? 0 : 1].current;
      if (!topRef || !hiddenRef || !topRef.duration) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const timeLeft = topRef.duration - topRef.currentTime;

      // Crossfade
      if (timeLeft <= crossfadeDuration) {
        topRef.style.opacity = `${timeLeft / crossfadeDuration}`;
        hiddenRef.style.opacity = `${1 - timeLeft / crossfadeDuration}`;
      }

      // Swap when video ends
      if (topRef.currentTime >= topRef.duration) {
        setActiveLayer(activeLayer ? 0 : 1);
        advanceVideo();

        // Prepare hidden layer with next video
        hiddenRef.src = videos[nextIndex].src;
        hiddenRef.currentTime = 0;
        hiddenRef.play().catch(() => {});
      }

      rafId = requestAnimationFrame(tick);
    };

    // Set initial sources
    videoRefs[activeLayer ? 1 : 0].current!.src = videos[currentIndex].src;
    videoRefs[activeLayer ? 0 : 1].current!.src = videos[nextIndex].src;

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeLayer, currentIndex, nextIndex, advanceVideo, videos]);

  const topIndex = activeLayer ? 1 : 0;
  const bottomIndex = activeLayer ? 0 : 1;

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Video layers */}
      <video
        ref={videoRefs[bottomIndex]}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 opacity-0"
      />
      <video
        ref={videoRefs[topIndex]}
        className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 opacity-100"
      />
    </div>
  );
}
