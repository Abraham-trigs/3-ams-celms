// app/zodiac/process/subscription/types.ts

/**
 * =========================
 * ENGINE LAYER (FLOW CONTROL)
 * =========================
 */

export type ProcessActionType = "next" | "back" | "cancel";

export type SubscriptionStepId = "IDENTITY" | "LOCATION" | "STOCK";

/**
 * Single step definition (workflow engine)
 */
export interface StepBlueprint {
  id: SubscriptionStepId;

  /**
   * Allowed actions in this step
   * (drives which buttons are shown)
   */
  actions: ProcessActionType[];

  /**
   * Optional lifecycle hooks
   */
  onEnter?: () => void;
  onExit?: () => void;

  /**
   * Optional guard before moving forward
   * IMPORTANT: only applies to "next"
   */
  canProceed?: (data: SubscriptionData) => boolean;
}

/**
 * =========================
 * UI LAYER (DISPLAY ONLY)
 * =========================
 */

export interface SubscriptionStep {
  id: SubscriptionStepId;
  label: string;
}

/**
 * =========================
 * DOMAIN MODEL (SOURCE OF TRUTH)
 * =========================
 */

export interface SubscriptionData {
  name?: string;
  logoUrl?: string;
  digitalAddress?: string;
  locationUrl?: string;

  stocks?: Array<{
    itemName: string;
    quantity: number;
    unit: string;
  }>;
}
