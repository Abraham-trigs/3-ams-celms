// File: app/store/colorStore.ts
// Purpose: Centralized color store for 3-AMS-CELMS to manage brand colors dynamically

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ColorPalette {
  background: string;
  primary: string;
  primHover: string;
  secondary: string;
  secHover: string;
}

interface ColorStore {
  colors: ColorPalette;
  setColors: (newColors: Partial<ColorPalette>) => void;
  resetColors: () => void;
}

// Default brand colors
const defaultColors: ColorPalette = {
  background: "#f2f2f2",
  primary: "#014987",
  primHover: "#236aa9",
  secondary: "#660033",
  secHover: "#990a58",
};

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      colors: defaultColors,
      setColors: (newColors: Partial<ColorPalette>) =>
        set((state) => ({
          colors: { ...state.colors, ...newColors },
        })),
      resetColors: () => set({ colors: defaultColors }),
    }),
    {
      name: "color-storage", // persists colors in localStorage
    }
  )
);

/* 
Design reasoning
- Centralizes all brand colors for consistent use across components.
- Supports dynamic theme updates and hover states.
- Persists user customizations between sessions.

Structure
- colors: current color palette
- setColors: merge partial updates into palette
- resetColors: revert to default brand colors
- uses Zustand with persist middleware for localStorage support

Implementation guidance
- Import and use colors in components via:
    const { colors } = useColorStore();
- Update colors dynamically by calling setColors({ primary: "#newColor" })
- Can wrap components or theme providers with this store for global access.

Scalability insight
- Easy to extend palette with more colors (accent, text, error, etc.)
- Supports multiple themes (dark/light) by adding theme state and conditional sets
- Components stay decoupled from static CSS, fully programmatic styling possible
*/
