import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <Box sx={{ m: 2 }}>
    <Alert severity="error">Error: {message}</Alert>
  </Box>
);

export default ErrorAlert;
