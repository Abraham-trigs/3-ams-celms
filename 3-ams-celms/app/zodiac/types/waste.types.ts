interface WasteAudit {
  staffName: string;
  machineId: string; // e.g., "Roland-01" or "Konica-Digital"
  serviceName: string;
  wastedQuantity: number;
  unit: string;
  monetaryLoss: number; // Calculated: quantity * cost_price
  date: string;
}
