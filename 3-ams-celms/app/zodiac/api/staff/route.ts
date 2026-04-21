import { apiHandler } from "@/server/core/apiHandler";
import { StaffService } from "@/server/services/staff.service";

export const GET = apiHandler(
  async ({ orgId }) => {
    const data = await StaffService.list(orgId);

    return data;
  },
  {
    requireOrg: true,
  },
);
