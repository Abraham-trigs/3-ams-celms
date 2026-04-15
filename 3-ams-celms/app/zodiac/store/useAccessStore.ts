import { create } from "zustand";
import { persist } from "zustand/middleware";

// ✅ Aligned with your PlanSelectionForm IDs
type Role = "ADMIN" | "OPERATOR" | "CASHIER" | "GUEST";
type Plan = "FREE" | "GROW" | "DOMINATE";

interface AccessState {
  userRole: Role;
  subscription: Plan;

  // Actions
  setRole: (role: Role) => void;
  setSubscription: (plan: Plan) => void;

  // Logic Helpers
  getJobLimit: () => number;
  can: (
    permission:
      | "EDIT_PRICES"
      | "VIEW_SETTINGS"
      | "DELETE_DATA"
      | "ADVANCED_ANALYTICS",
  ) => boolean;
}

export const useAccessStore = create<AccessState>()(
  persist(
    (set, get) => ({
      userRole: "ADMIN",
      subscription: "FREE", // Default state before onboarding

      setRole: (role) => set({ userRole: role }),

      setSubscription: (plan) => set({ subscription: plan }),

      // ✅ Robust mapping for the new Plan tiers
      getJobLimit: () => {
        const { subscription } = get();
        const limits: Record<Plan, number> = {
          FREE: 10, // Free starters
          GROW: 100, // Growing teams
          DOMINATE: Infinity, // High-volume printing
        };
        return limits[subscription];
      },

      can: (permission) => {
        const { userRole, subscription } = get();

        const permissions: Record<Role, string[]> = {
          ADMIN: [
            "EDIT_PRICES",
            "VIEW_SETTINGS",
            "DELETE_DATA",
            "ADVANCED_ANALYTICS",
          ],
          OPERATOR: [],
          CASHIER: [],
          GUEST: [],
        };

        // ✅ Plan-based gating: Analytics only for paid tiers (GROW/DOMINATE)
        if (permission === "ADVANCED_ANALYTICS" && subscription === "FREE") {
          return false;
        }

        return permissions[userRole]?.includes(permission) ?? false;
      },
    }),
    { name: "zodiac-access-storage" },
  ),
);
