import { createContext, useContext, useState, ReactNode } from "react";

type SelectedQuantity = 1 | 3 | 6 | 12;

interface SelectedKitContextType {
  selectedQuantity: SelectedQuantity;
  setSelectedQuantity: (qty: SelectedQuantity) => void;
}

const SelectedKitContext = createContext<SelectedKitContextType | undefined>(undefined);

export const SelectedKitProvider = ({ children }: { children: ReactNode }) => {
  const [selectedQuantity, setSelectedQuantity] = useState<SelectedQuantity>(6);

  return (
    <SelectedKitContext.Provider value={{ selectedQuantity, setSelectedQuantity }}>
      {children}
    </SelectedKitContext.Provider>
  );
};

export const useSelectedKit = () => {
  const context = useContext(SelectedKitContext);
  if (!context) {
    throw new Error("useSelectedKit must be used within a SelectedKitProvider");
  }
  return context;
};
