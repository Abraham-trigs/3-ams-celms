"use client";

import { useEffect, useRef } from "react";
import { createRealtimeClient } from "@/lib/realtime/client";
import { useDataStore } from "@/store/data.store";

export function useRealtimeSync() {
  const handledEvents = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = createRealtimeClient((event) => {
      const store = useDataStore.getState();

      const eventKey = `${event.type}:${event.payload?.id ?? ""}`;
      if (handledEvents.current.has(eventKey)) return;

      handledEvents.current.add(eventKey);

      switch (event.type) {
        case "job.created":
          store.addJob(event.payload);
          break;

        case "job.updated":
        case "job.paid":
        case "job.staff_assigned":
          store.updateJob(event.payload.id, event.payload);
          break;

        case "payment.confirmed":
          store.updateJob(event.payload.job.id, {
            isPaid: true,
            paymentStatus: "PAID",
            paymentRef: event.payload.job.paymentRef,
          });
          break;

        case "stock.updated":
          store.consumeStock(
            event.payload.id,
            event.payload.totalRemaining ?? event.payload.qty,
          );
          break;

        case "stock.restocked":
          store.restockStock?.(
            event.payload.id,
            event.payload.totalRemaining,
            event.payload.lastUnitCost,
          );
          break;

        case "price.updated":
          store.updatePrice(event.payload.id, event.payload.unitPrice);
          break;

        default:
          break;
      }
    });

    return () => {
      unsubscribe();
      handledEvents.current.clear();
    };
  }, []);
}
