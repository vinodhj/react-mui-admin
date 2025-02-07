import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../graphql/graphql_generated';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function Auth() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [serverError, setServerError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // Using the generated hook for login mutation
  const [login, { loading }] = useLoginMutation();

  // State for Material UI Snackbar notifications
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Validate the form fields before login
  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Clear any previous server error if client-side validation kicks in.
    if (!isValid) {
      setServerError(null);
    }

    return isValid;
  };

  const handleLogin = React.useCallback(() => {
    login({
      variables: { email, password },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        // Clear any previous server error
        setServerError(null);

        if (data?.login?.token) {
          localStorage.setItem('access_token', data.login.token);
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
            open: false,
            message: 'Login failed',
            severity: 'error',
          });
        }
      },
      onError: (err) => {
        setServerError(err.message);
        setSnackbar({
          open: false,
          message: `Login failed: ${err.message}`,
          severity: 'error',
        });
      },
    });
  }, [email, password, login, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {serverError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {serverError}
              </Alert>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) {
                    setEmailError('');
                    setServerError(null);
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    setPasswordError('');
                    setServerError(null);
                  }
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
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
    </ThemeProvider>
  );
}
