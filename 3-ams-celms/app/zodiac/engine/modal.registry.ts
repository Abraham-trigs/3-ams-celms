export const ModalRegistry: Record<string, { zone: "TOP" | "DOWN" }> = {
  JOB_CREATE: { zone: "TOP" },
  WASTE: { zone: "TOP" },
  PAYMENT: { zone: "TOP" },

  JOB_LIST: { zone: "DOWN" },
  JOB_DETAIL: { zone: "DOWN" },
  CLIENT_LIST: { zone: "DOWN" },
  STOCK_VIEW: { zone: "DOWN" },
};
