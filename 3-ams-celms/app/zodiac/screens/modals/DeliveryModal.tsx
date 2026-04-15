"use client";
import { DeliveryRecord, DeliveryStatus } from "../types/deliverRecords.types";

import { useState } from "react";

export function DeliveryHandlingModal({
  delivery,
}: {
  delivery: DeliveryRecord;
}) {
  const [status, setStatus] = useState<DeliveryStatus>(delivery.status);
  const [pickupDate, setPickupDate] = useState(delivery.pickupDate || "");

  const togglePause = () => {
    // Feature 6.3: Pause Delivery logic
    setStatus((prev) => (prev === "PAUSED" ? "SCHEDULED" : "PAUSED"));
  };

  return (
    <div className="glass-card p-6 w-full max-w-sm border-white/10 relative overflow-hidden">
      {/* PAUSE OVERLAY (Feature 6.3) */}
      {status === "PAUSED" && (
        <div className="absolute inset-0 bg-orange-500/10 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-orange-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Delivery Paused
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Fulfillment</h2>
        <span className="text-[10px] opacity-40 uppercase font-mono">
          {delivery.id}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* PICKUP DATE SETTER (Feature 6.1) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase opacity-40 font-bold tracking-widest">
            Confirmed Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-400 transition-all text-sm font-mono"
          />
        </div>

        {/* DELIVERY OPTIONS (Feature 6.2 & 6.4) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <p className="text-[9px] opacity-40 uppercase mb-1">Handling</p>
            <span className="text-xs font-bold">
              {delivery.handledBy === "PRINTER" ? "Printer" : "Client"}
            </span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <p className="text-[9px] opacity-40 uppercase mb-1">Type</p>
            <span className="text-xs font-bold">Physical Pickup</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={togglePause}
            className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
              status === "PAUSED"
                ? "bg-cyan-500 text-black"
                : "bg-white/10 text-orange-500 border border-orange-500/20"
            }`}
          >
            {status === "PAUSED" ? "Resume Delivery" : "Pause Delivery"}
          </button>

          <button className="w-full py-4 bg-white text-black font-bold rounded-2xl text-xs uppercase tracking-widest active:scale-95 shadow-xl">
            Confirm & Notify Client
          </button>
        </div>
      </div>
    </div>
  );
}
