// app/zodiac/modals/WelcomeTopModal.tsx
"use client";

import { PrimaryActionButton } from "../ui/Primary.Button";

export function WelcomeTopModal() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
      {/* Logo */}
      <div className="w-32 h-32 rounded-full bg-blue-900 border-2 border-white/20 flex items-center justify-center shadow-2xl">
        <span className="text-cyan-400 font-bold text-xl">ZODIAC</span>
      </div>

      {/* Slogan */}
      <p className="text-center text-lg font-medium leading-tight">
        Print Anywhere, At anytime & Lead
      </p>

      {/* The Button (stays here to be rendered) */}
      <PrimaryActionButton />
    </div>
  );
}

WelcomeTopModal.modalId = "WELCOME_TOP";
