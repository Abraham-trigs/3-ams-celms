import { create } from "zustand";
import {
  PriceItem,
  StockItem,
  JobTicket,
  JobFileVersion,
  JobFilesContainer,
} from "../types/zodiac.types";

interface DataState {
  prices: PriceItem[];
  inventory: StockItem[];
  jobs: JobTicket[];
  jobFiles: Record<string, JobFilesContainer>;
  isLoading: boolean;

  // HYDRATION (Async for Prisma/API migration advantage)
  initData: () => Promise<void>;

  // PRICE MANAGEMENT
  updatePrice: (serviceId: string, newPrice: number) => void;

  // STOCK MANAGEMENT
  restockItem: (materialId: string, quantity: number, unitCost: number) => void;

  // JOB ENGINE
  createJob: (job: JobTicket, materialUsed: number) => void;
  updateJobStatus: (jobId: string, status: JobTicket["status"]) => void;

  // WASTAGE & FILES
  recordWastage: (jobId: string, amount: number) => void;
  addFileVersion: (jobId: string, version: JobFileVersion) => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  prices: [],
  inventory: [],
  jobs: [],
  jobFiles: {},
  isLoading: false,

  initData: async () => {
    set({ isLoading: true });
    try {
      // Dynamic fetch mimics real API behavior
      const response = await fetch("/price-list.json");
      if (!response.ok) throw new Error("Failed to sync with data source");

      const data = await response.json();

      set({
        prices: data.services,
        inventory: data.inventory,
        jobs: data.jobs || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Data Hydration Error:", error);
      set({ isLoading: false });
    }
  },

  updatePrice: (serviceId, newPrice) =>
    set((state) => ({
      prices: state.prices.map((p) =>
        p.id === serviceId ? { ...p, priceGHS: newPrice } : p,
      ),
    })),

  restockItem: (materialId, quantity, unitCost) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === materialId
          ? {
              ...item,
              totalRemaining: item.totalRemaining + quantity,
              lastUnitCost: unitCost,
            }
          : item,
      ),
    })),

  createJob: (job, materialUsed) => {
    const service = get().prices.find((p) => p.id === job.serviceId);
    const materialId = service?.stock_ref;

    set((state) => ({
      jobs: [job, ...state.jobs],
      // Feature 8.2: Automatic deduction logic
      inventory: state.inventory.map((item) =>
        item.id === materialId
          ? { ...item, totalRemaining: item.totalRemaining - materialUsed }
          : item,
      ),
    }));
  },

  updateJobStatus: (jobId, status) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, status } : j)),
    })),

  recordWastage: (jobId, amount) => {
    const job = get().jobs.find((j) => j.id === jobId);
    const service = get().prices.find((p) => p.id === job?.serviceId);
    const materialId = service?.stock_ref;

    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === materialId
          ? { ...item, totalRemaining: item.totalRemaining - amount }
          : item,
      ),
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, materialWastage: amount } : j,
      ),
    }));
  },

  addFileVersion: (jobId, version) =>
    set((state) => {
      const container = state.jobFiles[jobId] || {
        jobId,
        currentActiveVersionId: version.versionId,
        versions: [],
      };

      return {
        jobFiles: {
          ...state.jobFiles,
          [jobId]: {
            ...container,
            currentActiveVersionId: version.versionId,
            versions: [version, ...container.versions],
          },
        },
      };
    }),
}));
