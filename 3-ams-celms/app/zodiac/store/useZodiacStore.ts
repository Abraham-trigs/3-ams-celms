import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockData from "../data/db.json"; // Path to your Option 2 JSON file

export interface Material {
  id: string;
  name: string;
  unit: "meters" | "sheets";
  inStock: number;
  buyingPrice: number;
  sellingPrice: number;
  minThreshold: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
}

export interface Job {
  id: string;
  type: string;
  materialId: string;
  quantity: number;
  width?: number;
  height?: number;
  status: "PENDING" | "PROGRESS" | "SUCCESS" | "CANCELLED";
  totalPrice: number;
  createdAt: number;
}

interface ZodiacState {
  materials: Material[];
  services: Service[]; // Added for Selection Modal
  jobs: Job[];

  // Actions
  addMaterial: (m: Material) => void;
  updateMaterialStock: (mId: string, newAmount: number) => void;

  // Logic
  calculatePrice: (mId: string, qty: number, w?: number, h?: number) => number;
  createJob: (
    job: Omit<Job, "id" | "totalPrice" | "status" | "createdAt">,
  ) => void;
  updateJobStatus: (jobId: string, newStatus: Job["status"]) => void;

  // Internal Shortage Helpers
  getProjectedShortage: (mId: string) => number;
  checkAvailability: (
    mId: string,
    reqQty: number,
  ) => { canProceed: boolean; current: number };
}

export const useZodiacStore = create<ZodiacState>()(
  persist(
    (set, get) => ({
      // Initializing from static JSON (Option 2)
      materials: mockData.materials as Material[],
      services: mockData.services as Service[],
      jobs: [],

      calculatePrice: (mId, qty, w, h) => {
        const mat = get().materials.find((m) => m.id === mId);
        if (!mat) return 0;
        if (w && h) return w * h * mat.sellingPrice * qty;
        return mat.sellingPrice * qty;
      },

      createJob: (data) => {
        const price = get().calculatePrice(
          data.materialId,
          data.quantity,
          data.width,
          data.height,
        );
        const newJob: Job = {
          ...data,
          id: crypto.randomUUID(),
          totalPrice: price,
          status: "PENDING",
          createdAt: Date.now(),
        };
        set((state) => ({ jobs: [newJob, ...state.jobs] }));
      },

      updateJobStatus: (jobId, newStatus) => {
        const job = get().jobs.find((j) => j.id === jobId);
        if (!job) return;

        if (newStatus === "PROGRESS" && job.status === "PENDING") {
          const mat = get().materials.find((m) => m.id === job.materialId);
          if (mat) {
            const usage =
              job.width && job.height
                ? job.width * job.height * job.quantity
                : job.quantity;
            get().updateMaterialStock(mat.id, mat.inStock - usage);
          }
        }

        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, status: newStatus } : j,
          ),
        }));
      },

      getProjectedShortage: (mId) => {
        const mat = get().materials.find((m) => m.id === mId);
        if (!mat) return 0;

        const totalNeededForPending = get()
          .jobs.filter((j) => j.materialId === mId && j.status === "PENDING")
          .reduce((acc, job) => {
            const usage =
              job.width && job.height
                ? job.width * job.height * job.quantity
                : job.quantity;
            return acc + usage;
          }, 0);

        return mat.inStock - totalNeededForPending;
      },

      checkAvailability: (mId, reqQty) => {
        const mat = get().materials.find((m) => m.id === mId);
        return {
          canProceed: mat ? mat.inStock >= reqQty : false,
          current: mat ? mat.inStock : 0,
        };
      },

      updateMaterialStock: (id, amount) =>
        set((state) => ({
          materials: state.materials.map((m) =>
            m.id === id ? { ...m, inStock: amount } : m,
          ),
        })),

      addMaterial: (m) =>
        set((state) => ({ materials: [...state.materials, m] })),
    }),
    { name: "zodiac-engine" },
  ),
);
