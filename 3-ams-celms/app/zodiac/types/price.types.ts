export type PriceUnit =
  | "Per Page"
  | "Per 100"
  | "Per Sq Meter"
  | "Per Piece"
  | "Per Set"
  | "Per Yard";

export interface PriceItem {
  id: string;
  service: string;
  unit: PriceUnit;
  priceGHS: number;
  category: "Digital" | "Large Format" | "Finishing" | "Apparel";
}
