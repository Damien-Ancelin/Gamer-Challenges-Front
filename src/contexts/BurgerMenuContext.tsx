import { createContext, useContext, useMemo, useState } from 'react';

interface BurgerMenuProviderProps {
  children: React.ReactNode;
}

interface BurgerMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenuContext = createContext<BurgerMenuContextType | null>(null);

export default function BurgerMenuProvider({
  children,
}: BurgerMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <BurgerMenuContext.Provider value={contextValue}>
      {children}
    </BurgerMenuContext.Provider>
  );
}

export function useBurgerMenu() {
  const context = useContext(BurgerMenuContext);
  if (!context) {
    throw new Error('useBurgerMenu must be used within a BurgerMenuProvider');
  }
  return context;
}
