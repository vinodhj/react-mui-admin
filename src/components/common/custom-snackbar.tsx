import Snackbar from '@mui/material/Snackbar';
import CustomAlert from './custom-alert';

interface CustomSnackbarProps {
  readonly open: boolean;
  readonly message?: string;
  readonly severity: 'success' | 'error' | 'info' | 'warning';
  readonly onClose: () => void;
  readonly autoHideDuration?: number;
}

function CustomSnackbar({ open, message, severity, onClose, autoHideDuration = 6000 }: CustomSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <CustomAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
}

export default CustomSnackbar;
