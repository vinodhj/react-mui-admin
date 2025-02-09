/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define Theme Context Type including sidebar state
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Create Context for Theme
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const storedSidebar = localStorage.getItem('sidebarCollapsed');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Set theme mode: "system" (uses system preference) or "light"/"dark"
  const [mode, setMode] = useState<string>(storedTheme ?? 'system');

  // Compute the actual mode (light or dark)
  const systemMode = prefersDarkMode ? 'dark' : 'light';
  const computedMode = mode === 'system' ? systemMode : mode;

  // Compute initial sidebar collapsed state:
  // If a value is stored, use it; otherwise, default to collapsed when in dark mode.
  const initialSidebarCollapsed = storedSidebar !== null ? storedSidebar === 'true' : computedMode === 'dark';

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(initialSidebarCollapsed);

  useEffect(() => {
    if (mode !== 'system') {
      localStorage.setItem('theme', mode);
    }
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: computedMode as 'light' | 'dark',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
    });
  }, [computedMode]);

  const contextValue = useMemo(() => ({ mode, setMode, sidebarCollapsed, setSidebarCollapsed }), [mode, sidebarCollapsed]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
