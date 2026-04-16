import { syncRequest } from "./base.sync";

export const priceSync = {
  update: async (payload: { serviceId: string; price: number }) => {
    return syncRequest("/api/prices", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
