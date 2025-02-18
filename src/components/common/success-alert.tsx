import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface AlertProps {
  message: string;
}

const SuccessAlert: React.FC<AlertProps> = ({ message }) => (
  <Box sx={{ m: 2 }}>
    <Alert severity="success" color="success">
      {message}
    </Alert>
  </Box>
);

export default SuccessAlert;
