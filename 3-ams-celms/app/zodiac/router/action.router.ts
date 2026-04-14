// "use client";

// import { useZodiac } from "../store/zodiac.store";
// import { useProcessStore } from "../store/process.store";
// import { useModalStore } from "../store/useModalStore";

// /**
//  * Single source of truth for all UI actions
//  */
// export type AppAction =
//   | {
//       type: "screen";
//       screenId: string;
//       mode?: "SPLIT" | "DETAIL";
//     }
//   | {
//       type: "process";
//       processId: string;
//       step: number;
//       data?: Record<string, any>;
//     }
//   | {
//       type: "modal";
//       zone: "TOP" | "DOWN";
//       component: React.ComponentType<any>; // Direct injection of the component
//     }
//   | {
//       type: "back";
//     }
//   | {
//       type: "custom";
//       handler: () => void;
//     };

// /**
//  * CORE EXECUTION ENGINE
//  */
// export function executeAction(action: AppAction | null) {
//   if (!action) return;

//   switch (action.type) {
//     case "screen": {
//       const { setScreen } = useZodiac.getState();
//       setScreen(action.screenId as any, action.mode);
//       break;
//     }

//     case "process": {
//       const store = useProcessStore.getState();
//       store.updateStep(action.processId, action.step);
//       if (action.data) {
//         store.updateData(action.processId, action.data);
//       }
//       break;
//     }

//     case "modal": {
//       const modalStore = useModalStore.getState();
//       // Directly opens the specific component passed from the UI
//       modalStore.openModal(action.zone, action.component);
//       break;
//     }

//     case "back": {
//       useZodiac.getState().goBack();
//       break;
//     }

//     case "custom": {
//       action.handler();
//       break;
//     }
//   }
// }
