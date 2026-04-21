import { apiHandler } from "@/server/core/apiHandler";
import { stockService } from "@/server/services/stock.service";
import { eventBus } from "@/server/events/eventBus";

export const GET = apiHandler(async ({ orgId }) => {
  return stockService.list(orgId);
});

export const POST = apiHandler(
  async ({ orgId, body }) => {
    const restock = await stockService.restock(
      body.stockItemId,
      body.quantity,
      body.unitCost,
      orgId,
    );

    eventBus.publish({
      type: "stock.restocked",
      payload: restock,
      meta: { source: "server", orgId },
    });

    return restock;
  },
  {
    requireOrg: true,
  },
);
