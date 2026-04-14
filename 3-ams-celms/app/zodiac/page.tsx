"use client";

import { useZodiac } from "./store/zodiac.store";
import { useModalStore } from "./store/useModalStore"; // Listen to injections
import { resolveLayout } from "./view/layout.engine";
import { TopBar } from "./ui/TopBar";
import { BottomBar } from "./ui/BottomBar";

export default function ZodiacPage() {
  const { activeScreenId, viewMode } = useZodiac();

  // 1. Get the Hand-Picked components from the store
  const { activeTopComponent: InjectedTop, activeDownComponent: InjectedDown } =
    useModalStore();

  const layout = resolveLayout(activeScreenId, viewMode);
  const isDetail = viewMode === "DETAIL";

  // 2. PRIORITY: Injected Component > Default Screen Component
  const TopContent = InjectedTop || layout.TopZoneComponent;
  const DownContent = InjectedDown || layout.DownZoneComponent;

  const topH = isDetail ? "100%" : "45%";
  const downH = isDetail ? "0%" : "55%";

  return (
    <div className="zodiac-shell flex flex-col h-full bg-black text-white overflow-hidden">
      <header className="zodiac-topbar pt-2 shrink-0">
        <TopBar />
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* ZONE 1: TOP (The Expander) */}
        <section
          className="zodiac-top transition-all duration-500 relative z-10"
          style={{ height: topH }}
        >
          <div className="modal-box p-4 h-full">
            {TopContent && <TopContent />}
          </div>
        </section>

        {/* ZONE 2: DOWN (The Pushed Element) */}
        {!isDetail && (
          <section
            className="zodiac-down transition-all duration-500"
            style={{
              height: downH,
              opacity: isDetail ? 0 : 1,
              transform: isDetail ? "translateY(40px)" : "translateY(0px)",
              pointerEvents: isDetail ? "none" : "auto",
            }}
          >
            <div className="modal-box p-4 h-full">
              {DownContent && <DownContent />}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-auto shrink-0">
        <BottomBar />
      </footer>
    </div>
  );
}
