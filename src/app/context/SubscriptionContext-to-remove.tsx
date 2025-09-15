'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

// Définition des types pour les données du contexte
interface SubscriptionContextType {
  selectedClub: string | null;
  selectedPlan: string | null;
  selectedOptions: string[];
  setSelectedClub: (clubId: string) => void;
  setSelectedPlan: (planId: string) => void;
  setSelectedOptions: (optionIds: string[]) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <SubscriptionContext.Provider
      value={{
        selectedClub,
        selectedPlan,
        selectedOptions,
        setSelectedClub,
        setSelectedPlan,
        setSelectedOptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptionContext = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
};
