"use client";

import { useModalStore } from "../store/usemodal.store";
import { JobListModal } from "../modals/job/JobListModal";
import { ClientModal } from "../modals/client/ClientModal";
import { StockModal } from "../modals/stock/StockModal";

export function DownModal() {
  const { state } = useModalStore();

  const active = state.activeDownModal;

  switch (active) {
    case "JOB_LIST":
      return <JobListModal />;

    case "CLIENT_LIST":
      return <ClientModal />;

    case "STOCK_VIEW":
      return <StockModal />;

    default:
      return null; // IMPORTANT FIX
  }
}
