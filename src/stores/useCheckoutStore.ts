// stores/useCheckoutStore.ts
"use client";
import { create } from "zustand";

export interface Coordonnees {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  anniversaire?: string;
  numero?: string;
  rue?: string;
  codePostal?: string;
  ville?: string;
  genre?: string;
  acceptMarketing?: boolean;
  acceptContact?: boolean;
}

interface CheckoutState {
  step: number;
  setStep: (step: number) => void;

  data: Partial<{
    clubId: string;
    abonnementId: string;
    options: string[];
    coordonnees: Coordonnees;
  }>;
  updateData: (newData: Partial<CheckoutState["data"]>) => void;

  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),

  data: {},
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),

  resetCheckout: () => set({ step: 1, data: {} }),
}));
