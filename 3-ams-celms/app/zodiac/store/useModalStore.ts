"use client";

import { create } from "zustand";

/**
 * We use React.ComponentType<any> to allow any valid
 * React component to be stored and rendered.
 */
interface ModalState {
  activeTopComponent: React.ComponentType<any> | null;
  activeDownComponent: React.ComponentType<any> | null;

  // Set the specific component into the desired zone
  openModal: (
    zone: "TOP" | "DOWN",
    component: React.ComponentType<any>,
  ) => void;

  // Clear a specific zone or both
  closeModal: (zone: "TOP" | "DOWN") => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeTopComponent: null,
  activeDownComponent: null,

  openModal: (zone, component) =>
    set((state) => ({
      ...(zone === "TOP"
        ? { activeTopComponent: component }
        : { activeDownComponent: component }),
    })),

  closeModal: (zone) =>
    set((state) => ({
      ...(zone === "TOP"
        ? { activeTopComponent: null }
        : { activeDownComponent: null }),
    })),

  closeAll: () =>
    set({
      activeTopComponent: null,
      activeDownComponent: null,
    }),
}));
