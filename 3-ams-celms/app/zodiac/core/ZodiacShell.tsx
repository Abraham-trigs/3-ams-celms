"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useModalStore } from "../store/useModalStore";
import { resolveLayout } from "../view/layout.engine";
import { TopBar } from "../ui/TopBar";

export function ZodiacShell() {
  const { activeScreenId, viewMode, sharedAction, executeSharedAction } =
    useZodiac();

  // 1. Get the components directly from the store (Priority/Hand-picked)
  const TopModal = useModalStore((s) => s.activeTopComponent);
  const DownModal = useModalStore((s) => s.activeDownComponent);
  const DetailModal = useModalStore((s) => s.activeDetailComponent);
  const GlobalModal = useModalStore((s) => s.activeGlobalComponent);

  // 2. Get default components from the screen registry
  const { topHeightStyle, showDownZone, TopZoneComponent, DownZoneComponent } =
    resolveLayout(activeScreenId, viewMode);

  useEffect(() => {
    if (sharedAction) executeSharedAction();
  }, [sharedAction, executeSharedAction]);

  return (
    <div className="zodiac-shell relative flex flex-col h-full overflow-hidden bg-black text-white">
      {/* LAYER 4: GLOBAL */}
      {GlobalModal && (
        <div className="absolute inset-0 z-[100] bg-black/80 flex items-center justify-center">
          <GlobalModal />
        </div>
      )}

      {/* LAYER 3: DETAIL */}
      {DetailModal && (
        <div className="absolute inset-0 z-50 bg-black">
          <DetailModal />
        </div>
      )}

      <TopBar />

      {/* LAYER 1: TOP ZONE */}
      <div
        className="zodiac-top transition-all duration-500 overflow-hidden relative"
        style={{ height: topHeightStyle }}
      >
        {/* Priority: Modal > Default Screen Component */}
        {TopModal ? <TopModal /> : TopZoneComponent && <TopZoneComponent />}
      </div>

      {/* LAYER 2: DOWN ZONE */}
      {showDownZone && (
        <div className="zodiac-down flex-1 overflow-hidden relative">
          {DownModal ? (
            <DownModal />
          ) : (
            DownZoneComponent && <DownZoneComponent />
          )}
        </div>
      )}
    </div>
  );
}
