// app/zodiac/screens/WelcomeScreen.tsx
"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { ZodiacScreen } from "../types/screen.types";
import { PrimaryActionButton } from "../ui/Primary.Button";

export const WelcomeScreen: ZodiacScreen = {
  id: "WELCOME",
  layoutMode: "SPLIT",
  TopComponent: () => {
    const setSharedAction = useZodiac((s) => s.setSharedAction);

    useEffect(() => {
      // Feeding the reusable button the "Login" intent
      setSharedAction({
        label: "Login to Profile",
        nextScreenId: "USER_PROFILE", // Switch to Profile Screen
        nextViewMode: "DETAIL", // Expand to 100% height
        onPress: () => console.log("Initializing Login..."),
      });

      // Clear the action when this screen unmounts
      return () => setSharedAction(null);
    }, [setSharedAction]);

    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {/* 1. Circular Logo Placeholder */}
        <div className="w-32 h-32 rounded-full bg-blue-900 border-2 border-white/20 flex items-center justify-center shadow-2xl">
          <span className="text-cyan-400 font-bold text-xl">ZODIAC</span>
        </div>

        {/* 2. Slogan Text */}
        <p className="text-center text-lg font-medium px-10 leading-tight">
          Print Anywhere, At anytime & Lead
        </p>

        {/* 3. Reusable UI Button (Now dynamic) */}
        <PrimaryActionButton />
      </div>
    );
  },

  // 4. DownComponent as AdContainer
  DownComponent: () => <AdContainer />,

  // Static config for the registry
  primaryAction: {
    label: "Login to Profile",
    nextScreenId: "USER_PROFILE",
    nextViewMode: "DETAIL",
  },
};

/**
 * AD CONTAINER MODAL
 */
function AdContainer() {
  return (
    <div className="modal-box p-0 overflow-hidden bg-gradient-to-br from-blue-900 to-black">
      <div className="p-4 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-cyan-300">Fast Printing</span>
          <div className="bg-orange-500 text-[10px] px-2 py-0.5 rounded">
            SAVE TIME
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-bold">Avoid Long Queues</h4>
          <p className="text-[9px] opacity-70">
            Get started for free on all platforms
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-1 mt-4 justify-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === 0 ? "bg-orange-500" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
