"use client";

import { create } from "zustand";

interface ModalStore {
  TopComponent: React.ComponentType<any> | null;
  DownComponent: React.ComponentType<any> | null;

  // Accept the actual Component as an argument
  openModal: (
    zone: "TOP" | "DOWN",
    component: React.ComponentType<any>,
  ) => void;
  closeModal: (zone: "TOP" | "DOWN") => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  TopComponent: null,
  DownComponent: null,

  openModal: (zone, component) =>
    set({
      [zone === "TOP" ? "TopComponent" : "DownComponent"]: component,
    }),

  closeModal: (zone) =>
    set({
      [zone === "TOP" ? "TopComponent" : "DownComponent"]: null,
    }),

  closeAll: () => set({ TopComponent: null, DownComponent: null }),
}));
