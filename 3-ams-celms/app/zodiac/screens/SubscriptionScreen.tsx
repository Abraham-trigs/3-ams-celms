// app/zodiac/screens/SubscriptionScreen.tsx
"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { ZodiacScreen } from "../types/screen.types";

export const SubscriptionScreen: ZodiacScreen = {
  id: "SUBSCRIPTION",
  layoutMode: "DETAIL", // Forces the Shell to 100% height
  TopComponent: () => {
    const { setSharedAction, setScreen, setViewMode } = useZodiac();

    useEffect(() => {
      // Configuration for the Primary Action Button
      setSharedAction({
        label: "Complete Registration",
        onPress: () => {
          console.log("Creating Company Profile & Setting up Stock...");
          // Move to Job Selection dashboard after onboarding
          setScreen("JOB_SELECTION");
          setViewMode("SPLIT");
        },
      });

      return () => setSharedAction(null);
    }, [setSharedAction, setScreen, setViewMode]);

    return (
      <div className="flex flex-col h-full gap-6">
        {/* Onboarding Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-cyan-400">Register Company</h2>
          <p className="text-xs opacity-60">
            Complete your profile to start printing and lead generation.
          </p>
        </div>

        {/* Registration Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-50">
              Company Name
            </label>
            <input
              className="glass-card bg-white/5 w-full h-12 px-4 focus:border-cyan-400 outline-none transition-all"
              placeholder="e.g., Zodiac Prints GH"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold opacity-50">
              Ghana Digital Address
            </label>
            <input
              className="glass-card bg-white/5 w-full h-12 px-4 outline-none"
              placeholder="GA-123-4567"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card bg-white/5 p-4 flex flex-col items-center gap-2 border-dashed">
              <span className="text-xl">🖼️</span>
              <span className="text-[10px]">Upload Logo</span>
            </div>
            <div className="glass-card bg-white/10 p-4 flex flex-col items-center gap-2 border-cyan-400/50">
              <span className="text-xl">📍</span>
              <span className="text-[10px]">Verify Location</span>
            </div>
          </div>
        </div>

        {/* Stock Preview (The "Lead" Setup) */}
        <div className="mt-4 p-4 rounded-2xl bg-blue-950/50 border border-white/5">
          <h4 className="text-[11px] font-bold uppercase mb-2 text-orange-400">
            Initial Stock Setup
          </h4>
          <div className="flex justify-between items-center text-sm">
            <span>Standard Paper (A4)</span>
            <span className="text-cyan-400 font-mono">500 Reams</span>
          </div>
        </div>
      </div>
    );
  },

  DownComponent: undefined, // Hidden in DETAIL mode

  primaryAction: {
    label: "Complete Registration",
    nextScreenId: "JOB_SELECTION",
    nextViewMode: "SPLIT",
  },
};
