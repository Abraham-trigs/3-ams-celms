"use client";

import { useState } from "react";
import { PriceItem } from "../types/price.types";

export function PriceListModal() {
  // Initial state could be fetched from a usePriceStore later
  const [prices, setPrices] = useState<PriceItem[]>([]);

  return (
    <div className="glass-card p-6 w-full max-h-[80vh] overflow-hidden flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cyan-400">Master Price List</h2>
        <button className="px-4 py-2 bg-cyan-500 text-black text-xs font-bold rounded-lg">
          + Add Service
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] uppercase opacity-40 tracking-widest">
              <th className="pb-2">Service</th>
              <th className="pb-2">Unit</th>
              <th className="pb-2">Price (₵)</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="bg-white/5 rounded-xl">
                <td className="p-4 text-sm font-medium">{item.service}</td>
                <td className="p-4 text-xs opacity-60">{item.unit}</td>
                <td className="p-4 font-mono text-orange-400">
                  ₵{item.priceGHS.toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs opacity-40 hover:opacity-100">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] opacity-30 italic text-center">
        💡 Updates applied here reflect immediately on all client estimates.
      </p>
    </div>
  );
}
