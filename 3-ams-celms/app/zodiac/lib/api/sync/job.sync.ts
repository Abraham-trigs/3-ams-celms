import { syncRequest } from "./base.sync";
import type { JobTicket } from "@/types/zodiac.types";

export const jobSync = {
  create: async (job: JobTicket) => {
    return syncRequest<JobTicket>("/api/jobs", {
      method: "POST",
      body: JSON.stringify(job),
    });
  },

  update: async (jobId: string, updates: Partial<JobTicket>) => {
    return syncRequest<JobTicket>(`/api/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },
};
