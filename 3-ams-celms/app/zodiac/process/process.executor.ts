// import { useZodiac } from "../store/zodiac.store";
// import { useProcessStore } from "../store/process.store";
// import { ProcessAction } from "./action.types";

// export function executeProcessAction(action: ProcessAction) {
//   const zodiac = useZodiac.getState();
//   const process = useProcessStore.getState();

//   switch (action.type) {
//     case "cancel":
//       zodiac.goBack();
//       return;

//     case "back":
//       if (action.processId) {
//         process.processPrevStep(action.processId);
//       }
//       zodiac.goBack();
//       return;

//     case "next":
//       if (action.processId && action.nextStep !== undefined) {
//         process.processNextStep(action.processId, action.nextStep);

//         if (action.data) {
//           process.processUpdateData(action.processId, action.data);
//         }
//       }

//       if (action.nextScreenId) {
//         zodiac.setScreen(action.nextScreenId, action.nextViewMode);
//       }
//       return;
//   }
// }
