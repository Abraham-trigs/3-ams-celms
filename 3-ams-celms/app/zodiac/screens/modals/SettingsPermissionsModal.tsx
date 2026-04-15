"use client";

import { useDataStore } from "../../store/useDataStore";
import { useModalStore } from "../../store/useModalStore";
import { useAccessStore } from "../../store/useAccessStore";

export function SettingsPermissionsModal() {
  const { clearStore, clearCompletedJobs, jobs } = useDataStore(); // ✅ Added clearCompletedJobs
  const { closeModal } = useModalStore();
  const { userRole, setRole, subscription, setSubscription } = useAccessStore();

  // ✅ Calculate completed jobs for quota management
  const completedCount = jobs.filter((j) => j.status === "SUCCESSFUL").length;

  const handleFactoryReset = () => {
    if (
      confirm(
        "DANGER: This will wipe all jobs, stock, and local data. Proceed?",
      )
    ) {
      clearStore();
      closeModal("GLOBAL");
      window.location.reload();
    }
  };

  return (
    <div className="glass-card p-6 w-full max-w-md border border-white/10 flex flex-col gap-6 animate-in slide-in-from-bottom-4 shadow-2xl">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            System Settings
          </h2>
          <p className="text-[10px] text-cyan-400 uppercase font-black tracking-widest">
            Logic & Access Control
          </p>
        </div>
        <button
          onClick={() => closeModal("GLOBAL")}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs opacity-40 hover:opacity-100 transition-all"
        >
          ✕
        </button>
      </header>

      {/* Subscription Management */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[10px] uppercase opacity-40 font-bold tracking-[0.2em]">
          Subscription Plan
        </h3>
        <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-2xl border border-white/5">
          {["BASIC", "PRO"].map((plan) => (
            <button
              key={plan}
              onClick={() => setSubscription(plan as any)}
              className={`py-3 rounded-xl text-[10px] font-black transition-all ${
                subscription === plan
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {plan} {plan === "PRO" && "⚡"}
            </button>
          ))}
        </div>
      </section>

      {/* Role Switcher */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[10px] uppercase opacity-40 font-bold tracking-[0.2em]">
          Active Role
        </h3>
        <div className="flex flex-col gap-2">
          {["ADMIN", "OPERATOR", "CASHIER"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as any)}
              className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${
                userRole === r
                  ? "border-cyan-400/50 bg-white/10"
                  : "border-white/5 bg-white/5 opacity-40"
              }`}
            >
              <span
                className={`text-xs font-black ${userRole === r ? "text-cyan-400" : "text-white"}`}
              >
                {r}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${userRole === r ? "bg-cyan-400 animate-pulse" : "bg-white/10"}`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ✅ NEW: Maintenance & Quota Section */}
      <section className="flex flex-col gap-3 pt-4 border-t border-white/5">
        <h3 className="text-[10px] uppercase opacity-40 font-bold tracking-[0.2em]">
          Maintenance
        </h3>
        <button
          disabled={completedCount === 0}
          onClick={clearCompletedJobs}
          className="w-full py-3 bg-white/5 border border-white/10 text-[10px] font-black rounded-xl hover:bg-white/10 transition-all uppercase disabled:opacity-20 flex justify-between px-4 items-center"
        >
          <span>Clear Completed Jobs</span>
          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-[8px]">
            {completedCount} Found
          </span>
        </button>
        <p className="text-[9px] opacity-30 text-center italic">
          Clearing successful jobs frees up your{" "}
          <strong>
            {subscription === "BASIC" ? "50-job limit" : "database space"}
          </strong>
          .
        </p>
      </section>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-white/10">
        <button
          onClick={handleFactoryReset}
          className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
        >
          Factory Reset Data Store
        </button>
      </div>
    </div>
  );
}
