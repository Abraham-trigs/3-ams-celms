import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPriceSlice } from "../slices/price.slice";
import { createInventorySlice } from "../slices/inventory.slice";
import { createJobSlice } from "../slices/job.slice";
import { createDraftSlice } from "../slices/draft.slice";
import { createStaffSlice } from "../slices/staff.slice";
import { createPaymentSlice } from "../slices/payment.slice";

export const useDataStore = create(
  persist(
    (set, get, api) => ({
      ...createDraftSlice(set, get, api),

      ...createPriceSlice(set, get, api),
      ...createInventorySlice(set, get, api),
      ...createJobSlice(set, get, api),
      ...createStaffSlice(set, get, api),
      ...createPaymentSlice(set, get, api),

      initData: async () => {
        const { loadPrices, loadInventory, loadJobs, loadStaff } = get();

        await Promise.all([
          loadPrices?.(),
          loadInventory?.(),
          loadJobs?.(),
          loadStaff?.(),
        ]);
      },
    }),
    {
      name: "zodiac-store",
      partialize: (state: any) => ({
        draft: state.draft,
      }),
    },
  ),
);
