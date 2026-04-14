// "use client";

// import { useModalStore } from "../store/useModalStore";

// export function DownModal() {
//   // Get the component itself from the store
//   const ActiveComponent = useModalStore((s) => s.activeDownComponent);

//   if (!ActiveComponent) return null;

//   return (
//     <div className="down-modal-wrapper h-full w-full relative overflow-hidden">
//       {/* Renders the injected component as a child */}
//       <ActiveComponent />
//     </div>
//   );
// }
