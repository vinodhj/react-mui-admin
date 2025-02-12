import createTheme, { Theme } from '@mui/material/styles/createTheme';
import { createContext, useMemo, useState } from 'react';
import { Mode, themeSettings } from '../theme/main-theme';

// Define the shape of the color mode context
interface ColorModeContextProps {
  toggleColorMode: () => void;
}

// context for color mode
export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

// custom hook to manage color mode
export const useMode = (): [Theme, ColorModeContextProps] => {
  const [mode, setMode] = useState<Mode>('dark');

  const colorMode = useMemo<ColorModeContextProps>(
    () => ({
      toggleColorMode: () => setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
