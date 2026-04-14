// /process/subscription/steps.ts

import { StepBlueprint } from "./types";

export const SUBSCRIPTION_STEPS: StepBlueprint[] = [
  {
    id: "IDENTITY",
    actions: ["cancel", "next"],
  },
  {
    id: "LOCATION",
    actions: ["back", "next"],
  },
  {
    id: "STOCK",
    actions: ["back", "next"],
  },
];
