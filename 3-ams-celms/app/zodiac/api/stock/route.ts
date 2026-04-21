import { apiHandler } from "@/server/core/apiHandler";
import { stockService } from "@/server/services/stock.service";

export const GET = apiHandler(async ({ orgId }) => {
  return stockService.list(orgId);
});

export const POST = apiHandler(
  async ({ orgId, body }) => {
    return stockService.restock({
      ...body,
      orgId,
    });
  },
  { requireOrg: true },
);
