// lib/repositories/staff.repository.ts

import { prisma } from "@/lib/db/prisma";

export class StaffRepository {
  static async create(data: {
    orgId: string;
    userId: string;
    name: string;
    role: string;
    phone?: string;
  }) {
    return prisma.staff.create({ data });
  }

  static async list(orgId: string) {
    return prisma.staff.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(orgId: string, id: string) {
    return prisma.staff.findFirst({
      where: { id, orgId },
    });
  }

  static async assignJob(staffId: string, jobId: string) {
    return prisma.staff.update({
      where: { id: staffId },
      data: {
        assignedJobs: {
          connect: { id: jobId },
        },
      },
    });
  }
}
