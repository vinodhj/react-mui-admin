import React from 'react';
import { Box, Alert } from '@mui/material';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <Box sx={{ m: 2 }}>
    <Alert severity="error">Error: {message}</Alert>
  </Box>
);

export default ErrorAlert;
