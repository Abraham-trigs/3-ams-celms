import { StockItem } from "@/types/zodiac.types";

export const subtractStock = (item: StockItem, amount: number): StockItem => {
  return {
    ...item,
    totalRemaining: Math.max(0, item.totalRemaining - amount),
  };
};

export const addStock = (
  item: StockItem,
  amount: number,
  unitCost: number,
): StockItem => {
  return {
    ...item,
    totalRemaining: item.totalRemaining + amount,
    lastUnitCost: unitCost,
  };
};
