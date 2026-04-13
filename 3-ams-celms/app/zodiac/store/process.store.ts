"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProcessState {
  currentStep: number;
  data: Record<string, any>;
}

interface ProcessStore {
  sessions: Record<string, ProcessState>;

  updateStep: (processId: string, step: number) => void;
  updateData: (processId: string, newData: Record<string, any>) => void;
  resetProcess: (processId: string) => void;

  getProcess: (processId: string) => ProcessState;
}

export const useProcessStore = create<ProcessStore>()(
  persist(
    (set, get) => ({
      sessions: {},

      getProcess: (id) => {
        return get().sessions[id] || { currentStep: 0, data: {} };
      },

      updateStep: (id, step) =>
        set((state) => {
          const prev = state.sessions[id];

          // 🚫 prevent useless updates
          if (prev?.currentStep === step) return state;

          return {
            sessions: {
              ...state.sessions,
              [id]: {
                ...(prev || { data: {} }),
                currentStep: step,
              },
            },
          };
        }),

      updateData: (id, newData) =>
        set((state) => {
          const prev = state.sessions[id];
          const prevData = prev?.data || {};

          // shallow compare → avoid unnecessary writes
          const hasChange = Object.keys(newData).some(
            (key) => prevData[key] !== newData[key],
          );

          if (!hasChange) return state;

          return {
            sessions: {
              ...state.sessions,
              [id]: {
                ...(prev || { currentStep: 0 }),
                data: { ...prevData, ...newData },
              },
            },
          };
        }),

      resetProcess: (id) =>
        set((state) => {
          if (!state.sessions[id]) return state;

          const newSessions = { ...state.sessions };
          delete newSessions[id];

          return { sessions: newSessions };
        }),
    }),
    {
      name: "zodiac-process-memory",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined,
      ),
    },
  ),
);
