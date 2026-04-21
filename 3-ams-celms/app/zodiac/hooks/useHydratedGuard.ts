import { useAppBootStore } from "@zodiac/store/useAppBootStore";

export function useHydratedGuard() {
  return useAppBootStore((s) => s.isHydrated);
}
