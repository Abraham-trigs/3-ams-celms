// app/zodiac/view/screen.registry.ts
import { JobSelectionScreen } from "../screens/JobSelection";
import { ZodiacScreen } from "../types/screen.types";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";
import { SubscriptionScreen } from "../screens/SubscriptionScreen";

export const SCREEN_MAP: Record<string, ZodiacScreen> = {
  WELCOME: WelcomeScreen,
  JOB_SELECTION: JobSelectionScreen,
  USER_PROFILE: UserProfileScreen,
  SUBSCRIPTION: SubscriptionScreen,

  // Add new screens here as you build them
};

export type ScreenID = keyof typeof SCREEN_MAP;
