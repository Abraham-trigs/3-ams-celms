// "use client";

// import { useProcessStore } from "../store/process.store";

// interface SecondaryButtonProps {
//   processId: string;
//   label: string;
//   nextStep: number; // Pass (currentStep + 1) for forward, (currentStep - 1) for back
//   data?: Record<string, any>;
//   isBack?: boolean; // Optional flag for styling/icons
// }

// export function SecondaryActionButton({
//   processId,
//   label,
//   nextStep,
//   data,
//   isBack,
// }: SecondaryButtonProps) {
//   const { updateStep, updateData } = useProcessStore();

//   const handlePress = () => {
//     // 1. Move the step (Back or Forward)
//     updateStep(processId, nextStep);

//     // 2. Save data only if moving forward (usually don't save on back)
//     if (data && !isBack) {
//       updateData(processId, data);
//     }
//   };

//   return (
//     <button
//       onClick={handlePress}
//       className={`px-6 py-2 rounded-lg border active:scale-95 transition-all flex items-center gap-2 ${
//         isBack ? "border-white/10 bg-transparent" : "border-white/20 bg-white/5"
//       }`}
//     >
//       {isBack && <span className="text-[10px]">←</span>}

//       <span className="text-[10px] font-bold uppercase tracking-widest">
//         {label}
//       </span>

//       {!isBack && <span className="text-[10px]">→</span>}
//     </button>
//   );
// }
