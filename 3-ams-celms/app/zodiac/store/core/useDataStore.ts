import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPriceSlice } from "../slices/price.slice";
import { createInventorySlice } from "../slices/inventory.slice";
import { createJobSlice } from "../slices/job.slice";
import { createDraftSlice } from "../slices/draft.slice";

export const useDataStore = create(
  persist(
    (...a) => ({
      ...createPriceSlice(...a),
      ...createInventorySlice(...a),
      ...createJobSlice(...a),
      ...createDraftSlice(...a),
    }),
    {
      name: "zodiac-store",
    },
  ),
);
