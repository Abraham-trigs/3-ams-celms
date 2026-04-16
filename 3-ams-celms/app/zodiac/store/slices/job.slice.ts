import { StateCreator } from "zustand";
import { JobTicket } from "@/types/zodiac.types";

export interface JobSlice {
  jobs: JobTicket[];
  setJobs: (data: JobTicket[]) => void;

  addJob: (job: JobTicket) => void;
  updateJobStatus: (id: string, status: JobTicket["status"]) => void;
  assignStaff: (id: string, staffId: string) => void;
  confirmPayment: (id: string, ref: string) => void;
}

export const createJobSlice: StateCreator<JobSlice> = (set) => ({
  jobs: [],

  setJobs: (data) => set({ jobs: data }),

  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),

  updateJobStatus: (id, status) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
    })),

  assignStaff: (id, staffId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === id ? { ...j, assignedStaffId: staffId } : j,
      ),
    })),

  confirmPayment: (id, ref) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === id ? { ...j, isPaid: true, paymentRef: ref } : j,
      ),
    })),
});
