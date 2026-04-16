import { StoreApi } from "zustand";
import { PriceSlice } from "../slices/price.slice";
import { InventorySlice } from "../slices/inventory.slice";
import { JobSlice } from "../slices/job.slice";
import { calculateJobCost } from "@/store/domain/job.engine";

export const createJobAction =
  (
    set: StoreApi<PriceSlice & InventorySlice & JobSlice>["setState"],
    get: StoreApi<PriceSlice & InventorySlice & JobSlice>["getState"],
  ) =>
  (job: any, materialUsed: number) => {
    const service = get().prices.find((p) => p.id === job.serviceId);

    if (!service) return;

    const totalPrice = calculateJobCost(job, service);

    set((state) => ({
      jobs: [{ ...job, totalPrice }, ...state.jobs],
      inventory: state.inventory.map((i) =>
        i.id === service.stock_ref
          ? {
              ...i,
              totalRemaining: Math.max(0, i.totalRemaining - materialUsed),
            }
          : i,
      ),
    }));
  };
