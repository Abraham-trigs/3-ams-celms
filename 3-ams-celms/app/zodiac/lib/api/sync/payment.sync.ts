import { syncRequest } from "./base.sync";

export const paymentSync = {
  confirm: async (payload: { jobId: string; reference: string }) => {
    return syncRequest(`/api/jobs/${payload.jobId}`, {
      method: "PATCH",
      body: JSON.stringify({
        isPaid: true,
        paymentRef: payload.reference,
      }),
    });
  },
};
