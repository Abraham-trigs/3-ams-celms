"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PriceItem {
  id: string;
  name: string;
  priceGHS: number;
  unit: "Per Sq Meter" | "Per Unit" | "Per Set";
}

interface PriceStore {
  services: PriceItem[];
  addService: (item: PriceItem) => void;
  updatePrice: (id: string, newPrice: number) => void;
  getCostForItem: (id: string) => number;
  calculateEstimate: (
    serviceId: string,
    quantity: number,
    dimensions?: { w: number; h: number },
  ) => number;
}

export const usePriceStore = create<PriceStore>()(
  persist(
    (set, get) => ({
      services: [],

      getCostForItem: (id) => {
        const service = get().services.find((s) => s.id === id);
        return service ? service.priceGHS : 0;
      },

      addService: (item) =>
        set((state) => ({ services: [...state.services, item] })),

      updatePrice: (id, newPrice) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, priceGHS: newPrice } : s,
          ),
        })),

      calculateEstimate: (serviceId, quantity, dimensions) => {
        const service = get().services.find((s) => s.id === serviceId);
        if (!service) return 0;
        if (service.unit === "Per Sq Meter" && dimensions) {
          return dimensions.w * dimensions.h * service.priceGHS * quantity;
        }
        return service.priceGHS * quantity;
      },
    }),
    { name: "zodiac-price-engine" },
  ),
);
