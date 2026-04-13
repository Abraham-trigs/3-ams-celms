"use client";

import { useZodiac } from "../store/zodiac.store";

export function PrimaryActionButton() {
  const { sharedAction, viewMode, executeSharedAction } = useZodiac();

  if (!sharedAction) return null;

  // Logic to determine arrow direction based on action type or view mode
  const getIcon = () => {
    if (sharedAction.isBack) return "←";
    return viewMode === "SPLIT" ? "↑" : "↓";
  };

  return (
    <button
      onClick={executeSharedAction}
      className="glass-card flex items-center gap-3 active:scale-95 transition-all duration-200 group"
      style={{
        cursor: "pointer",
        color: "var(--zodiac-cyan)",
        borderColor: sharedAction.isBack ? "white" : "var(--zodiac-orange)",
      }}
    >
      <span className="font-bold tracking-widest uppercase text-[11px]">
        {sharedAction.label}
      </span>

      <div className="flex items-center justify-center bg-white/10 rounded-full w-5 h-5 group-hover:bg-white/20 transition-colors">
        <span className="text-[10px] leading-none font-bold">{getIcon()}</span>
      </div>
    </button>
  );
}
