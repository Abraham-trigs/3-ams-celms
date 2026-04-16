import { StateCreator } from "zustand";
import { generateJobRef } from "@/utils/generateRef";

export interface DraftSlice {
  draft: {
    id: string;
    clientName: string;
    serviceId: string;
    quantity: number;
    width: number;
    height: number;
    deliveryType: "PHYSICAL_PICKUP" | "PRINTER_DELIVERY";
  };

  setDraft: (patch: Partial<DraftSlice["draft"]>) => void;
  resetDraft: () => void;
}

export const createDraftSlice: StateCreator<DraftSlice> = (set) => ({
  draft: {
    id: generateJobRef(),
    clientName: "",
    serviceId: "",
    quantity: 1,
    width: 0,
    height: 0,
    deliveryType: "PHYSICAL_PICKUP",
  },

  setDraft: (patch) =>
    set((state) => ({
      draft: { ...state.draft, ...patch },
    })),

  resetDraft: () =>
    set({
      draft: {
        id: generateJobRef(),
        clientName: "",
        serviceId: "",
        quantity: 1,
        width: 0,
        height: 0,
        deliveryType: "PHYSICAL_PICKUP",
      },
    }),
});
