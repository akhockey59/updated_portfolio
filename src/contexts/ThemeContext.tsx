import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorTheme = 'blue' | 'purple' | 'green' | 'cyan' | 'orange';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useColorTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('color-theme');
    if (saved && ['blue', 'purple', 'green', 'cyan', 'orange'].includes(saved)) {
      setColorTheme(saved as ColorTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-cyan', 'theme-orange');
    
    // Add current theme class
    root.classList.add(`theme-${colorTheme}`);
    
    // Save to localStorage
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme, mounted]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};