// "use client";

// import { useState, useMemo } from "react";
// import { useDataStore } from "../../store/useDataStore";
// import { JobTicket } from "../../types/zodiac.types";

// export function JobCreationModal({ onClose }: { onClose: () => void }) {
//   const { prices, inventory, createJob } = useDataStore();

//   // Local Form State
//   const [clientName, setClientName] = useState("");
//   const [serviceId, setServiceId] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);

//   // 1. Logic: Find Selected Service & Linked Material
//   const selectedService = useMemo(
//     () => prices.find((p) => p.id === serviceId),
//     [serviceId, prices],
//   );

//   const linkedMaterial = useMemo(
//     () => inventory.find((i) => i.id === selectedService?.stock_ref),
//     [selectedService, inventory],
//   );

//   // 2. Feature 1.1 & 8.1: Auto Calculation Engine
//   const calculation = useMemo(() => {
//     if (!selectedService) return { total: 0, materialNeeded: 0 };

//     let total = 0;
//     let materialNeeded = 0;

//     if (
//       selectedService.category === "Large Format" ||
//       selectedService.unit === "sqft"
//     ) {
//       // Sqft calculation: (W * H) * Qty * Price
//       materialNeeded = width * height * quantity;
//       total = materialNeeded * selectedService.priceGHS;
//     } else {
//       // Standard unit calculation
//       materialNeeded = quantity;
//       total = quantity * selectedService.priceGHS;
//     }

//     return { total, materialNeeded };
//   }, [selectedService, quantity, width, height]);

//   // 3. Validation: Check if enough stock exists
//   const hasEnoughStock = linkedMaterial
//     ? linkedMaterial.totalRemaining >= calculation.materialNeeded
//     : true;

//   const handleConfirm = () => {
//     if (!clientName || !serviceId || !hasEnoughStock) return;

//     const newJob: JobTicket = {
//       id: Math.random().toString(36).substring(2, 6).toUpperCase(), // Mock 4-digit ID
//       clientName,
//       clientId: "GUEST_001", // Placeholder
//       serviceId,
//       dimensions: width > 0 ? { w: width, h: height } : undefined,
//       quantity,
//       totalEstimate: calculation.total,
//       status: "PENDING",
//       createdAt: new Date().toISOString(),
//       materialWastage: 0,
//     };

//     createJob(newJob, calculation.materialNeeded);
//     onClose();
//   };

//   return (
//     <div className="glass-card p-6 w-full max-w-md border border-cyan-500/30 flex flex-col gap-5 animate-in zoom-in-95">
//       <header>
//         <h2 className="text-2xl font-bold text-white">Create New Job</h2>
//         <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black">
//           Production Intake
//         </p>
//       </header>

//       {/* Client & Service Selection */}
//       <div className="flex flex-col gap-3">
//         <input
//           placeholder="Client Name"
//           className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cyan-400 transition-all"
//           onChange={(e) => setClientName(e.target.value)}
//         />

//         <select
//           className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cyan-400 text-sm"
//           onChange={(e) => setServiceId(e.target.value)}
//         >
//           <option value="">Select Service...</option>
//           {prices.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.service}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Feature 1.1: Dimensions for Large Format */}
//       {selectedService?.category === "Large Format" && (
//         <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
//           <div className="flex flex-col gap-1">
//             <label className="text-[9px] opacity-40 uppercase">
//               Width (ft)
//             </label>
//             <input
//               type="number"
//               onChange={(e) => setWidth(Number(e.target.value))}
//               className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="text-[9px] opacity-40 uppercase">
//               Height (ft)
//             </label>
//             <input
//               type="number"
//               onChange={(e) => setHeight(Number(e.target.value))}
//               className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
//             />
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col gap-1">
//         <label className="text-[9px] opacity-40 uppercase">Quantity</label>
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
//         />
//       </div>

//       {/* Results Summary */}
//       <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 flex justify-between items-center">
//         <div>
//           <span className="text-[10px] opacity-50 block uppercase font-bold">
//             Total Estimate
//           </span>
//           <span className="text-2xl font-mono font-bold text-orange-400">
//             ₵{calculation.total.toFixed(2)}
//           </span>
//         </div>
//         <div className="text-right">
//           <span className="text-[10px] opacity-50 block uppercase font-bold">
//             Stock Impact
//           </span>
//           <span
//             className={`text-xs font-bold ${hasEnoughStock ? "text-green-400" : "text-red-500 animate-pulse"}`}
//           >
//             {calculation.materialNeeded} {selectedService?.unit || "units"}{" "}
//             {hasEnoughStock ? "✓" : "⚠️ Shortage"}
//           </span>
//         </div>
//       </div>

//       <button
//         disabled={!hasEnoughStock || !serviceId}
//         onClick={handleConfirm}
//         className="w-full py-4 bg-cyan-500 text-black font-black rounded-2xl uppercase tracking-tighter disabled:opacity-20 disabled:grayscale transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
//       >
//         Push to Production
//       </button>

//       <button
//         onClick={onClose}
//         className="text-[10px] opacity-30 hover:opacity-100 transition-opacity"
//       >
//         Cancel Entry
//       </button>
//     </div>
//   );
// }
