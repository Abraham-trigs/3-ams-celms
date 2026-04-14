export type DeliveryType =
  | "PHYSICAL_PICKUP"
  | "PRINTER_DELIVERY"
  | "CLIENT_COURIER";
export type DeliveryStatus =
  | "PENDING_DATE"
  | "SCHEDULED"
  | "OUT_FOR_DELIVERY"
  | "PAUSED"
  | "COMPLETED";

export interface DeliveryRecord {
  id: string;
  type: DeliveryType;
  status: DeliveryStatus;
  pickupDate?: string; // Feature 6.1: Printer confirms date
  handledBy: "CLIENT" | "PRINTER"; // Feature 6.4
}
