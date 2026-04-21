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
    const item = await prisma.stockItem.findFirst({
      where: { id: stockItemId, orgId },
    });

    if (!item) throw new Error("Stock item not found");

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
    const item = await prisma.stockItem.findFirst({
      where: { id: stockItemId, orgId },
    });

    if (!item) throw new Error("Stock item not found");

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
