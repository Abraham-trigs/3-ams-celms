import { WelcomeScreen } from "../screens/WelcomeScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";
import { SubscriptionScreen } from "../screens/subscription/SubscriptionScreen";
import { JobCartScreen } from "../screens/JobCartScreen";
import { AnalyticsDashboard } from "../screens/AnalyticsDashboard";
import { HubMenuScreen } from "../screens/HubMenuScreen"; // ✅ New
import { StaffManagementScreen } from "../screens/StaffManagementScreen"; // ✅ New
import { ZodiacScreen } from "../types/screen.types";
import { StaffProfileScreen } from "../screens/StaffProfileScreen";
/**
 * Central screen registry (source of truth for navigation engine)
 */
export const SCREEN_MAP = {
  WELCOME: WelcomeScreen,
  USER_PROFILE: UserProfileScreen,
  SUBSCRIPTION: SubscriptionScreen,
  JOB_CART: JobCartScreen,
  ANALYTICS: AnalyticsDashboard,
  HUB_MENU: HubMenuScreen, // ✅ Registered for BottomBar access
  STAFF_MGMT: StaffManagementScreen, // ✅ Registered for Hub access
  STAFF_PROFILE: StaffProfileScreen, // ✅ Registered for dynamic staff navigation
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
  return SCREEN_MAP[id];
}
