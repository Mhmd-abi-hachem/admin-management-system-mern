import React, { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../shared/hooks/useLocalStorageState";

interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextValue | null>(null);

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// A custom hook to consume the DarkModeContext directly.
function useDarkMode(): DarkModeContextValue {
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
