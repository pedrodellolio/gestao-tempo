import { createContext, useState } from "react";

interface PreferencesContextData {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}

const PreferencesContext = createContext<PreferencesContextData>(
  {} as PreferencesContextData
);
export const PreferencesProvider = ({ children }: Props) => {
  let [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <PreferencesContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
export default PreferencesContext;
