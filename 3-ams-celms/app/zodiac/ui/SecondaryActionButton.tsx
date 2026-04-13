"use client";

import { useZodiac } from "../store/zodiac.store";

export function SecondaryActionButton() {
  /**
   * Subscribes to the secondary action state in the store.
   * This button specifically handles internal modal swaps (Zone 1/2).
   */
  const { secondaryAction, executeSecondaryAction } = useZodiac();

  // If the parent screen hasn't defined a secondary task, hide the button
  if (!secondaryAction) return null;

  return (
    <button
      onClick={executeSecondaryAction}
      className="glass-card flex items-center gap-3 active:scale-95 transition-all duration-200 group"
      style={{
        cursor: "pointer",
        color: "var(--zodiac-white)", // White text to distinguish from Cyan primary
        borderColor: "rgba(255, 255, 255, 0.2)", // Subtle border
        opacity: 0.8,
      }}
    >
      <span className="font-bold tracking-widest uppercase text-[10px]">
        {secondaryAction.label}
      </span>

      {/* 
         Visual indicator: 
         Uses a simple '+' or '→' icon to signify an internal modal change 
      */}
      <div className="flex items-center justify-center bg-white/5 rounded-full w-4 h-4 group-hover:bg-white/10 transition-colors">
        <span className="text-[10px] leading-none font-bold">
          {secondaryAction.targetZone === "DOWN" ? "↓" : "→"}
        </span>
      </div>
    </button>
  );
}
