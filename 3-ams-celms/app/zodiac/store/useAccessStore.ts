import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "ADMIN" | "OPERATOR" | "CASHIER" | "GUEST";
type Plan = "BASIC" | "PRO";

interface AccessState {
  userRole: Role;
  subscription: Plan; // ✅ Track current plan

  // Actions
  setRole: (role: Role) => void;
  setSubscription: (plan: Plan) => void; // ✅ Setter for plans

  // Logic Helpers
  getJobLimit: () => number; // ✅ Returns 50 for BASIC, Infinity for PRO
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
      subscription: "BASIC", // Default on install

      setRole: (role) => set({ userRole: role }),

      setSubscription: (plan) => set({ subscription: plan }),

      getJobLimit: () => {
        return get().subscription === "PRO" ? Infinity : 50;
      },

      can: (permission) => {
        const { userRole, subscription } = get();

        // Permission Matrix
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

        // Plan Constraint: Even an ADMIN cannot see advanced analytics on BASIC
        if (permission === "ADVANCED_ANALYTICS" && subscription === "BASIC") {
          return false;
        }

        return permissions[userRole]?.includes(permission) ?? false;
      },
    }),
    { name: "zodiac-access-storage" },
  ),
);
