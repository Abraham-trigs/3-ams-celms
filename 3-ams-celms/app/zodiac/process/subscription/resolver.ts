// // /process/subscription/resolver.ts

// import { StepBlueprint } from "./types";

// export const resolveProcessActions = (args: {
//   stepIndex: number;
//   steps: StepBlueprint[];
//   data: any;
// }) => {
//   const step = args.steps[args.stepIndex];
//   const isFirst = args.stepIndex === 0;
//   const isLast = args.stepIndex === args.steps.length - 1;

//   const actions = step.actions;

//   return {
//     cancel: actions.includes("cancel")
//       ? {
//           role: "cancel",
//           label: "Cancel",
//         }
//       : null,

//     back:
//       actions.includes("back") && !isFirst
//         ? {
//             role: "back",
//             label: "Back",
//             prevStep: args.stepIndex - 1,
//           }
//         : null,

//     next: actions.includes("next")
//       ? {
//           role: "next",
//           label: isLast ? "Complete" : "Next",
//           nextStep: isLast ? args.stepIndex : args.stepIndex + 1,
//           data: args.data,
//         }
//       : null,
//   };
// };
