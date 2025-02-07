import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './logOut';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button variant="contained" color="primary" onClick={() => handleLogout(navigate)}>
      Logout
    </Button>
  );
};

export default LogoutButton;
