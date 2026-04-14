import { create } from "zustand";
import { SCREEN_MAP, ScreenID } from "../view/screen.registry";
import { getCachedScreen } from "../view/screen.cache";
import { screenPredictor } from "../view/screen.predictor";

export type ViewMode = "SPLIT" | "DETAIL";

/**
 * UI action triggered from screens/components
 */
export interface ButtonAction {
  label: string;
  nextScreenId?: ScreenID;
  nextViewMode?: ViewMode;
  onPress?: () => void;
  isBack?: boolean;
}

/**
 * Navigation entry for history stack
 */
type NavEntry = {
  id: ScreenID;
  mode: ViewMode;
};

interface ZodiacState {
  activeScreenId: ScreenID;
  viewMode: ViewMode;

  sharedAction: ButtonAction | null;

  history: NavEntry[];
  future: NavEntry[];

  setScreen: (id: ScreenID, mode?: ViewMode) => void;
  goBack: () => void;
  goForward: () => void;

  setSharedAction: (action: ButtonAction | null) => void;
  executeSharedAction: () => void;

  preloadScreen: (id: ScreenID) => void;

  // 🔥 NEW
  predictNextScreen: (currentId: ScreenID) => void;
}

export const useZodiac = create<ZodiacState>((set, get) => ({
  activeScreenId: "WELCOME",
  viewMode: "SPLIT",

  sharedAction: null,

  history: [],
  future: [],

  setScreen: (id, mode) => {
    const state = get();

    if (state.activeScreenId === id) return;

    const target = SCREEN_MAP[id];
    const resolvedMode = mode || target?.layoutMode || "SPLIT";

    // warm current screen
    getCachedScreen(id);

    // 🔥 predictive warmup (future behavior)
    screenPredictor.preload(id);

    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/${id.toLowerCase()}`);
    }

    set({
      activeScreenId: id,
      viewMode: resolvedMode,

      history: [
        ...state.history,
        {
          id: state.activeScreenId,
          mode: state.viewMode,
        },
      ],

      future: [],
    });
  },

  goBack: () => {
    const state = get();

    const last = state.history[state.history.length - 1];
    if (!last) return;

    set({
      activeScreenId: last.id,
      viewMode: last.mode,

      history: state.history.slice(0, -1),

      future: [
        {
          id: state.activeScreenId,
          mode: state.viewMode,
        },
        ...state.future,
      ],
    });
  },

  goForward: () => {
    const state = get();

    const next = state.future[0];
    if (!next) return;

    set({
      activeScreenId: next.id,
      viewMode: next.mode,

      history: [
        ...state.history,
        {
          id: state.activeScreenId,
          mode: state.viewMode,
        },
      ],

      future: state.future.slice(1),
    });
  },

  setSharedAction: (action) => set({ sharedAction: action }),

  executeSharedAction: () => {
    const state = get();
    const action = state.sharedAction;

    if (!action) return;

    action.onPress?.();

    if (action.isBack) {
      get().goBack();
      set({ sharedAction: null });
      return;
    }

    if (action.nextScreenId) {
      get().setScreen(action.nextScreenId, action.nextViewMode);
      set({ sharedAction: null });
      return;
    }

    if (action.nextViewMode) {
      set({
        viewMode: action.nextViewMode,
        sharedAction: null,
      });
      return;
    }

    set({ sharedAction: null });
  },

  preloadScreen: (id) => {
    getCachedScreen(id);
  },

  // 🔥 intelligent next-screen prediction
  predictNextScreen: (currentId) => {
    const state = get();

    const last = state.history[state.history.length - 1];

    if (last?.id) {
      screenPredictor.preload(last.id);
    }
  },
}));
