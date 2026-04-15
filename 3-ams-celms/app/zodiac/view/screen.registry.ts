import { WelcomeScreen } from "../screens/WelcomeScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";
import { SubscriptionScreen } from "../screens/subscription/SubscriptionScreen";
import { JobCartScreen } from "../screens/JobCartScreen";
import { AnalyticsDashboard } from "../screens/AnalyticsDashboard";
import { ZodiacScreen } from "../types/screen.types";

/**
 * Central screen registry (source of truth for navigation engine)
 */
export const SCREEN_MAP = {
  WELCOME: WelcomeScreen,
  USER_PROFILE: UserProfileScreen,
  SUBSCRIPTION: SubscriptionScreen,
  JOB_CART: JobCartScreen,
  ANALYTICS: AnalyticsDashboard, // 2. Register the Analytics ID
} as const satisfies Record<string, ZodiacScreen>;

/**
 * Strongly typed screen IDs derived from registry
 */
export type ScreenID = keyof typeof SCREEN_MAP;

/**
 * Safe resolver (prevents undefined runtime access)
 */
export function getScreen(id: ScreenID): ZodiacScreen {
  return SCREEN_MAP[id];
}

/**
 * Optional: preload hook
 */
export function preloadScreen(id: ScreenID) {
  const screen = SCREEN_MAP[id];
  return screen;
}
