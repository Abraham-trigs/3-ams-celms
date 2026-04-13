// app/zodiac/store/modal.store.ts
"use client";

import { create } from "zustand";

export type ModalZone = "TOP" | "DOWN";

export type ModalState = {
  activeTopModal: string | null;
  activeDownModal: string | null;
};

interface ModalStore {
  state: ModalState;

  openModal: (zone: ModalZone, modalId: string) => void;
  closeModal: (zone: ModalZone) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  state: {
    activeTopModal: null,
    activeDownModal: null,
  },

  openModal: (zone, modalId) => {
    set((state) => ({
      state: {
        ...state.state,
        ...(zone === "TOP"
          ? { activeTopModal: modalId }
          : { activeDownModal: modalId }),
      },
    }));
  },

  closeModal: (zone) => {
    set((state) => ({
      state: {
        ...state.state,
        ...(zone === "TOP"
          ? { activeTopModal: null }
          : { activeDownModal: null }),
      },
    }));
  },

  closeAll: () => {
    set({
      state: {
        activeTopModal: null,
        activeDownModal: null,
      },
    });
  },
}));
