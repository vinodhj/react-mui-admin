import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(function CustomAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default CustomAlert;
