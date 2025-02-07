import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/getToken';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(getToken() ? '/dashboard' : '/');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" textAlign="center">
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
