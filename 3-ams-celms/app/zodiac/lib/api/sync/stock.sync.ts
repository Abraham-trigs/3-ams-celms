import { syncRequest } from "./base.sync";

export const stockSync = {
  restock: async (payload: {
    stockItemId: string;
    quantity: number;
    unitCost: number;
  }) => {
    return syncRequest("/api/stock", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
