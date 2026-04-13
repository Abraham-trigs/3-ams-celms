"use client";

import { useModalStore } from "@/store/modal.store";
import { CreateJobModal } from "./modals/CreateJobModal";
import { WasteModal } from "./modals/WasteModal";
import { PaymentModal } from "./modals/PaymentModal";

export function ModalRoot() {
  const { type, data, closeModal } = useModalStore();

  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {type === "CREATE_JOB" && <CreateJobModal onClose={closeModal} />}

      {type === "WASTE_ENTRY" && (
        <WasteModal data={data} onClose={closeModal} />
      )}

      {type === "PAYMENT" && <PaymentModal data={data} onClose={closeModal} />}
    </div>
  );
}
