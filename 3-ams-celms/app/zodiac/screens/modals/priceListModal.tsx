"use client";

import { useState, useMemo } from "react";
import { useZodiac } from "../store/zodiac.store";
import priceData from "../data/price-list.json"; // Assuming your JSON is here
import { PriceItem } from "../types/price.types";

export function PriceListModal() {
  const [searchTerm, setSearchTerm] = useState("");
  // In a real flow, you'd pull 'prices' from a usePriceStore
  const [prices] = useState<PriceItem[]>(priceData.services);

  const filteredPrices = useMemo(() => {
    return prices.filter((p) =>
      p.service.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, prices]);

  return (
    <div className="glass-card p-6 w-full max-h-[85vh] overflow-hidden flex flex-col gap-5 border border-cyan-500/20 shadow-2xl">
      {/* Header & Search */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Master Price List
            </h2>
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              Financial Source of Truth
            </p>
          </div>
          <button className="px-4 py-2 bg-cyan-500 text-black text-[10px] font-black rounded-lg uppercase hover:bg-cyan-400 active:scale-95 transition-all">
            + New Service
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Filter services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[9px] uppercase opacity-40 tracking-[0.2em]">
              <th className="pb-2 pl-4">Service Description</th>
              <th className="pb-2">Unit</th>
              <th className="pb-2">Rate (₵)</th>
              <th className="pb-2 text-right pr-4">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((item) => (
              <tr
                key={item.id}
                className="bg-white/5 hover:bg-white/10 transition-all group"
              >
                <td className="p-4 rounded-l-xl text-sm font-medium group-hover:text-cyan-400 transition-colors">
                  {item.service}
                </td>
                <td className="p-4 text-[10px] opacity-50 font-mono uppercase tracking-tighter">
                  per {item.unit}
                </td>
                <td className="p-4 font-mono text-orange-400 font-bold">
                  ₵{item.priceGHS.toFixed(2)}
                </td>
                <td className="p-4 rounded-r-xl text-right pr-4">
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                    ⚙️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPrices.length === 0 && (
          <div className="text-center py-10 opacity-20 text-xs italic">
            No services matching your search...
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/5 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="text-[9px] text-cyan-400 font-bold">
            LIVE SYNC ACTIVE
          </span>
        </div>
        <p className="text-[10px] opacity-30 italic text-center leading-tight">
          💡 Adjusting prices here updates all active job estimators <br /> and
          staff calculators in real-time.
        </p>
      </div>
    </div>
  );
}
