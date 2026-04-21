"use client";

import { useEffect, useRef } from "react";
import { createRealtimeClient } from "@/lib/realtime/client";
import { useDataStore } from "@/store/data.store";

export function useRealtimeSync() {
  const lastVersionMap = useRef<Record<string, number>>({});

  useEffect(() => {
    const unsubscribe = createRealtimeClient((event) => {
      const store = useDataStore.getState();
      const { entityId, version = 0, type, payload: data } = event;

      // ─────────────────────────────
      // STALE UPDATE GUARD
      // ─────────────────────────────
      if (entityId) {
        const last = lastVersionMap.current[entityId] ?? -1;
        if (last >= version) return;
        lastVersionMap.current[entityId] = version;
      }

      switch (type) {
        // ─────────────────────────────
        // COMPANY DOMAIN (NEW)
        // ─────────────────────────────
        case "company.created":
          store.setCompany?.(data); // or store.addCompany
          break;

        case "company.location.updated":
        case "company.activated":
          store.updateCompany?.(data.id, data);
          break;

        // ─────────────────────────────
        // JOB DOMAIN
        // ─────────────────────────────
        case "job.created":
          store.addJob(data);
          break;

        case "job.updated":
        case "job.paid":
          store.updateJob(data.id, data);
          break;

        case "job.staff_assigned":
          store.updateJob(data.id, {
            assignedStaffId: data.assignedStaffId,
            assignedStaffSnapshot: data.assignedStaffSnapshot,
          });
          break;

        // ─────────────────────────────
        // STOCK DOMAIN
        // ─────────────────────────────
        case "stock.updated":
          store.consumeStock(data.id, data.totalRemaining ?? data.qty);
          break;

        case "stock.restocked":
          store.restockStock?.(data.id, data.totalRemaining, data.lastUnitCost);
          break;

        // ─────────────────────────────
        // PRICE DOMAIN
        // ─────────────────────────────
        case "price.updated":
          store.updatePrice(data.id, data.unitPrice);
          break;

        // ─────────────────────────────
        // STAFF DOMAIN
        // ─────────────────────────────
        case "staff.created":
          store.addStaff?.(data);
          break;

        case "staff.updated":
          store.updateStaff?.(data.id, data);
          break;

        case "staff.status.updated":
          store.setStaffStatus?.(data.staffId, data.status);
          break;

        case "staff.assigned":
          store.assignCurrentJob?.(data.staffId, data.jobId);
          store.setStaffStatus?.(data.staffId, data.status);
          break;

        // ─────────────────────────────
        // DELIVERY DOMAIN
        // ─────────────────────────────
        case "delivery.created":
          store.addDelivery?.(data);
          break;

        case "delivery.updated":
          store.updateDelivery?.(data.id, data);
          break;

        // ─────────────────────────────
        // DEV SAFETY
        // ─────────────────────────────
        default:
          console.debug(`[Realtime] Unhandled event: ${type}`);
      }
    });

    return () => {
      unsubscribe();
      lastVersionMap.current = {};
    };
  }, []);
}
