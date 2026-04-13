import { create } from "zustand";
import { ScreenID } from "../view/screen.registry";

export type ViewMode = "SPLIT" | "DETAIL";

export interface ButtonAction {
  label: string;
  nextScreenId?: ScreenID;
  nextViewMode?: ViewMode;
  onPress?: () => void;
  isBack?: boolean; // NEW: Explicit flag to trigger history retreat
}

interface ZodiacState {
  activeScreenId: ScreenID;
  viewMode: ViewMode;
  sharedAction: ButtonAction | null;
  history: { id: ScreenID; mode: ViewMode }[]; // Track the path

  setScreen: (id: ScreenID, mode?: ViewMode) => void;
  goBack: () => void;
  setSharedAction: (action: ButtonAction | null) => void;
  executeSharedAction: () => void;
}

export const useZodiac = create<ZodiacState>((set, get) => ({
  activeScreenId: "WELCOME",
  viewMode: "SPLIT",
  sharedAction: null,
  history: [],

  setScreen: (id, mode) => {
    const { activeScreenId, viewMode, history } = get();
    // Save current state to history before moving forward
    set({
      activeScreenId: id,
      viewMode: mode || "SPLIT",
      history: [...history, { id: activeScreenId, mode: viewMode }],
    });
  },

  goBack: () => {
    const { history } = get();
    if (history.length === 0) return;

    const last = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    set({
      activeScreenId: last.id,
      viewMode: last.mode,
      history: newHistory,
    });
  },

  setSharedAction: (action) => set({ sharedAction: action }),

  executeSharedAction: () => {
    const action = get().sharedAction;
    if (!action) return;

    if (action.onPress) action.onPress();

    // Handle Back Logic
    if (action.isBack) {
      get().goBack();
      return;
    }

    // Handle Forward Navigation
    if (action.nextScreenId) {
      get().setScreen(action.nextScreenId, action.nextViewMode);
    } else if (action.nextViewMode) {
      set({ viewMode: action.nextViewMode });
    }
  },
}));
