import { StateCreator } from "zustand";
import { StockItem } from "@/types/zodiac.types";
import { addStock, subtractStock } from "@/store/domain/inventory.engine";

export interface InventorySlice {
  inventory: StockItem[];
  setInventory: (data: StockItem[]) => void;
  restock: (id: string, qty: number, cost: number) => void;
  consumeStock: (id: string, qty: number) => void;
}

export const createInventorySlice: StateCreator<InventorySlice> = (set) => ({
  inventory: [],

  setInventory: (data) => set({ inventory: data }),

  restock: (id, qty, cost) =>
    set((state) => ({
      inventory: state.inventory.map((i) =>
        i.id === id ? addStock(i, qty, cost) : i,
      ),
    })),

  consumeStock: (id, qty) =>
    set((state) => ({
      inventory: state.inventory.map((i) =>
        i.id === id ? subtractStock(i, qty) : i,
      ),
    })),
});
