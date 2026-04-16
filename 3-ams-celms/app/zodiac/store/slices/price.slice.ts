import { StateCreator } from "zustand";
import { PriceItem } from "@/types/zodiac.types";

export interface PriceSlice {
  prices: PriceItem[];
  setPrices: (data: PriceItem[]) => void;
  updatePrice: (id: string, price: number) => void;
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
});
