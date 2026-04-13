"use client";

import { useZodiac } from "../store/zodiac.store";
import { TopBar } from "../ui/TopBar";
import { TopModal } from "../ui/TopModal";
import { DownModal } from "../ui/DownModal";
import { resolveLayout } from "../view/layout.engine";

export function ZodiacShell() {
  const state = useZodiac();
  const layout = resolveLayout(state);

  return (
    <div className="zodiac-shell">
      {/* TOPBAR */}
      <div className="zodiac-topbar">
        <TopBar />
      </div>

      {/* TOP MODAL */}
      {layout.showTopModal && (
        <div
          className={`zodiac-top ${
            layout.layout === "DETAIL_MODE" ? "h-full" : "h-[40%]"
          }`}
        >
          <TopModal />
        </div>
      )}

      {/* DOWN MODAL */}
      {layout.layout === "DETAIL_MODE" ? null : (
        <div className="zodiac-down">
          <DownModal />
        </div>
      )}
    </div>
  );
}
