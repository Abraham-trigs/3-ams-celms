// Pre-defined market benchmarks for April 2026
const MARKET_BENCHMARKS = {
  flex_banner: { avg: 285.0, range: [220, 350] },
  business_cards_100: { avg: 140.0, range: [100, 250] },
  a4_color_print: { avg: 5.5, range: [4.5, 10.0] },
};

export const calculateMarketGap = (serviceId: string, firmPrice: number) => {
  const benchmark = MARKET_BENCHMARKS[serviceId];
  if (!benchmark) return null;

  const diff = ((firmPrice - benchmark.avg) / benchmark.avg) * 100;
  return {
    diff: diff.toFixed(1),
    isHigher: diff > 0,
    marketRange: benchmark.range,
  };
};
