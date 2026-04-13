// app/zodiac/process/subscription/types.ts

export type SubscriptionStepId = "IDENTITY" | "LOCATION" | "STOCK";

export interface SubscriptionStep {
  id: SubscriptionStepId;
  label: string;
}

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
