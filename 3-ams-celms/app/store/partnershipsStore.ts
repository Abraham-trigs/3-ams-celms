// File: app/store/partnershipsStore.ts
// Purpose: Centralized auto-scrolling logic for PartnershipsSection carousel with infinite looping

import { create } from "zustand";

interface PartnershipsStore {
  scrollX: number;             // current scroll position
  isPaused: boolean;           // whether auto-scroll is paused
  speed: number;               // pixels per frame
  maxScroll: number;           // maximum scrollable width (set by component)
  setMaxScroll: (max: number) => void;
  setScrollX: (x: number) => void;
  scrollLeft: (amount?: number) => void;
  scrollRight: (amount?: number) => void;
  pause: () => void;
  resume: () => void;
  startAutoScroll: () => void;
}

export const usePartnershipsStore = create<PartnershipsStore>((set, get) => {
  let interval: NodeJS.Timer | null = null;

  const startInterval = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      const { scrollX, speed, maxScroll, isPaused } = get();
      if (!isPaused && maxScroll > 0) {
        let nextX = scrollX + speed;

        // Infinite looping: reset scroll when reaching maxScroll
        if (nextX >= maxScroll) {
          nextX = 0;
        }

        set({ scrollX: nextX });
      }
    }, 16); // ~60fps
  };

  return {
    scrollX: 0,
    isPaused: false,
    speed: 1,       // default scroll speed
    maxScroll: 0,
    setMaxScroll: (max) => set({ maxScroll: max }),
    setScrollX: (x) => set({ scrollX: x }),
    scrollLeft: (amount = 50) => set((state) => {
      let nextX = state.scrollX - amount;
      if (nextX < 0) nextX = state.maxScroll;
      return { scrollX: nextX };
    }),
    scrollRight: (amount = 50) => set((state) => {
      let nextX = state.scrollX + amount;
      if (nextX > state.maxScroll) nextX = 0;
      return { scrollX: nextX };
    }),
    pause: () => set({ isPaused: true }),
    resume: () => set({ isPaused: false }),
    startAutoScroll: () => startInterval(),
  };
});

/*
Design reasoning:
- Infinite scroll handled entirely in the store, no component logic needed.
- scrollX resets to 0 when reaching maxScroll to create seamless loop.
- Allows hover pause, manual left/right scroll without breaking loop.

Structure:
- scrollX: current offset
- isPaused: pause state
- speed: pixels per frame
- maxScroll: width at which scroll resets
- methods: scrollLeft, scrollRight, pause/resume, startAutoScroll

Implementation guidance:
- Component duplicates items array if needed and sets maxScroll = half scrollWidth.
- Component binds scrollLeft to container.scrollLeft in useEffect.
- Hover events call pause/resume.

Scalability insight:
- Can handle multiple carousels by adding IDs or separate store slices.
- Speed, pause, and maxScroll can be dynamically adjusted.
- Works with both auto-scroll and manual user interactions seamlessly.
*/
