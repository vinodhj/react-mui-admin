import createTheme, { Theme } from '@mui/material/styles/createTheme';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Mode, themeSettings } from '../theme/main-theme';
import getStoredOrPreferredColorMode from '../utils/preferred-color-mode';

// Define the shape of the color mode context
interface ColorModeContextProps {
  toggleColorMode: () => void;
  setSystemMode: () => void;
}

// context for color mode
export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  setSystemMode: () => {},
});

// custom hook to manage color mode
export const useMode = (): [Theme, ColorModeContextProps] => {
  const [mode, setMode] = useState<Mode>(() => {
    // Get the saved mode from localStorage, default to 'dark'
    const storedMode = localStorage.getItem('colorMode') as Mode | null;
    return storedMode === 'light' || storedMode === 'dark' ? (storedMode as Mode) : (getStoredOrPreferredColorMode() as Mode);
  });

  // Effect to listen for system color mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? 'dark' : 'light');
      localStorage.setItem('colorMode', e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const colorMode = useMemo<ColorModeContextProps>(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode: Mode = prevMode === 'dark' ? 'light' : 'dark';
          localStorage.setItem('colorMode', newMode);
          return newMode;
        });
      },
      setSystemMode: () => {
        const systemMode = getStoredOrPreferredColorMode() as Mode;
        setMode(systemMode);
        localStorage.setItem('colorMode', systemMode);
      },
    }),
    [setMode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
