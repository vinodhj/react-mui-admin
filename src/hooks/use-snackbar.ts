import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

export const useSnackbar = (initialState?: Partial<SnackbarState>) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
    ...initialState,
  });

  // Handle alert messages from navigation state
  useEffect(() => {
    const alertType = location.state?.alertType as string | undefined;
    const alertMessage = location.state?.alertMessage as string | undefined;

    if (alertMessage) {
      setSnackbar({
        open: true,
        message: alertMessage,
        severity: (alertType as SnackbarSeverity) || 'success',
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
};
