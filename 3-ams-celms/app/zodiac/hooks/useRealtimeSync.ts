"use client";

import { useEffect, useRef } from "react";
import { createRealtimeClient } from "@/lib/realtime/client";
import { useDataStore } from "@/store/data.store";

export function useRealtimeSync() {
  const lastVersionMap = useRef<Record<string, number>>({});

  useEffect(() => {
    const unsubscribe = createRealtimeClient((event) => {
      const store = useDataStore.getState();

      const entityId = event.entityId;
      const version = event.version ?? 0;

      // ❌ reject stale updates
      if (lastVersionMap.current[entityId] >= version) return;
      lastVersionMap.current[entityId] = version;

      const data = event.payload;

      switch (event.type) {
        // ─────────────────────────────
        // JOB DOMAIN (source of truth = JobService)
        // ─────────────────────────────
        case "job.created":
          store.addJob(data);
          break;

        case "job.updated":
        case "job.paid":
          store.updateJob(data.id, data);
          break;

        case "job.staff_assigned":
          // ⚠️ treat as projection only (safe merge)
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
          // ✔ single source rule: backend already defines status
          store.assignCurrentJob?.(data.staffId, data.jobId);
          store.setStaffStatus?.(data.staffId, data.status);
          break;
      }
    });

    return () => {
      unsubscribe();
      lastVersionMap.current = {};
    };
  }, []);
}
