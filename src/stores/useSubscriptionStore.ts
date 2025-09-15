"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SubscriptionState {
  selectedClub: string | null;
  selectedPlan: string | null;
  selectedOptions: string[];
  setSelectedClub: (clubId: string) => void;
  setSelectedPlan: (planId: string) => void;
  setSelectedOptions: (optionIds: string[]) => void;
  resetSubscription: () => void;
}

const initialSubscription = {
  selectedClub: null as string | null,
  selectedPlan: null as string | null,
  selectedOptions: [] as string[],
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      ...initialSubscription,
      setSelectedClub: (clubId) => set({ selectedClub: clubId }),
      setSelectedPlan: (planId) => set({ selectedPlan: planId }),
      setSelectedOptions: (optionIds) => set({ selectedOptions: optionIds }),
      resetSubscription: () => set({ ...initialSubscription }),
    }),
    {
      name: "subscription-storage", // clé localStorage
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ selectedClub: state.selectedClub, selectedPlan: state.selectedPlan }),
    }
  )
);
