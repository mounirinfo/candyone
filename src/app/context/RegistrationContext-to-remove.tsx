// context/RegistrationContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

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

interface RegistrationContextType {
  registrationData: RegistrationData;
  setSelectedClub: (clubId: number) => void;
  setSelectedPlan: (planId: number) => void;
  setSelectedOptions: (options: number[]) => void;
  setPersonalInfo: (info: RegistrationData['personalInfo']) => void;
  resetRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    selectedClub: null,
    selectedPlan: null,
    selectedOptions: [],
    personalInfo: null
  });

  const updateData = (newData: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...newData }));
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        setSelectedClub: (clubId) => updateData({ selectedClub: clubId }),
        setSelectedPlan: (planId) => updateData({ selectedPlan: planId }),
        setSelectedOptions: (options) => updateData({ selectedOptions: options }),
        setPersonalInfo: (info) => updateData({ personalInfo: info }),
        resetRegistration: () => setRegistrationData({
          selectedClub: null,
          selectedPlan: null,
          selectedOptions: [],
          personalInfo: null
        })
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrationContext() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistrationContext must be used within a RegistrationProvider");
  }
  return context;
}