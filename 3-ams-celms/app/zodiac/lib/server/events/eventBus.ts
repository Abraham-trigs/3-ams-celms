import { WebSocketServer } from "ws";

type EventHandler = (payload: any) => void;

class EventBus {
  private wsServer: WebSocketServer | null = null;
  private handlers: Record<string, EventHandler[]> = {};

  init(server: any) {
    this.wsServer = new WebSocketServer({ server });

    this.wsServer.on("connection", (socket) => {
      socket.on("message", (msg) => {
        // optional client messages
      });
    });
  }

  publish(type: string, payload: any) {
    // 1. internal listeners
    (this.handlers[type] || []).forEach((fn) => fn(payload));

    // 2. push to all websocket clients
    if (!this.wsServer) return;

    this.wsServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type,
            payload,
          }),
        );
      }
    });
  }

  subscribe(type: string, handler: EventHandler) {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(handler);
  }
}

export const eventBus = new EventBus();
