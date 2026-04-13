"use client";

import { useZodiac } from "../store/zodiac.store";
import { JobCreateModal } from "../modals/job/JobCreateModal";
import { WasteModal } from "../modals/waste/WasteModal";
import { PaymentModal } from "../modals/payment/PaymentModal";
import { WelcomeModal } from "../modals/welcome/WelcomeModal"; // Added WelcomeModal import

export function TopModal() {
  const { activeTopModal } = useZodiac();

  /**
   * OR logic ensures that if activeTopModal is null or empty,
   * it falls back to the "WELCOME" case.
   */
  const currentModal = activeTopModal || "WELCOME";

  switch (currentModal) {
    case "WELCOME":
      return <WelcomeModal />;

    case "JOB_CREATE":
      return <JobCreateModal />;

    case "WASTE":
      return <WasteModal />;

    case "PAYMENT":
      return <PaymentModal />;

    default:
      return null;
  }
}
