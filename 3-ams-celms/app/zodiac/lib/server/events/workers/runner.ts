import { processOutbox } from "./outbox.worker";

setInterval(async () => {
  await processOutbox();
}, 2000);

// Later upgrade: replace with BullMQ / Redis queue (same interface, better scale)
