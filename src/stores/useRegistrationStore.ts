"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RegistrationData {
  selectedClub: number | null;
  selectedPlan: number | null;
  selectedOptions: number[];
  personalInfo: {
    email: string;
    nom: string;
    prenom: string;
    telephone: string;
    // ... autres champs
  } | null;
}

interface RegistrationState {
  registrationData: RegistrationData;
  setSelectedClub: (clubId: number) => void;
  setSelectedPlan: (planId: number) => void;
  setSelectedOptions: (options: number[]) => void;
  setPersonalInfo: (info: RegistrationData["personalInfo"]) => void;
  resetRegistration: () => void;
}

const initialRegistration: RegistrationData = {
  selectedClub: null,
  selectedPlan: null,
  selectedOptions: [],
  personalInfo: null,
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      registrationData: initialRegistration,
      setSelectedClub: (clubId) =>
        set((state) => ({
          registrationData: { ...state.registrationData, selectedClub: clubId },
        })),
      setSelectedPlan: (planId) =>
        set((state) => ({
          registrationData: { ...state.registrationData, selectedPlan: planId },
        })),
      setSelectedOptions: (options) =>
        set((state) => ({
          registrationData: { ...state.registrationData, selectedOptions: options },
        })),
      setPersonalInfo: (info) =>
        set((state) => ({
          registrationData: { ...state.registrationData, personalInfo: info },
        })),
      resetRegistration: () =>
        set({ registrationData: initialRegistration }),
    }),
    {
      name: "registration-storage", // clé localStorage
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // (optionnel) ne persister qu'une partie du state :
      // partialize: (state) => ({ registrationData: state.registrationData }),
    }
  )
);
