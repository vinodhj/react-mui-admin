import createTheme, { Theme } from '@mui/material/styles/createTheme';
import { createContext, useMemo, useState } from 'react';
import { Mode, themeSettings } from '../theme/main-theme';

// Define the shape of the color mode context
interface ColorModeContextProps {
  toggleColorMode: () => void;
  setDarkMode: () => void;
}

// context for color mode
export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  setDarkMode: () => {},
});

// custom hook to manage color mode
export const useMode = (): [Theme, ColorModeContextProps] => {
  const [mode, setMode] = useState<Mode>(() => {
    // Get the saved mode from localStorage, default to 'dark'
    const storedMode = localStorage.getItem('colorMode') as Mode | null;
    return storedMode === 'light' || storedMode === 'dark' ? (storedMode as Mode) : 'dark';
  });

  const colorMode = useMemo<ColorModeContextProps>(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode: Mode = prevMode === 'dark' ? 'light' : 'dark';
          localStorage.setItem('colorMode', newMode);
          return newMode;
        });
      },
      setDarkMode: () => {
        setMode('dark');
        localStorage.setItem('colorMode', 'dark');
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
