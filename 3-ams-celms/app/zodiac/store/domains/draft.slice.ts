import { generateJobRef } from "../shared/generateRef";

/**
 * Default draft factory
 * Ensures clean reset + avoids duplication
 */
const createDefaultDraft = () => ({
  id: generateJobRef(),
  clientName: "",
  serviceId: "",
  quantity: 1,
  width: 0,
  height: 0,
  deliveryType: "PHYSICAL_PICKUP",
});

export const createDraftSlice = (set, get) => ({
  draft: createDefaultDraft(),

  setDraft: (updates) =>
    set((state) => ({
      draft: { ...state.draft, ...updates },
    })),

  resetDraft: () =>
    set({
      draft: createDefaultDraft(),
    }),

  /**
   * ⚠ NOTE:
   * This logic should ideally be moved to a selector or domain helper
   * to avoid cross-slice coupling.
   */
  calculateLiveEstimate: () => {
    const state = get();

    const service = state.prices.find((p) => p.id === state.draft.serviceId);

    if (!service) return 0;

    const units =
      service.category === "Large Format" || service.unit === "sqft"
        ? state.draft.width * state.draft.height
        : 1;

    return Math.max(0, units * state.draft.quantity * service.priceGHS);
  },
});
