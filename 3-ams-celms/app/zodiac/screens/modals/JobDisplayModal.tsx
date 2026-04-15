"use client";

import { useDataStore } from "../../store/useDataStore";

export function JobDisplayModal() {
  const { draft, prices, calculateLiveEstimate } = useDataStore();

  const selectedService = prices.find((p) => p.id === draft.serviceId);
  const total = calculateLiveEstimate();

  // Mapping the constant details for the receipt view
  const receiptLines = [
    { label: "Job type:", value: selectedService?.category || "---" },
    { label: "Material:", value: selectedService?.service || "---" },
    { label: "Client:", value: draft.clientName || "- UNNAMED -" },
    {
      label: "Size:",
      value: draft.width > 0 ? `${draft.width}x${draft.height}ft` : "N/A",
    },
    { label: "Quantity:", value: draft.quantity || "0" },
    { label: "Destination:", value: draft.deliveryType || "- PENDING -" },
  ];

  return (
    <div className="flex flex-col items-center w-full px-6 py-4 animate-in fade-in duration-700">
      {/* 1. REF Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <span className="text-[10px] text-cyan-400 font-black tracking-widest bg-cyan-400/10 px-2 py-1 rounded">
          REF: {draft.id || "---"}
        </span>
        <span className="text-[9px] text-white/20 uppercase font-black tracking-tighter">
          Draft Receiver
        </span>
      </div>

      {/* 2. The Glass Receipt (The Image 1 "Card") */}
      <div className="glass-card w-full max-w-[320px] p-8 rounded-[3rem] border-none bg-white/15 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 text-[12px] font-medium text-blue-900/70 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
          {receiptLines.map((line, i) => (
            <div
              key={i}
              className="flex justify-between items-end gap-4 border-b border-black/5 pb-1"
            >
              <span className="whitespace-nowrap">{line.label}</span>
              <span className="font-black text-black text-right truncate">
                {line.value}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative Receipt Bottom */}
        <div className="flex justify-center gap-1.5 mt-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i === 3 ? "bg-orange-400" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      {/* 3. The Live Price Result */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-white font-black text-4xl tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Gh₵ {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
