import { SCREEN_MAP, ScreenID } from "../view/screen.registry";
import { ViewMode } from "../store/zodiac.store";

export function resolveLayout(activeScreenId: ScreenID, viewMode: ViewMode) {
  const screenConfig = SCREEN_MAP[activeScreenId];
  const isDetail = viewMode === "DETAIL";

  return {
    // Return the percentage string for the CSS transition in the Shell
    topHeightStyle: isDetail ? "100%" : "40%",
    showDownZone: !isDetail,

    // Extract both zones from the screen config in the registry
    TopZoneComponent: screenConfig?.TopComponent,
    DownZoneComponent: screenConfig?.DownComponent,
  };
}
