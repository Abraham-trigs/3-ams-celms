"use client";

import { useEffect, useRef } from "react";
import { createRealtimeClient } from "@/lib/realtime/client";
import { useDataStore } from "@/store/data.store";

export function useRealtimeSync() {
  const handledEvents = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = createRealtimeClient((event) => {
      const store = useDataStore.getState();

      // basic dedupe (prevents double-processing from reconnects)
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

        case "stock.updated":
          store.consumeStock(event.payload.id, event.payload.qty);
          break;

        case "price.updated":
          store.updatePrice(event.payload.id, event.payload.priceGHS);
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
