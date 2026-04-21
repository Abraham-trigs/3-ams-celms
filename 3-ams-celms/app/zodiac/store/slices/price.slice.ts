import { StateCreator } from "zustand";
import { PriceItem } from "@zodiac/types/zodiac.types";
import { priceSync } from "@zodiac/lib/api/sync/price.sync";

export interface PriceSlice {
  prices: PriceItem[];
  setPrices: (data: PriceItem[]) => void;
  updatePrice: (id: string, price: number) => void;

  loadPrices: () => Promise<void>;
}

export const createPriceSlice: StateCreator<PriceSlice> = (set) => ({
  prices: [],

  setPrices: (data) => set({ prices: data }),

  updatePrice: (id, price) =>
    set((state) => ({
      prices: state.prices.map((p) =>
        p.id === id ? { ...p, priceGHS: price } : p,
      ),
    })),

  loadPrices: async () => {
    const orgId = "CURRENT_ORG"; // replace later with auth store

    const res = await priceSync.list(orgId);

    // API returns: { data }
    const data = res?.data?.data ?? [];

    set({ prices: data });
  },
});
