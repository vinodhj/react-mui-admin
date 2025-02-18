import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../../theme/main-theme';
import { useTheme } from '@mui/material';

interface NewUserButtonProps {
  to: string;
  label: string;
}

const NewUserButton = ({ to, label }: NewUserButtonProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="contained"
      component={RouterLink}
      to={to}
      sx={{
        borderRadius: '8px',
        backgroundColor: colors.primary[100],
        color: colors.blackWhite[100],
        textTransform: 'none',
        '&:hover': {
          backgroundColor: colors.greenAccent[300],
        },
      }}
    >
      {label}
    </Button>
  );
};

export default NewUserButton;
