import { createContext, useContext, useState, ReactNode } from "react";

type PopUpContextType = {
  activePopUp: string | null;
  openPopUp: (popUpType: string) => void;
  closePopUp: () => void;
};

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};

export const PopUpProvider = ({ children }: { children: ReactNode }) => {
  const [activePopUp, setActivePopUp] = useState<string | null>(null);

  const openPopUp = (popUpType: string) => setActivePopUp(popUpType);
  const closePopUp = () => setActivePopUp(null);

  return (
    <PopUpContext.Provider value={{ activePopUp, openPopUp, closePopUp }}>
      {children}
    </PopUpContext.Provider>
  );
};
