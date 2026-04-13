import { JobListModal } from "../modals/job/JobListModal";
import { ClientModal } from "../modals/client/ClientModal";
import { StockModal } from "../modals/stock/StockModal";
import { useZodiac } from "../store/zodiac.store";

export function DownModal() {
  const { activeDownModal } = useZodiac();

  switch (activeDownModal) {
    case "JOB_LIST":
      return <JobListModal />;

    case "CLIENT_LIST":
      return <ClientModal />;

    case "STOCK_VIEW":
      return <StockModal />;

    default:
      return <JobListModal />;
  }
}
