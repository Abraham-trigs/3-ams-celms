"use client";

import { create } from "zustand";
import { ComponentType } from "react";
import { ModalZone } from "../types/view.types";

interface ModalState {
  activeTopComponent: ComponentType<any> | null;
  activeDownComponent: ComponentType<any> | null;
  activeDetailComponent: ComponentType<any> | null;
  activeGlobalComponent: ComponentType<any> | null;

  /**
   * openModal: Injects a physical React component into a specific zone.
   * Storing the component reference directly ensures the Shell can render it
   * as a primary child immediately.
   */
  openModal: (zone: ModalZone, component: ComponentType<any>) => void;

  closeModal: (zone: ModalZone) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeTopComponent: null,
  activeDownComponent: null,
  activeDetailComponent: null,
  activeGlobalComponent: null,

  openModal: (zone, component) =>
    set((state) => ({
      ...state,
      [zone === "TOP"
        ? "activeTopComponent"
        : zone === "DOWN"
          ? "activeDownComponent"
          : zone === "DETAIL"
            ? "activeDetailComponent"
            : "activeGlobalComponent"]: component,
    })),

  closeModal: (zone) =>
    set((state) => ({
      ...state,
      [zone === "TOP"
        ? "activeTopComponent"
        : zone === "DOWN"
          ? "activeDownComponent"
          : zone === "DETAIL"
            ? "activeDetailComponent"
            : "activeGlobalComponent"]: null,
    })),

  closeAll: () =>
    set({
      activeTopComponent: null,
      activeDownComponent: null,
      activeDetailComponent: null,
      activeGlobalComponent: null,
    }),
}));
