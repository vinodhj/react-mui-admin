import React from 'react';
import { Box, Alert } from '@mui/material';

interface InfoAlertProps {
  message: string;
}

const InfoAlert: React.FC<InfoAlertProps> = ({ message }) => (
  <Box sx={{ m: 2 }}>
    <Alert severity="info" color="info">
      {message}
    </Alert>
  </Box>
);

export default InfoAlert;
