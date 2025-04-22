import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useMode } from '../contexts/color-mode-context';

export default function RevokeError({ message }: Readonly<{ message: string }>) {
  const [theme] = useMode();

  const handleSignIn = () => {
    window.location.href = '/';
  };

  return (
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
          {message === 'REVOKE_ERROR' ? (
            <LockOutlinedIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
          ) : (
            <EngineeringIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
          )}

          <Typography variant="h4" component="h1" gutterBottom>
            {message === 'REVOKE_ERROR' ? 'Session Expired' : 'Under Maintenance'}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {message === 'REVOKE_ERROR'
              ? 'Your session has timed out. Please sign in again to continue.'
              : 'Due to the required infrastructure upgrades, the application is currently under maintenance.'}
            <br />
            {message === 'REVOKE_ERROR' && 'Please sign in again to continue.'}
          </Typography>
          {message === 'REVOKE_ERROR' && (
            <Button variant="contained" color="primary" onClick={handleSignIn} sx={{ mt: 4 }}>
              Sign In Again
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
