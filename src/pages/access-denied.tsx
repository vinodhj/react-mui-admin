import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AccessDenied: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'red' }}>
        403 Forbidden: Access Denied !
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        You do not have permission to view this page. Please contact your administrator for access.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleGoHome}>
        Go to Home
      </Button>
      <Typography variant="body1" component="p" gutterBottom sx={{ mt: 1 }}>
        (You will be redirected automatically in 5 seconds)
      </Typography>
    </Box>
  );
};

export default AccessDenied;
