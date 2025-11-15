// File: app/store/videoStore.ts
import { create } from "zustand";

export interface VideoClip {
  src: string;
  headline: string;
  subtext: string;
  ctaText?: string;
}

interface VideoStore {
  videos: VideoClip[];
  currentIndex: number;
  nextVideo: () => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  // Pre-populated videos array; paths reference the /public folder
  videos: [
    {
      src: "/video1.mp4",
      headline: "3-AMS-CELMS Maintenance Services",
      subtext:
        "Delivering comprehensive services to commercial, military, and private operators.",
      ctaText: "Learn More",
    },
    {
      src: "/video2.mp4",
      headline: "Expert Maintenance Teams",
      subtext:
        "Our highly trained staff ensures the highest quality service and uptime.",
      ctaText: "Get Started",
    },
    {
      src: "/video3.mp4",
      headline: "Reliable & Efficient",
      subtext:
        "We provide timely maintenance to keep your operations running smoothly.",
      ctaText: "Contact Us",
    },
  ],
  currentIndex: 0,

  // Move to the next video in the array (wrap around)
  nextVideo: () =>
    set(({ videos, currentIndex }) => ({
      currentIndex: (currentIndex + 1) % videos.length,
    })),
}));
