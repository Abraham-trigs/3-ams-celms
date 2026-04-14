"use client";

import { useCallback } from "react";
import { useZodiac } from "../../store/zodiac.store";
import { useProcess } from "../../hooks/useProcess";
import { SUBSCRIPTION_STEPS } from "../../process/subscription/steps";
import { SubscriptionData } from "../../process/subscription/types";

import { IdentityForm } from "./IdentityForm";
import { LocationForm } from "./LocationForm";
import { StockForm } from "../../ui/common/StockForm";

import { PrimaryActionButton } from "../../ui/Primary.Button";
import { resolveProcessActions } from "../../process/subscription/resolver";

const STEP_COMPONENTS = {
  IDENTITY: IdentityForm,
  LOCATION: LocationForm,
  STOCK: StockForm,
} as const;

export const SubscriptionScreen = {
  id: "SUBSCRIPTION",
  layoutMode: "DETAIL",

  TopComponent: () => {
    const handleComplete = useCallback((finalData: SubscriptionData) => {
      console.log("Saving Registration:", finalData);
      useZodiac.getState().setScreen("JOB_SELECTION", "SPLIT");
    }, []);

    const { currentStep, data, updateData } = useProcess(
      "SUBSCRIPTION",
      SUBSCRIPTION_STEPS,
      handleComplete,
    );

    const activeStepId = SUBSCRIPTION_STEPS[currentStep].id;
    const ActiveStep =
      STEP_COMPONENTS[activeStepId as keyof typeof STEP_COMPONENTS];

    // =========================
    // RESOLVER (single source of truth)
    // =========================
    const actions = resolveProcessActions({
      stepIndex: currentStep,
      steps: SUBSCRIPTION_STEPS,
      data,
    });

    return (
      <div className="flex flex-col h-full gap-6 p-4">
        {/* PROGRESS */}
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

        {/* STEP CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {ActiveStep ? <ActiveStep data={data} onUpdate={updateData} /> : null}
        </div>

        {/* BUTTON BAR */}
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          {actions.cancel && <PrimaryActionButton action={actions.cancel} />}

          {actions.back && <PrimaryActionButton action={actions.back} />}

          {actions.next && <PrimaryActionButton action={actions.next} />}
        </div>
      </div>
    );
  },
};
