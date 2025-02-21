import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import signInTheme from '../theme/signIn-theme';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, useLocation } from 'react-router-dom';

export default function RevokeError() {
  const location = useLocation();
  // If we didn't navigate here with an actual revoke error state, redirect to the sign-in page
  if (location.search !== '?revokeError=true') {
    return <Navigate to="/" replace />;
  }
  const theme = useTheme();

  const handleSignIn = () => {
    // Redirect to the sign-in page. Adjust the URL if necessary.
    window.location.href = '/signin';
  };

  return (
    <ThemeProvider theme={signInTheme}>
      <CssBaseline />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(to bottom right, ${theme.palette.primary.light}, #fff)`,
          padding: 2,
        }}
      >
        <Grid size={{ xs: 12, sm: 8, md: 5 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Session Expired
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
              For security reasons, your session is no longer valid.
              <br />
              Please sign in again to continue.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSignIn} sx={{ mt: 4 }}>
              Sign In Again
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
