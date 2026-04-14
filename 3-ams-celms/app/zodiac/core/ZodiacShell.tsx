"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useModalStore } from "../store/useModalStore";
import { resolveLayout } from "../view/layout.engine";
import { TopBar } from "../ui/TopBar";
import { BottomBar } from "../ui/BottomBar";
import { ScreenID } from "../view/screen.registry";
import { getCachedScreen } from "../view/screen.cache";

export function ZodiacShell() {
  const { activeScreenId, viewMode, sharedAction, setSharedAction, setScreen } =
    useZodiac();

  const TopModal = useModalStore((s) => s.activeTopComponent);
  const DownModal = useModalStore((s) => s.activeDownComponent);
  const DetailModal = useModalStore((s) => s.activeDetailComponent);
  const GlobalModal = useModalStore((s) => s.activeGlobalComponent);

  const {
    isTransitioning,
    topHeightStyle,
    showDownZone,
    TopZoneComponent,
    DownZoneComponent,
  } = resolveLayout(activeScreenId, viewMode);

  const isDetail = viewMode === "DETAIL";

  useEffect(() => {
    if (!sharedAction) return;
    sharedAction.onPress?.();
    setSharedAction(null);
  }, [sharedAction, setSharedAction]);

  useEffect(() => {
    const syncFromUrl = () => {
      const path = window.location.pathname.replace("/", "").toUpperCase();
      if (path) setScreen(path as ScreenID);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [setScreen]);

  const cached = getCachedScreen(activeScreenId);
  const TopRender = TopModal || cached.Top || TopZoneComponent;
  const DownRender = DownModal || cached.Down || DownZoneComponent;

  return (
    <div className="zodiac-shell flex flex-col h-full overflow-hidden bg-black text-white relative">
      {GlobalModal && (
        <div className="absolute inset-0 z-[100] bg-black/80 flex items-center justify-center">
          <GlobalModal />
        </div>
      )}

      {DetailModal && (
        <div className="absolute inset-0 z-50 bg-black">
          <DetailModal />
        </div>
      )}

      <header className="zodiac-topbar pt-2 shrink-0">
        <TopBar />
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <section
          className={`zodiac-top transition-all duration-500 relative z-10 ${
            isTransitioning
              ? "opacity-80 scale-[0.99]"
              : "opacity-100 scale-100"
          }`}
          style={{ height: topHeightStyle }}
        >
          <div className="modal-box p-4 h-full">
            {TopRender && <TopRender key={`top-${activeScreenId}`} />}
          </div>
        </section>

        <section
          className="zodiac-down flex-1 overflow-hidden relative transition-all duration-500"
          style={{
            opacity: !showDownZone || isDetail ? 0 : 1,
            transform:
              !showDownZone || isDetail
                ? "translateY(40px)"
                : "translateY(0px)",
            pointerEvents: !showDownZone || isDetail ? "none" : "auto",
          }}
        >
          <div className="modal-box p-4 h-full">
            {DownRender && <DownRender key={`down-${activeScreenId}`} />}
          </div>
        </section>
      </main>

      <footer className="mt-auto shrink-0">
        <BottomBar />
      </footer>
    </div>
  );
}
