// authUtils.ts
import { NavigateFunction } from 'react-router-dom';

export const handleLogout = (navigate: NavigateFunction) => {
  localStorage.clear();
  sessionStorage.clear();
  // Pass a logout message via navigation state
  navigate('/', { state: { logoutMessage: 'Logout successfully!' } });
};
