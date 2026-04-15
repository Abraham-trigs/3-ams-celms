"use client";

import { useState } from "react";
import { useDataStore } from "../../store/useDataStore";
import { DeliveryRecord, DeliveryStatus } from "../types/zodiac.types"; // ✅ Using Master Types
import { useModalStore } from "../../store/useModalStore";

export function DeliveryHandlingModal({
  delivery,
}: {
  delivery: DeliveryRecord;
}) {
  const { closeModal } = useModalStore();
  const { updateJobStatus } = useDataStore(); // We'll assume a delivery update function in the store

  const [status, setStatus] = useState<DeliveryStatus>(delivery.status);
  const [pickupDate, setPickupDate] = useState(delivery.pickupDate || "");

  const togglePause = () => {
    // Feature 6.3: Pause/Resume Logic
    const nextStatus = status === "PAUSED" ? "SCHEDULED" : "PAUSED";
    setStatus(nextStatus);
  };

  const handleFinalConfirm = () => {
    // 1. Logic: Update the global record
    console.log(`Saving Delivery ${delivery.id}: ${status} on ${pickupDate}`);

    // 2. Logic: If completed, move Job Status to DELIVERED
    if (status === "COMPLETED") {
      updateJobStatus(delivery.jobId, "DELIVERED");
    }

    closeModal("GLOBAL");
  };

  return (
    <div className="glass-card p-6 w-full max-w-sm border-white/10 relative overflow-hidden animate-in zoom-in-95">
      {/* PAUSE OVERLAY (Feature 6.3) */}
      {status === "PAUSED" && (
        <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none transition-all">
          <div className="bg-orange-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] shadow-2xl">
            Delivery Paused
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Fulfillment</h2>
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            Feature 6.0 Implementation
          </p>
        </div>
        <span className="text-[10px] opacity-40 font-mono">
          ID: {delivery.id}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* PICKUP DATE SETTER (Feature 6.1) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase opacity-40 font-black tracking-widest">
            Confirmed Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="bg-blue-900/30 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400 transition-all text-sm font-mono text-white"
          />
        </div>

        {/* DELIVERY OPTIONS (Feature 6.2 & 6.4) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[8px] opacity-40 uppercase font-bold mb-1 tracking-tighter">
              Handling By
            </p>
            <span className="text-xs font-black text-cyan-400">
              {delivery.handledBy === "PRINTER" ? "PRINTER" : "CLIENT"}
            </span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[8px] opacity-40 uppercase font-bold mb-1 tracking-tighter">
              Method
            </p>
            <span className="text-xs font-black">
              {delivery.type.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={togglePause}
            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
              status === "PAUSED"
                ? "bg-cyan-500 text-black border-cyan-400"
                : "bg-white/5 text-orange-500 border-orange-500/20 hover:bg-orange-500/10"
            }`}
          >
            {status === "PAUSED" ? "▶ Resume Delivery" : "⏸ Pause Delivery"}
          </button>

          <button
            onClick={handleFinalConfirm}
            className="w-full py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
          >
            Confirm & Sync Record
          </button>
        </div>
      </div>
    </div>
  );
}
