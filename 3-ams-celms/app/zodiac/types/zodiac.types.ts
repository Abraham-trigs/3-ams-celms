/**
 * 1. ENUMS & LITERALS
 */
export type ServiceUnit =
  | "sqft"
  | "pack"
  | "piece"
  | "liter"
  | "hour"
  | "Per Page"
  | "Per 100"
  | "Per Sq Meter"
  | "Per Set"
  | "Per Yard";

export type JobStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "CANCELLED"
  | "PAUSED"
  | "COMPLETED"
  | "DELIVERED";

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

/**
 * 2. PRICE & INVENTORY (Features 0, 7, 9, 19)
 */
export interface PriceItem {
  id: string;
  service: string;
  unit: ServiceUnit;
  priceGHS: number;
  category: "Digital" | "Large Format" | "Finishing" | "Apparel" | "DESIGN";
  stock_ref: string | null; // Links to StockItem.id
}

export interface StockItem {
  id: string;
  materialName: string;
  totalRemaining: number;
  unit: string;
  threshold: number; // Feature 7.2: Auto-shortage prompting
  lastUnitCost: number; // Feature 19: Price Update Prompter
}

/**
 * 3. JOB & FILE MANAGEMENT (Features 1, 2, 8, 18)
 */
export interface JobTicket {
  id: string; // 4-digit alphanumeric code
  clientName: string;
  clientId: string;
  serviceId: string;
  dimensions?: { w: number; h: number }; // Feature 1.1 & 8.1
  quantity: number;
  totalEstimate: number;
  assignedStaffId?: string;
  status: JobStatus;
  startTime?: number; // Feature 2.1
  endTime?: number;
  createdAt: string;
  materialWastage: number; // Feature 4.4
}

export interface JobFileVersion {
  versionId: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  timestamp: number;
  changeLog: string;
  status: "DRAFT" | "PENDING_APPROVAL" | "PRINT_READY";
}

export interface JobFilesContainer {
  jobId: string;
  currentActiveVersionId: string;
  versions: JobFileVersion[];
}

/**
 * 4. AUDIT & LOGISTICS (Features 4, 5, 6)
 */
export interface WasteAudit {
  staffName: string;
  machineId: string;
  serviceName: string;
  wastedQuantity: number;
  unit: string;
  monetaryLoss: number;
  date: string;
}

export interface DeliveryRecord {
  id: string;
  jobId: string;
  type: DeliveryType;
  status: DeliveryStatus;
  pickupDate?: string; // Feature 6.1
  handledBy: "CLIENT" | "PRINTER"; // Feature 6.4
}

/**
 * 5. B2B & EXTERNAL (Feature 15)
 */
export interface B2BPush {
  id: string;
  originalJobId: string;
  specs: string;
  deadline: string;
  suggestedBargainPrice?: number;
  status: "PENDING" | "ACCEPTED" | "NEGOTIATING" | "REJECTED";
}

export interface NegotiationMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isOffer?: boolean;
  offerAmount?: number;
}

export interface B2BNegotiation {
  jobId: string;
  partnerFirmId: string;
  currentOffer: number;
  status: "OPEN" | "ACCEPTED" | "REJECTED";
  messages: NegotiationMessage[];
}

export interface PriceItem {
  id: string;
  service: string;
  unit: ServiceUnit;
  priceGHS: number;
  category: "Digital" | "Large Format" | "Finishing" | "Apparel" | "DESIGN";
  stock_ref: string | null;
  benchmarkId?: keyof typeof MARKET_BENCHMARKS; // Added this to link to market data
}
