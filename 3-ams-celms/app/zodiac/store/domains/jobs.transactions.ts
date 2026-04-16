export const applyJobTransaction = (state, job, materialUsed) => {
  const service = state.prices.find((p) => p.id === job.serviceId);
  if (!service) return null;

  const materialId = service.stock_ref;

  return {
    jobs: [job, ...state.jobs],
    inventory: state.inventory.map((item) =>
      item.id === materialId
        ? {
            ...item,
            totalRemaining: Math.max(0, item.totalRemaining - materialUsed),
          }
        : item,
    ),
  };
};
