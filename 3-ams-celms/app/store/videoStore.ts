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
    {
      src: "/video4.mp4",
      headline: "State-of-the-Art Facilities",
      subtext:
        "Our workshops are equipped with the latest technology for precision maintenance.",
      ctaText: "Explore Facilities",
    },
    {
      src: "/video5.mp4",
      headline: "Global Reach",
      subtext:
        "We support operators worldwide with our extensive maintenance network.",
      ctaText: "See Locations",
    },
    {
      src: "/video6.mp4",
      headline: "Cutting-Edge Tools",
      subtext: "Our team leverages the latest tools for precision and safety.",
      ctaText: "Learn More",
    },
    {
      src: "/video7.mp4",
      headline: "Skilled Workforce",
      subtext: "Experienced engineers certified across multiple aircraft models.",
      ctaText: "Get Started",
    },
    {
      src: "/video8.mp4",
      headline: "Rapid Turnaround",
      subtext: "Timely services to keep your operations flying smoothly.",
      ctaText: "Contact Us",
    },
    {
      src: "/video9.mp4",
      headline: "Safety First",
      subtext: "Adhering to the highest safety and regulatory standards.",
      ctaText: "Explore Facilities",
    },
    
  ],
  currentIndex: 0,

  // Move to the next video in the array (wrap around)
  nextVideo: () =>
    set(({ videos, currentIndex }) => ({
      currentIndex: (currentIndex + 1) % videos.length,
    })),
}));
