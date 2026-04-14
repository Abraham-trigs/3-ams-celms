"use client";

import { useZodiac } from "../store/zodiac.store";

export function BottomBar() {
  const setScreen = useZodiac((s) => s.setScreen);

  return (
    <nav className="zodiac-bottombar px-8">
      {/* Messages */}
      <div className="relative cursor-pointer">
        <div className="text-2xl grayscale brightness-200">💬</div>
        <div className="badge">2</div>
      </div>

      {/* Home - Always Navigates to Welcome */}
      <div
        className="cursor-pointer text-3xl transition-transform active:scale-90"
        onClick={() => setScreen("WELCOME")}
      >
        🏠
      </div>

      {/* Cart with Orange Circle */}
      <div className="relative cursor-pointer p-2 border-2 border-orange-500 rounded-full bg-blue-900/50">
        <div className="text-2xl">🛒</div>
        <div className="badge">5</div>
      </div>
    </nav>
  );
}
