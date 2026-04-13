export type ViewMode = "SPLIT" | "DETAIL";

export type ModalZone = "TOP" | "DOWN";

export type ZodiacViewState = {
  activeTopModal: string | null;
  activeDownModal: string | null;

  viewMode: ViewMode;

  focusMode: boolean;
};
