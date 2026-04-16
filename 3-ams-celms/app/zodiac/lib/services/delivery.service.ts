// lib/services/delivery.service.ts

import { prisma } from "@/lib/db/prisma";

export class DeliveryService {
  static async create(params: {
    orgId: string;
    jobId: string;
    clientId: string;
    type: any;
    address?: string;
  }) {
    return prisma.delivery.create({
      data: params,
    });
  }

  static async updateStatus(id: string, status: any) {
    return prisma.delivery.update({
      where: { id },
      data: { status },
    });
  }
}
