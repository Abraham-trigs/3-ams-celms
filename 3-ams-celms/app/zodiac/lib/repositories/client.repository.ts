// lib/repositories/client.repository.ts

import { prisma } from "@/lib/db/prisma";
import { ClientType } from "../../types/zodiac.types";

export class ClientRepository {
  static async create(data: {
    orgId: string;
    name: string;
    type: ClientType;
    phone: string;
    email?: string;
  }) {
    return prisma.client.create({ data });
  }

  static async list(orgId: string) {
    return prisma.client.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(orgId: string, id: string) {
    return prisma.client.findFirst({
      where: { id, orgId },
    });
  }

  static async update(orgId: string, id: string, data: any) {
    return prisma.client.update({
      where: { id },
      data,
    });
  }
}
