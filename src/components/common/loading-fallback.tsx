import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </div>
);

export default LoadingFallback;
