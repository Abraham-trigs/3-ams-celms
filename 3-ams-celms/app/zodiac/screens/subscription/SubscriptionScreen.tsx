"use client";

import { useCallback } from "react";
import { useZodiac } from "../../store/zodiac.store";
import { useProcess } from "../../hooks/useProcess";
import { SUBSCRIPTION_STEPS } from "../../process/subscription/steps";
import { SubscriptionData } from "../../process/subscription/types";

import { IdentityForm } from "./IdentityForm";
import { LocationForm } from "./LocationForm";
import { StockForm } from "../../ui/common/StockForm";

/**
 * STEP REGISTRY (source of truth)
 */
const STEP_COMPONENTS = {
  IDENTITY: IdentityForm,
  LOCATION: LocationForm,
  STOCK: StockForm,
} as const;

export const SubscriptionScreen = {
  id: "SUBSCRIPTION",
  layoutMode: "DETAIL",

  TopComponent: () => {
    const { setScreen } = useZodiac();

    const handleComplete = useCallback(
      (finalData: SubscriptionData) => {
        console.log("Saving Registration:", finalData);
        setScreen("JOB_SELECTION", "SPLIT");
      },
      [setScreen],
    );

    const { currentStep, data, updateData } = useProcess(
      "SUBSCRIPTION",
      SUBSCRIPTION_STEPS,
      handleComplete,
    );

    const activeStepId = SUBSCRIPTION_STEPS[currentStep].id;

    const ActiveStep =
      STEP_COMPONENTS[activeStepId as keyof typeof STEP_COMPONENTS];

    return (
      <div className="flex flex-col h-full gap-6">
        {/* Progress */}
        <div className="flex gap-2">
          {SUBSCRIPTION_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-cyan-400" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* ✅ Single render path (no empty JSX risk ever again) */}
        {ActiveStep ? <ActiveStep data={data} onUpdate={updateData} /> : null}
      </div>
    );
  },
};
