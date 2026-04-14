"use client";

import { create } from "zustand";

type ModalZone = "TOP" | "DOWN" | "DETAIL" | "GLOBAL";

interface ModalState {
  activeTopComponent: React.ComponentType<any> | null;
  activeDownComponent: React.ComponentType<any> | null;
  activeDetailComponent: React.ComponentType<any> | null;
  activeGlobalComponent: React.ComponentType<any> | null;

  openModal: (component: React.ComponentType<any>, zone?: ModalZone) => void;
  closeModal: (zone: ModalZone) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeTopComponent: null,
  activeDownComponent: null,
  activeDetailComponent: null,
  activeGlobalComponent: null,

  openModal: (zone, component) => {
    const keyMap: Record<ModalZone, keyof ModalState> = {
      TOP: "activeTopComponent",
      DOWN: "activeDownComponent",
      DETAIL: "activeDetailComponent",
      GLOBAL: "activeGlobalComponent",
    };

    set({ [keyMap[zone]]: component });
  },

  closeModal: (zone) => {
    const keyMap = {
      TOP: "activeTopComponent",
      DOWN: "activeDownComponent",
      DETAIL: "activeDetailComponent",
      GLOBAL: "activeGlobalComponent",
    };

    set({ [keyMap[zone]]: null });
  },

  closeAll: () =>
    set({
      activeTopComponent: null,
      activeDownComponent: null,
      activeDetailComponent: null,
      activeGlobalComponent: null,
    }),
}));
