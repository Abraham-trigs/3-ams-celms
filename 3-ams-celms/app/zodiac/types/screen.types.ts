import { ReactNode } from "react";
import { ViewMode } from "../store/zodiac.store";
import { ScreenID } from "../view/screen.registry";

export interface ScreenAction {
  label: string;
  nextScreenId?: ScreenID; // Use ScreenID for safety
  nextViewMode?: ViewMode;
  onPress?: () => void;
}

export interface ZodiacScreen {
  id: ScreenID; // Matches your registry keys
  layoutMode: ViewMode;

  /**
   * Components act as "Controllers" or "Views".
   * With our new injection strategy, these can return null if they
   * are just using useEffect to open modals.
   */
  TopComponent: React.FC;
  DownComponent?: React.FC;

  /**
   * primaryAction is the default config, though screens usually
   * override this via setSharedAction in a useEffect.
   */
  primaryAction?: ScreenAction;
}
