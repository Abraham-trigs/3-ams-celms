// lib/services/staff.service.ts

import { StaffRepository } from "@/lib/repositories/staff.repository";

export class StaffService {
  static async assignToJob(params: {
    orgId: string;
    jobId: string;
    staffId: string;
  }) {
    return StaffRepository.assignJob(params.staffId, params.jobId);
  }
}
