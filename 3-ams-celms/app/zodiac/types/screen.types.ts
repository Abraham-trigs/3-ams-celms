import { ReactNode } from "react";
import { ViewMode } from "../store/zodiac.store";

export interface ScreenAction {
  label: string;
  // This allows the button to handle the next state transition
  nextScreenId?: string;
  nextViewMode?: ViewMode;
  onPress?: () => void;
}

export interface ZodiacScreen {
  id: string;
  layoutMode: ViewMode;
  // Fragments that will be injected into the Shell slots
  TopComponent: React.FC;
  DownComponent?: React.FC;
  // The configuration for the universal Primary Button
  primaryAction: ScreenAction;
}
