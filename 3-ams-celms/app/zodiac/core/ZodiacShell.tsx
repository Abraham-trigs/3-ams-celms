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

  useEffect(() => {
    if (!sharedAction) return;

    sharedAction.onPress?.();
    setSharedAction(null);
  }, [sharedAction, setSharedAction]);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace("/", "").toUpperCase();
      if (!path) return;

      setScreen(path as ScreenID);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [setScreen]);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "").toUpperCase();
    if (!path) return;

    setScreen(path as ScreenID);
  }, [setScreen]);

  const cached = getCachedScreen(activeScreenId);

  const TopRender = TopModal || cached.Top || TopZoneComponent;
  const DownRender = DownModal || cached.Down || DownZoneComponent;

  // 🔥 NEW: predictive warmup on screen change
  useEffect(() => {
    useZodiac.getState().predictNextScreen(activeScreenId);
  }, [activeScreenId]);

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

      <TopBar />

      <div
        className={`zodiac-top transition-all duration-500 overflow-hidden relative ${
          isTransitioning ? "opacity-80 scale-[0.99]" : "opacity-100 scale-100"
        }`}
        style={{ height: topHeightStyle }}
      >
        {TopRender && <TopRender key={`top-${activeScreenId}`} />}
      </div>

      {showDownZone && (
        <div className="zodiac-down flex-1 overflow-hidden relative">
          {DownRender && <DownRender key={`down-${activeScreenId}`} />}
        </div>
      )}

      <BottomBar />
    </div>
  );
}
