import { createTheme } from '@mui/material/styles';

const signInTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // A pleasant blue for primary elements
      main: '#556cd6',
    },
    secondary: {
      // A soft teal for accents
      //   main: '#19857b',
      main: 'rgb(156, 39, 176)',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      // Light background for the whole app and paper elements
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
    fontSize: 12,
    h5: {
      // Adjust header style for sign in page titles
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '2rem',
          borderRadius: 12,
        },
      },
    },
  },
});

export default signInTheme;
