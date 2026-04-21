import { apiHandler } from "@/server/core/apiHandler";
import { staffService } from "@/server/services/staff.service";

export const GET = apiHandler(async ({ orgId }) => {
  const data = await staffService.list(orgId);

  return data;
});
