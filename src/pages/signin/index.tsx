import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useLoginMutation } from '../../graphql/graphql-generated';
import { useValidateSignInForm } from '../../hooks/auth/use-validate-signin';
import { useSession } from '../../hooks/use-session';
import Paper from '@mui/material/Paper';
import signInTheme from '../../theme/signIn-theme';
import { Suspense, useCallback } from 'react';
import { useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';

const SignInForm = React.lazy(() => import('../../components/auth/signin-form'));

export default function SignIn() {
  const { updateSession } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [login, { loading }] = useLoginMutation();
  const { values, errors, serverError, setServerError, handleChange, validate } = useValidateSignInForm({
    email: '',
    password: '',
  });

  const handleLogin = useCallback(() => {
    login({
      variables: { email: values.email, password: values.password },
      notifyOnNetworkStatusChange: false,
      onCompleted: (data) => {
        setServerError(null);
        if (data?.login?.token) {
          // Update the session state
          updateSession({
            token: data.login.token,
            adminName: data.login.user?.name ?? '',
            adminEmail: data.login.user?.email ?? '',
            adminRole: data.login.user?.role ?? '',
            adminID: data.login.user?.id ?? '',
            sidebarCollapsed: isMobile ? 'true' : 'false',
          });
        } else {
          setServerError('Login failed');
        }
      },
      onError: (err) => {
        setServerError(err.message);
      },
    });
  }, [values.email, values.password, login, setServerError, updateSession]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await validate()) {
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={signInTheme}>
      <Suspense fallback={<>Loading...</>}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            size={{
              xs: false,
              sm: 4,
              md: 7,
            }}
            sx={{
              backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipPwaVe8g2KzlvObbHdww9zrw4ZI5CRZ2kkbCfm6=s1360-w1360-h1020)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square>
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
      </Suspense>
    </ThemeProvider>
  );
}
