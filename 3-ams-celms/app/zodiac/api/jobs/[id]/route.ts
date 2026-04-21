import { apiHandler } from "@/server/core/apiHandler";
import { JobService } from "@/server/services/job.service";

export const PATCH = apiHandler(
  async ({ orgId, params, body }) => {
    return JobService.updateStatus(orgId, params.id, body.status);
  },
  {
    requireOrg: true,
  },
);
