// app/zodiac/process/subscription/steps.ts
import { SubscriptionStep } from "./types";

export const SUBSCRIPTION_STEPS: SubscriptionStep[] = [
  { id: "IDENTITY", label: "Next: Set Location" },
  { id: "LOCATION", label: "Next: Initial Stock" },
  { id: "STOCK", label: "Complete Registration" },
];
