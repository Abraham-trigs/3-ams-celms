"use client";

import { useEffect } from "react";
import { createRealtimeClient } from "@/lib/realtime/client";
import { useDataStore } from "@/store/data.store";

export function useRealtimeSync() {
  useEffect(() => {
    const unsubscribe = createRealtimeClient((event) => {
      const store = useDataStore.getState();

      switch (event.type) {
        case "job.created":
          store.addJob(event.payload);
          break;

        case "job.updated":
          store.updateJob(event.payload.id, event.payload);
          break;

        case "stock.updated":
          store.consumeStock(event.payload.id, event.payload.qty);
          break;

        case "price.updated":
          store.updatePrice(event.payload.id, event.payload.priceGHS);
          break;
      }
    });

    return unsubscribe;
  }, []);
}
