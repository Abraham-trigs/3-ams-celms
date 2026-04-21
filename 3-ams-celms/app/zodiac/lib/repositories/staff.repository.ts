import { prisma } from "@/lib/db/prisma";
import { DbClient } from "@/lib/db/prisma-client";

export class StaffRepository {
  static async create(
    data: {
      orgId: string;
      userId: string;
      name: string;
      role: string;
      phone?: string;
    },
    tx?: DbClient,
  ) {
    const db = tx ?? prisma;

    return db.staff.create({ data });
  }

  static async list(orgId: string, tx?: DbClient) {
    const db = tx ?? prisma;

    return db.staff.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(orgId: string, id: string, tx?: DbClient) {
    const db = tx ?? prisma;

    return db.staff.findFirst({
      where: { id, orgId },
    });
  }

  static async assignJob(staffId: string, jobId: string, tx?: DbClient) {
    const db = tx ?? prisma;

    return db.staff.update({
      where: { id: staffId },
      data: {
        assignedJobs: {
          connect: { id: jobId },
        },
      },
    });
  }
}
