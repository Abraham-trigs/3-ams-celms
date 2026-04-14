// app/zodiac/store/modal.store.ts
"use client";

import { create } from "zustand";

export type ModalZone = "TOP" | "DOWN";

/**
 * Define all allowed modals here for safety
 * (this prevents string chaos later)
 */
export type TopModalId = "WELCOME" | "JOB_CREATE" | "WASTE" | "PAYMENT" | null;

export type DownModalId = "JOB_LIST" | "CLIENT_LIST" | "STOCK_VIEW" | null;

interface ModalStore {
  activeTopModal: TopModalId;
  activeDownModal: DownModalId;

  openModal: (zone: ModalZone, modalId: string) => void;
  closeModal: (zone: ModalZone) => void;
  closeAll: () => void;

  setTopModal: (id: TopModalId) => void;
  setDownModal: (id: DownModalId) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeTopModal: "WELCOME",
  activeDownModal: "JOB_LIST",

  openModal: (zone, modalId) => {
    set((state) => ({
      ...(zone === "TOP"
        ? { activeTopModal: modalId as TopModalId }
        : { activeDownModal: modalId as DownModalId }),
    }));
  },

  closeModal: (zone) => {
    set((state) => ({
      ...(zone === "TOP"
        ? { activeTopModal: null }
        : { activeDownModal: null }),
    }));
  },

  closeAll: () => {
    set({
      activeTopModal: null,
      activeDownModal: null,
    });
  },

  setTopModal: (id) => set({ activeTopModal: id }),
  setDownModal: (id) => set({ activeDownModal: id }),
}));
