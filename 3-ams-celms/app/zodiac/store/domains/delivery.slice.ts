export const createDeliverySlice = (set) => ({
  deliveries: [],

  addDelivery: (delivery) =>
    set((state) => ({
      deliveries: [delivery, ...state.deliveries],
    })),

  updateDelivery: (id, updates) =>
    set((state) => ({
      deliveries: state.deliveries.map((d) =>
        d.id === id ? { ...d, ...updates } : d,
      ),
    })),
});
