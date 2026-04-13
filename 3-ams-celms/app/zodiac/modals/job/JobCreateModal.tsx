"use client";

import { useZodiac } from "../../store/zodiac.store";

export function JobCreateModal() {
  const { closeAll } = useZodiac();

  return (
    <div className="glass-card">
      <h2>Create Job</h2>

      <input placeholder="Job Name" className="w-full p-2" />
      <input placeholder="Client" className="w-full p-2 mt-2" />

      <button className="btn-primary mt-4">Create Job</button>

      <button onClick={closeAll} className="mt-2 text-sm">
        Cancel
      </button>
    </div>
  );
}
