import * as React from 'react';
import { useLoginMutation } from '../../graphql/graphql-generated';
import { useValidateSignInForm } from '../../hooks/auth/use-validate-signin';
import Paper from '@mui/material/Paper';
import { useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../../contexts/auth';
import { useSession } from '../../hooks/use-session';
import SignInForm from '../../components/auth/signin-form';

export default function SignIn() {
  const { setAccessToken } = useAuth();
  const { session, updateSession } = useSession();
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
          updateSession?.({
            session: {
              ...session,
              token: data.login.token,
              sidebarCollapsed: isMobile ? 'true' : 'false',
            },
            sessionAdmin: {
              adminName: data.login.user?.name ?? '',
              adminEmail: data.login.user?.email ?? '',
              adminRole: data.login.user?.role ?? '',
              adminID: data.login.user?.id ?? '',
            },
          });
          setAccessToken(data.login.token);
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        size={{
          xs: false,
          sm: 4,
          md: 7,
        }}
        sx={{
          backgroundImage:
            'linear-gradient(rgba(0.3, 0.3, 0.3, 0.3), rgba(0.3, 0.3, 0.3, 0.7)), url(https://lh3.googleusercontent.com/p/AF1QipPwaVe8g2KzlvObbHdww9zrw4ZI5CRZ2kkbCfm6=s1360-w1360-h1020)',
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
  );
}
