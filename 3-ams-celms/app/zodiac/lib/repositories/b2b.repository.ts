// lib/repositories/b2b.repository.ts

import { prisma } from "@/lib/db/prisma";

export class B2BRepository {
  static async create(data: {
    orgId: string;
    originalJobId: string;
    clientName: string;
    serviceName: string;
    specs: string;
    deadline: Date;
    suggestedPrice?: number;
  }) {
    return prisma.b2BPush.create({ data });
  }

  static async list(orgId: string) {
    return prisma.b2BPush.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateStatus(
    id: string,
    status: "PENDING" | "ACCEPTED" | "NEGOTIATING" | "REJECTED" | "COMPLETED",
  ) {
    return prisma.b2BPush.update({
      where: { id },
      data: { status },
    });
  }
}
