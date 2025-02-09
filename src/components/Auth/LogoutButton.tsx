import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHandleLogout } from '../../utils/logOut';

const LogoutButton: React.FC<object> = () => {
  const handleLogout = useHandleLogout();
  return (
    <Button variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
