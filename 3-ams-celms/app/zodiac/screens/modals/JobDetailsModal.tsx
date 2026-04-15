"use client";

import { useState, useEffect, useMemo } from "react";
import { useDataStore } from "../../store/useDataStore";
import { JobTicket } from "../types/zodiac.types";
import { useModalStore } from "../../store/useModalStore";
import { WastePromptModal } from "./WastePromptModal";

export function JobDetailsModal({
  jobId,
  onClose,
}: {
  jobId: string;
  onClose: () => void;
}) {
  const { jobs, prices, updateJobStatus, startJob, recordWastage } =
    useDataStore();
  const { swapModal } = useModalStore();

  const job = jobs.find((j) => j.id === jobId);
  const service = prices.find((p) => p.id === job?.serviceId);
  const [elapsed, setElapsed] = useState(0);

  // FEATURE 2.1: Live Production Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (job?.status === "IN_PROGRESS" && job.startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - job.startTime!) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [job?.status, job?.startTime]);

  if (!job) return null;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + "h " : ""}${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  // FEATURE 4.4: Strategic Waste Trigger
  const triggerWasteAudit = () => {
    swapModal("GLOBAL", () => (
      <WastePromptModal
        job={{ ...job, unit: service?.unit }}
        onConfirm={(waste) => {
          recordWastage(job.id, waste);
          if (job.status === "IN_PROGRESS")
            updateJobStatus(job.id, "SUCCESSFUL");
        }}
      />
    ));
  };

  return (
    <div className="glass-card p-6 w-full max-w-md border border-white/10 flex flex-col gap-6 animate-in slide-in-from-bottom-4 shadow-2xl">
      {/* 1. Dynamic Header */}
      <header className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded font-black tracking-tighter">
              #{job.id}
            </span>
            <span
              className={`h-2 w-2 rounded-full animate-pulse ${job.status === "IN_PROGRESS" ? "bg-green-500" : "bg-white/20"}`}
            />
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            {job.clientName}
          </h2>
          <span className="text-[10px] text-cyan-400 uppercase font-black tracking-[0.2em]">
            {service?.service}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs opacity-40 hover:opacity-100 transition-all"
        >
          ✕
        </button>
      </header>

      {/* 2. Production Clock (Feature 2.1) */}
      <div className="relative overflow-hidden group py-10 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/5 flex flex-col items-center">
        <span className="text-[10px] uppercase opacity-30 tracking-[0.3em] mb-2 font-black">
          {job.status === "IN_PROGRESS"
            ? "Active Production"
            : "Total Time Logged"}
        </span>
        <span
          className={`text-5xl font-mono font-black tracking-tighter ${job.status === "IN_PROGRESS" ? "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-white/20"}`}
        >
          {formatTime(elapsed)}
        </span>
      </div>

      {/* 3. Specs Grid (Feature 1.1 / 8.1) */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Qty", val: job.quantity, unit: service?.unit },
          {
            label: "Size",
            val: job.dimensions
              ? `${job.dimensions.w}x${job.dimensions.h}`
              : "N/A",
            unit: job.dimensions ? "ft" : "",
          },
          {
            label: "Waste",
            val: job.materialWastage || 0,
            unit: service?.unit,
            highlight: job.materialWastage > 0,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center"
          >
            <span className="text-[8px] opacity-30 uppercase font-bold">
              {stat.label}
            </span>
            <span
              className={`text-xs font-black ${stat.highlight ? "text-orange-400" : "text-white"}`}
            >
              {stat.val}{" "}
              <span className="text-[8px] opacity-40 font-normal">
                {stat.unit}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* 4. Feature-Specific Control Logic */}
      <div className="flex flex-col gap-3">
        {job.status === "PENDING" && (
          <button
            onClick={() => startJob(job.id)}
            className="w-full py-4 bg-cyan-500 text-black font-black rounded-2xl uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
          >
            Start Production
          </button>
        )}

        {job.status === "IN_PROGRESS" && (
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={triggerWasteAudit}
              className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl uppercase shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
            >
              Mark Successful
            </button>
            <button
              onClick={() => updateJobStatus(job.id, "PAUSED")}
              className="w-full py-3 bg-white/5 text-white/40 text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-white/10"
            >
              Pause Production
            </button>
          </div>
        )}

        {job.status === "SUCCESSFUL" && (
          <div className="flex flex-col gap-2">
            <div className="text-center py-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center gap-2">
              <span className="text-green-500 text-xs">✔</span>
              <span className="text-green-500 font-black uppercase text-[10px] tracking-widest">
                Production Complete
              </span>
            </div>
            {/* Added: Feature 4.4 Post-Job Audit Ability */}
            <button
              onClick={triggerWasteAudit}
              className="w-full py-3 border border-orange-500/20 text-orange-400/60 text-[9px] uppercase font-bold rounded-xl hover:bg-orange-500/5 transition-all"
            >
              Update Waste Record
            </button>
          </div>
        )}
      </div>

      {/* Feature 6.1: Pickup Date Prompt */}
      {job.status === "SUCCESSFUL" && (
        <p className="text-[9px] opacity-30 text-center italic">
          💡 Next step: Set pickup date in Delivery Handling (Feature 6.1)
        </p>
      )}
    </div>
  );
}
