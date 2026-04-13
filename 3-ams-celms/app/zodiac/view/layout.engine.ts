import { SCREEN_MAP, ScreenID } from "./screen.registry";
import { ViewMode } from "../store/zodiac.store";

export function resolveLayout(activeScreenId: ScreenID, viewMode: ViewMode) {
  const screenConfig = SCREEN_MAP[activeScreenId];
  const isDetail = viewMode === "DETAIL";

  return {
    topHeightStyle: isDetail ? "100%" : "40%",
    showDownZone: !isDetail,
    // Extract both zones from the screen config
    TopZoneComponent: screenConfig?.TopComponent,
    DownZoneComponent: screenConfig?.DownComponent,
  };
}
