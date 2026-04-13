"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { ZodiacScreen } from "../types/screen.types";
import { PrimaryActionButton } from "../ui/Primary.Button";

export const UserProfileScreen: ZodiacScreen = {
  id: "USER_PROFILE",
  layoutMode: "DETAIL",
  TopComponent: () => {
    const { setSharedAction } = useZodiac();

    // Publish the "Back" intent to the reusable button
    useEffect(() => {
      setSharedAction({
        label: "Back",
        isBack: true, // Triggers the history retreat in the store
        onPress: () => console.log("Exiting profile..."),
      });

      return () => setSharedAction(null);
    }, [setSharedAction]);

    return (
      <div className="flex flex-col h-full gap-6">
        {/* 1. Header Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-400/30 overflow-hidden bg-blue-900">
            <div className="w-full h-full flex items-center justify-center text-3xl opacity-50">
              👤
            </div>
          </div>
          <h2 className="text-xl font-bold">Abraham Mensah</h2>
          <span className="text-cyan-400 text-xs uppercase tracking-tighter">
            Premium Print Member
          </span>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card flex flex-col items-center p-3">
            <span className="text-[10px] opacity-60">Total Prints</span>
            <span className="text-lg font-bold">142</span>
          </div>
          <div className="glass-card flex flex-col items-center p-3">
            <span className="text-[10px] opacity-60">Wallet Bal.</span>
            <span className="text-lg font-bold text-orange-400">₵85.00</span>
          </div>
        </div>

        {/* 3. Settings List */}
        <div className="flex flex-col gap-2 mt-4">
          {[
            { label: "Notification Settings", icon: "🔔" },
            { label: "Payment Methods", icon: "💳" },
            { label: "Security & Privacy", icon: "🔒" },
            { label: "Help & Support", icon: "🎧" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="opacity-30 text-xs">→</span>
            </div>
          ))}
        </div>

        {/* 4. THE REUSABLE BUTTON (Placed under the list) */}
        <div className="mt-auto pb-4 flex justify-center">
          <PrimaryActionButton />
        </div>
      </div>
    );
  },

  DownComponent: undefined,

  // Fallback config for the registry
  primaryAction: {
    label: "Back",
    isBack: true,
  },
};
