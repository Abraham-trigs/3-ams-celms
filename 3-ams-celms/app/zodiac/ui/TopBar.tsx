"use client";

import { useZodiac } from "../store/zodiac.store";

export function TopBar() {
  const setScreen = useZodiac((s) => s.setScreen);

  return (
    <div className="w-full flex flex-col gap-1">
      {/* User & Profile Controls */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-lg">Abraham</span>
          <div className="w-4 h-4 bg-blue-700 rounded-full shadow-[0_0_8px_rgba(0,0,255,0.5)]" />
        </div>
        <div className="flex gap-2">
          {/* 📊 Analytics Trigger - Leftmost Circle */}
          <div
            onClick={() => setScreen("ANALYTICS")}
            className="w-6 h-6 border-2 border-white/30 rounded-full cursor-pointer hover:border-cyan-400 hover:bg-cyan-400/10 transition-all flex items-center justify-center text-[10px] active:scale-90"
          >
            📈
          </div>

          <div className="w-6 h-6 bg-blue-950 border border-white/20 rounded-full" />

          <div className="w-6 h-6 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-[2px] bg-white rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
