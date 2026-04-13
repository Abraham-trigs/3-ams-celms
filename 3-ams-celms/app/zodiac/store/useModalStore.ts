import { create } from "zustand";

type ModalType =
  | "CREATE_COMPANY"
  | "CREATE_JOB"
  | "COMPLETE_JOB"
  | "WASTE_ENTRY"
  | "PAYMENT"
  | "STOCK_MOVEMENT"
  | "ESTIMATE";

type ModalState = {
  type: ModalType | null;
  data?: any;

  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,

  openModal: (type, data) => set({ type, data }),

  closeModal: () => set({ type: null, data: null }),
}));
