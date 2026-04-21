import { StateCreator } from "zustand";
import { generateJobRef } from "../shared/generateRef";

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

  calculateLiveEstimate: () => number;
}

export const createDraftSlice: StateCreator<DraftSlice> = (set, get) => ({
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

  calculateLiveEstimate: () => {
    const state = get();

    const selectedService = state.prices?.find(
      (p) => p.id === state.draft.serviceId,
    );

    if (!selectedService) return 0;

    return (selectedService.basePrice || 0) * (state.draft.quantity || 1);
  },
});
