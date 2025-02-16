import { ThemeOptions } from '@mui/material/styles';
// import "@mui/x-data-grid/themeAugmentation";

// Define mode type
export type Mode = 'light' | 'dark';

// Define a type for color palettes
interface ColorPalette {
  [shade: number]: string;
}

// Define tokens interface
interface Tokens {
  blackWhite: ColorPalette;
  grey: ColorPalette;
  primary: ColorPalette;
  greenAccent: ColorPalette;
  redAccent: ColorPalette;
  blueAccent: ColorPalette;
  vibrantBlue: ColorPalette;
}

interface SearchTokens {
  primary: ColorPalette;
  secondary?: ColorPalette;
  neutral?: ColorPalette;
}

// color design tokens export
export const tokens = (mode: Mode): Tokens => ({
  ...(mode === 'dark'
    ? {
        blackWhite: {
          100: '#000000',
          200: '#1a1a1a',
          300: 'rgba(11, 41, 72, 0.9)',
          400: '#4d4d4d',
          500: '#666666',
          600: '#808080',
          700: '#999999',
          800: '#b3b3b3',
          900: '#cccccc',
        },
        grey: {
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#4d4d4d',
        },
        primary: {
          100: '#d0d1d5',
          200: '#a1a4ab',
          300: '#727681',
          400: '#1F2A40',
          500: '#141b2d',
          600: '#101624',
          700: '#0c101b',
          800: '#080b12',
          900: '#040509',
        },
        greenAccent: {
          100: '#dbf5ee',
          200: '#b7ebde',
          300: '#94e2cd',
          400: '#70d8bd',
          500: '#4cceac',
          600: '#3da58a',
          700: '#2e7c67',
          800: '#1e5245',
          900: '#0f2922',
        },
        redAccent: {
          100: '#f8dcdb',
          200: '#f1b9b7',
          300: '#e99592',
          400: '#e2726e',
          500: '#db4f4a',
          600: '#af3f3b',
          700: '#832f2c',
          800: '#58201e',
          900: '#2c100f',
        },
        blueAccent: {
          100: '#e1e2fe',
          200: '#c3c6fd',
          300: '#a4a9fc',
          400: '#868dfb',
          500: '#6870fa',
          600: '#535ac8',
          700: '#3e4396',
          800: '#2a2d64',
          900: '#151632',
        },
        vibrantBlue: {
          100: '#cce0fd', // now the lightest variant becomes the light accent
          200: '#99cdf8',
          300: '#66bbf2',
          400: '#33a9ec',
          500: '#0098e5', // base remains the same
          600: '#0088cc',
          700: '#006699',
          800: '#003d66',
          900: '#001f33', // darkest variant used for high contrast on dark backgrounds
        },
      }
    : {
        blackWhite: {
          100: '#ffffff',
          200: '#4b2323',
          300: 'rgba(255, 255, 255, 0.9)',
          400: '#c6c6c6',
          500: '#b0b0b0',
          600: '#999999',
          700: '#7f7f7f',
          800: '#666666',
          900: '#333333',
        },
        grey: {
          100: '#141414',
          200: '#292929',
          300: '#3d3d3d',
          400: '#525252',
          500: '#666666',
          600: '#858585',
          700: '#a3a3a3',
          800: '#c2c2c2',
          900: '#e0e0e0',
        },
        primary: {
          100: '#040509',
          200: '#080b12',
          300: '#0c101b',
          400: '#e0dddd',
          500: '#141b2d',
          600: '#1F2A40',
          700: '#727681',
          800: '#a1a4ab',
          900: '#d0d1d5',
        },
        greenAccent: {
          100: '#0f2922',
          200: '#1e5245',
          300: '#2e7c67',
          400: '#3da58a',
          500: '#4cceac',
          600: '#70d8bd',
          700: '#94e2cd',
          800: '#b7ebde',
          900: '#dbf5ee',
        },
        redAccent: {
          100: '#2c100f',
          200: '#58201e',
          300: '#832f2c',
          400: '#af3f3b',
          500: '#db4f4a',
          600: '#e2726e',
          700: '#e99592',
          800: '#f1b9b7',
          900: '#f8dcdb',
        },
        blueAccent: {
          100: '#151632',
          200: '#2a2d64',
          300: '#3e4396',
          400: '#535ac8',
          500: '#6870fa',
          600: '#868dfb',
          700: '#a4a9fc',
          800: '#c3c6fd',
          900: '#e1e2fe',
        },
        vibrantBlue: {
          100: '#001f33', // very dark navy blue
          200: '#003d66',
          300: '#006699',
          400: '#0088cc',
          500: '#0098e5', // base vibrant blue
          600: '#33a9ec',
          700: '#66bbf2',
          800: '#99cdf8',
          900: '#cce0fd', // very light blue
        },
      }),
});

export const SearchTokens = (mode: Mode): SearchTokens => ({
  ...(mode === 'dark'
    ? {
        primary: {
          100: '#d0d1d5',
          200: '#141a21cc',
          300: '#727681',
          400: '#1F2A40',
          500: '#141b2d',
          600: '#101624',
          700: '#0c101b',
          800: '#080b12',
          900: '#040509',
        },
      }
    : {
        primary: {
          100: '#040509',
          200: '#ffffff',
          300: '#0c101b',
          400: '#e0dddd',
          500: '#141b2d',
          600: '#1F2A40',
          700: '#727681',
          800: '#a1a4ab',
          900: '#d0d1d5',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: Mode): ThemeOptions => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
              // default: '#0b2948',
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              // default: '#fcfcfc',
              default: '#ffffff',
            },
          }),
    },
    typography: {
      fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
    // components: {
    //   MuiDataGrid: {
    //     styleOverrides: {
    //       columnHeaders: {
    //         backgroundColor: "#3e4396 !important",
    //       },
    //       // or override other slots
    //     },
    //   },
    // },
  };
};
