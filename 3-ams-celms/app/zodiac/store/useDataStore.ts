import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateJobRef } from "../utils/generateRef";
import {
  PriceItem,
  StockItem,
  JobTicket,
  JobFileVersion,
  JobFilesContainer,
  DeliveryRecord,
} from "../types/zodiac.types";

interface DataState {
  prices: PriceItem[];
  inventory: StockItem[];
  jobs: JobTicket[];
  deliveries: DeliveryRecord[];
  jobFiles: Record<string, JobFilesContainer>;
  isLoading: boolean;

  // UTILITIES
  getUniqueJobRef: () => string;
  clearStore: () => void; // ✅ Added to interface

  // HYDRATION
  initData: () => Promise<void>;

  // PRICE MANAGEMENT
  updatePrice: (serviceId: string, newPrice: number) => void;

  // STOCK MANAGEMENT
  restockItem: (materialId: string, quantity: number, unitCost: number) => void;

  // JOB ENGINE
  createJob: (job: JobTicket, materialUsed: number) => void;
  updateJobStatus: (jobId: string, status: JobTicket["status"]) => void;

  // STAFF MANAGEMENT
  assignStaff: (jobId: string, staffId: string) => void;

  // PAYMENT MANAGEMENT
  confirmPayment: (jobId: string, reference: string) => void;

  // DELIVERY MANAGEMENT
  addDelivery: (delivery: DeliveryRecord) => void;
  updateDelivery: (id: string, updates: Partial<DeliveryRecord>) => void;

  // WASTAGE & FILES
  recordWastage: (jobId: string, amount: number) => void;
  addFileVersion: (jobId: string, version: JobFileVersion) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      prices: [],
      inventory: [],
      jobs: [],
      deliveries: [],
      jobFiles: {},
      isLoading: false,

      getUniqueJobRef: () => {
        const { jobs } = get();
        let newRef = generateJobRef();
        while (jobs.some((job) => job.id === newRef)) {
          newRef = generateJobRef();
        }
        return newRef;
      },

      // ✅ Implementation: Removes all successful jobs to free up quota
      clearCompletedJobs: () => {
        set((state) => ({
          jobs: state.jobs.filter((job) => job.status !== "SUCCESSFUL"),
        }));
      },

      // ✅ Implementation: Resets state to initial and clears localStorage
      clearStore: () => {
        set({
          prices: [],
          inventory: [],
          jobs: [],
          deliveries: [],
          jobFiles: {},
          isLoading: false,
        });
      },

      initData: async () => {
        if (get().prices.length > 0) return;

        set({ isLoading: true });
        try {
          const response = await fetch("/price-list.json");
          if (!response.ok) throw new Error("Failed to sync with data source");
          const data = await response.json();

          set({
            prices: data.services,
            inventory: data.inventory,
            jobs: data.jobs || [],
            deliveries: data.deliveries || [],
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

      assignStaff: (jobId, staffId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, assignedStaffId: staffId } : j,
          ),
        })),

      confirmPayment: (jobId, reference) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, isPaid: true, paymentRef: reference } : j,
          ),
        })),

      addDelivery: (delivery) =>
        set((state) => ({
          deliveries: [delivery, ...state.deliveries],
        })),

      updateDelivery: (id, updates) =>
        set((state) => ({
          deliveries: state.deliveries.map((d) =>
            d.id === id ? { ...d, ...updates } : d,
          ),
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
    }),
    {
      name: "zodiac-store-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
