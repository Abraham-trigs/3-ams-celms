"use client";

import { useZodiac } from "./store/zodiac.store";
import { resolveLayout } from "./view/layout.engine";
import { TopBar } from "./ui/TopBar";
import { BottomBar } from "./ui/BottomBar";

export default function ZodiacPage() {
  const { activeScreenId, viewMode } = useZodiac();
  const layout = resolveLayout(activeScreenId, viewMode);

  const isDetail = viewMode === "DETAIL";

  // Explicit heights to ensure the browser doesn't "guess" the layout
  const topH = isDetail ? "100%" : "45%";
  const downH = isDetail ? "0%" : "55%";

  return (
    <div className="zodiac-shell">
      <header className="zodiac-topbar pt-2">
        <TopBar />
      </header>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* ZONE 1: TOP MODAL (The Expander) */}
        <section
          className="zodiac-top"
          style={{
            height: topH,
            zIndex: 2, // Keep this on top so it "covers" the bottom as it grows
          }}
        >
          <div className="modal-box p-4 h-full">
            <div className="h-full w-full overflow-hidden">
              {layout.TopZoneComponent && <layout.TopZoneComponent />}
            </div>
          </div>
        </section>

        {/* ZONE 2: DOWN MODAL (The Pushed Element) */}
        <section
          className="zodiac-down"
          style={{
            height: downH,
            opacity: isDetail ? 0 : 1,
            // Both modes now use the push/pull transform
            transform: isDetail ? "translateY(40px)" : "translateY(0px)",
            // Slight delay when opening to let Top Modal lead the "push"
            transitionDelay: isDetail ? "0.05s" : "0.05s",
            paddingTop: isDetail ? 0 : 10,
            paddingBottom: isDetail ? 0 : 10,
            overflow: "hidden",
            pointerEvents: isDetail ? "none" : "auto",
          }}
        >
          <div className="modal-box p-4 h-full">
            <div
              className={`h-full w-full transition-opacity duration-300 ${
                isDetail ? "opacity-0" : "opacity-100"
              }`}
            >
              {layout.DownZoneComponent && <layout.DownZoneComponent />}
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-auto">
        <BottomBar />
      </footer>
    </div>
  );
}
