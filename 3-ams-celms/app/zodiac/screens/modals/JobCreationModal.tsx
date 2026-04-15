"use client";

import { useState, useMemo } from "react";
import { useDataStore } from "../../store/useDataStore";
import { JobTicket, DeliveryRecord } from "../../types/zodiac.types";

export function JobCreationModal({ onClose }: { onClose: () => void }) {
  const { prices, inventory, createJob, addDelivery } = useDataStore();

  const [clientName, setClientName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Feature 6.2/6.4: Initial Delivery Selection
  const [deliveryType, setDeliveryType] = useState<
    "PHYSICAL_PICKUP" | "PRINTER_DELIVERY"
  >("PHYSICAL_PICKUP");
  const [handledBy, setHandledBy] = useState<"CLIENT" | "PRINTER">("CLIENT");

  const selectedService = useMemo(
    () => prices.find((p) => p.id === serviceId),
    [serviceId, prices],
  );
  const linkedMaterial = useMemo(
    () => inventory.find((i) => i.id === selectedService?.stock_ref),
    [selectedService, inventory],
  );

  const calculation = useMemo(() => {
    if (!selectedService) return { total: 0, materialNeeded: 0 };
    const materialNeeded =
      selectedService.category === "Large Format" ||
      selectedService.unit === "sqft"
        ? width * height * quantity
        : quantity;
    return { total: materialNeeded * selectedService.priceGHS, materialNeeded };
  }, [selectedService, quantity, width, height]);

  const hasEnoughStock = linkedMaterial
    ? linkedMaterial.totalRemaining >= calculation.materialNeeded
    : true;

  const handleConfirm = () => {
    if (!clientName || !serviceId || !hasEnoughStock) return;

    const jobId = Math.random().toString(36).substring(2, 6).toUpperCase();

    const newJob: JobTicket = {
      id: jobId,
      clientName,
      clientId: "GUEST_001",
      serviceId,
      dimensions: width > 0 ? { w: width, h: height } : undefined,
      quantity,
      totalEstimate: calculation.total,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      materialWastage: 0,
    };

    // Feature 6.0: Pre-create delivery record
    const initialDelivery: DeliveryRecord = {
      id: `DLV-${jobId}`,
      jobId: jobId,
      type: deliveryType,
      status: "PENDING_DATE",
      handledBy: handledBy,
    };

    createJob(newJob, calculation.materialNeeded);
    addDelivery(initialDelivery); // Persist fulfillment choice
    onClose();
  };

  return (
    <div className="glass-card p-6 w-full max-w-md border border-cyan-500/30 flex flex-col gap-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <header>
        <h2 className="text-2xl font-bold text-white">Create New Job</h2>
        <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black">
          Production Intake
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <input
          placeholder="Client Name"
          className="input-field"
          onChange={(e) => setClientName(e.target.value)}
        />
        <select
          className="input-field text-sm"
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select Service...</option>
          {prices.map((p) => (
            <option key={p.id} value={p.id}>
              {p.service}
            </option>
          ))}
        </select>
      </div>

      {selectedService?.category === "Large Format" && (
        <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2">
          <input
            type="number"
            placeholder="W (ft)"
            className="input-field"
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="H (ft)"
            className="input-field"
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] opacity-40 uppercase">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] opacity-40 uppercase">
            Delivery Handling
          </label>
          <select
            className="input-field text-[10px]"
            onChange={(e) => setHandledBy(e.target.value as any)}
          >
            <option value="CLIENT">Client Handles</option>
            <option value="PRINTER">Printer Handles</option>
          </select>
        </div>
      </div>

      <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] opacity-50 block uppercase font-bold">
            Estimate
          </span>
          <span className="text-xl font-mono font-bold text-orange-400">
            ₵{calculation.total.toFixed(2)}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-[10px] font-bold ${hasEnoughStock ? "text-green-400" : "text-red-500 animate-pulse"}`}
          >
            {hasEnoughStock ? "✓ Stock OK" : "⚠️ Shortage"}
          </span>
        </div>
      </div>

      <button
        disabled={!hasEnoughStock || !serviceId}
        onClick={handleConfirm}
        className="btn-primary py-4 uppercase"
      >
        Push to Production
      </button>

      <button
        onClick={onClose}
        className="text-[10px] opacity-30 hover:opacity-100"
      >
        Cancel Entry
      </button>
    </div>
  );
}
