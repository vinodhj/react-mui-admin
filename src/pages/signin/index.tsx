// src/pages/signin/index.tsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../graphql/graphql_generated';
import { SignInForm } from '../../components/Auth/SignInForm';
import { useForm } from '../../components/Auth/useForm';
import { useSession } from '../../hooks/useSession';
import { Paper } from '@mui/material';
import signInTheme from '../../theme/signInTheme';

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateSession } = useSession();

  // Capture the logout message from location state once
  const [initialLogoutMessage] = React.useState<string | null>(location.state?.logoutMessage || null);
  // Control Snackbar open state based on the captured message
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = React.useState<boolean>(!!initialLogoutMessage);

  // Clear the location state so refreshes don't show the message again
  React.useEffect(() => {
    if (initialLogoutMessage) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [initialLogoutMessage, location.pathname, navigate]);

  const handleLogoutSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setLogoutSnackbarOpen(false);
  };

  const [login, { loading }] = useLoginMutation();
  const { values, errors, serverError, setServerError, handleChange, validate } = useForm({
    email: '',
    password: '',
  });

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = React.useCallback(() => {
    login({
      variables: { email: values.email, password: values.password },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        setServerError(null);
        if (data?.login?.token) {
          // Update the session state
          updateSession({
            token: data.login.token,
            adminName: data.login.user?.name ?? '',
            adminEmail: data.login.user?.email ?? '',
            adminRole: data.login.user?.role ?? '',
          });
          setSnackbar({
            open: true,
            message: 'Logged in successfully',
            severity: 'success',
          });
          // Navigate to dashboard after a short delay to show the snackbar
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          setServerError('Login failed');
          setSnackbar({
            open: true,
            message: 'Login failed',
            severity: 'error',
          });
        }
      },
      onError: (err) => {
        setServerError(err.message);
        setSnackbar({
          open: true,
          message: `Login failed: ${err.message}`,
          severity: 'error',
        });
      },
    });
  }, [values.email, values.password, login, navigate, setServerError, updateSession]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={signInTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipPwaVe8g2KzlvObbHdww9zrw4ZI5CRZ2kkbCfm6=s1360-w1360-h1020)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <SignInForm
            serverError={serverError}
            values={values}
            errors={errors}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {initialLogoutMessage && (
        <Snackbar
          open={logoutSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleLogoutSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleLogoutSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {initialLogoutMessage}
          </Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
}
