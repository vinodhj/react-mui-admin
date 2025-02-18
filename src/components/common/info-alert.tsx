import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

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
