// lib/repositories/stock.repository.ts

import { prisma } from "@/lib/db/prisma";

export class StockRepository {
  static async list(orgId: string) {
    return prisma.stockItem.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(orgId: string, id: string) {
    return prisma.stockItem.findFirst({
      where: { id, orgId },
    });
  }

  static async deduct(orgId: string, stockItemId: string, amount: number) {
    return prisma.stockItem.update({
      where: { id: stockItemId },
      data: {
        totalRemaining: {
          decrement: amount,
        },
      },
    });
  }

  static async restock(
    orgId: string,
    stockItemId: string,
    quantity: number,
    unitCost: number,
  ) {
    return prisma.stockItem.update({
      where: { id: stockItemId },
      data: {
        totalRemaining: {
          increment: quantity,
        },
        lastUnitCost: unitCost,
        lastRestockedAt: new Date(),
      },
    });
  }
}
