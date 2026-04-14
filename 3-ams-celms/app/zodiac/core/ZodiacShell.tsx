("use client");

import { useEffect } from "react"; // ✅ MUST ADD THIS
import { useZodiac } from "../store/zodiac.store";
import { executeAction } from "../router/action.router"; // ✅ MUST ADD THIS
import { TopBar } from "../ui/TopBar";
import { TopModal } from "../ui/TopModal";
import { DownModal } from "../ui/DownModal";
import { resolveLayout } from "../view/layout.engine";

export function ZodiacShell() {
  const state = useZodiac();
  const { sharedAction, setSharedAction } = state;
  const layout = resolveLayout(state);

  /**
   * ⚡️ CRITICAL FIX: The Bridge
   * Without this, your buttons will still do nothing.
   */
  useEffect(() => {
    if (!sharedAction) return;
    executeAction(sharedAction);
    setSharedAction(null);
  }, [sharedAction, setSharedAction]);

  return (
    <div className="zodiac-shell flex flex-col h-full bg-black overflow-hidden">
      <div className="zodiac-topbar shrink-0">
        <TopBar />
      </div>

      {/* TOP ZONE */}
      <div
        className={`zodiac-top transition-all duration-500 ${
          layout.layout === "DETAIL_MODE" ? "h-full" : "h-[40%]"
        }`}
      >
        <TopModal />
      </div>

      {/* DOWN ZONE */}
      {layout.layout !== "DETAIL_MODE" && (
        <div className="zodiac-down flex-1">
          <DownModal />
        </div>
      )}
    </div>
  );
}
