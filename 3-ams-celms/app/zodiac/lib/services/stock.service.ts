// lib/services/stock.service.ts

import { StockRepository } from "@/lib/repositories/stock.repository";

export class StockService {
  static async restock(params: {
    orgId: string;
    stockItemId: string;
    quantity: number;
    unitCost: number;
  }) {
    return StockRepository.restock(
      params.orgId,
      params.stockItemId,
      params.quantity,
      params.unitCost,
    );
  }

  static async deduct(params: {
    orgId: string;
    stockItemId: string;
    amount: number;
  }) {
    return StockRepository.deduct(
      params.orgId,
      params.stockItemId,
      params.amount,
    );
  }
}
