// "use client";

// import { create } from "zustand";
// import { ComponentType } from "react";
// import { ModalZone } from "../types/shared-action.types";

// interface ModalState {
//   activeTopComponent: ComponentType<any> | null;
//   activeDownComponent: ComponentType<any> | null;
//   activeDetailComponent: ComponentType<any> | null;
//   activeGlobalComponent: ComponentType<any> | null;

//   openModal: (zone: ModalZone, component: ComponentType<any>) => void;
//   closeModal: (zone: ModalZone) => void;
//   closeAll: () => void;
// }

// export const useModalStore = create<ModalState>((set, get) => ({
//   activeTopComponent: null,
//   activeDownComponent: null,
//   activeDetailComponent: null,
//   activeGlobalComponent: null,

//   openModal: (zone, component) => {
//     const keyMap: Record<ModalZone, keyof ModalState> = {
//       TOP: "activeTopComponent",
//       DOWN: "activeDownComponent",
//       DETAIL: "activeDetailComponent",
//       GLOBAL: "activeGlobalComponent",
//     };

//     const key = keyMap[zone];
//     const current = get()[key];

//     // 🔥 IMPORTANT: prevent infinite update loop
//     if (current === component) return;

//     set({ [key]: component } as Partial<ModalState>);
//   },

//   closeModal: (zone) =>
//     set((state) => ({
//       ...state,
//       [zone === "TOP"
//         ? "activeTopComponent"
//         : zone === "DOWN"
//           ? "activeDownComponent"
//           : zone === "DETAIL"
//             ? "activeDetailComponent"
//             : "activeGlobalComponent"]: null,
//     })),

//   closeAll: () =>
//     set({
//       activeTopComponent: null,
//       activeDownComponent: null,
//       activeDetailComponent: null,
//       activeGlobalComponent: null,
//     }),
// }));
