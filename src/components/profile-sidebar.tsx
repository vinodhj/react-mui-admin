import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme/main-theme';
import { useHandleLogout } from '../utils/log-out';
import { useLocation } from 'react-router-dom';

interface ProfileSidebarProps {
  user: {
    name: string;
    email: string;
  };
  onEditProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, onEditProfileClick, onChangePasswordClick }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const handleLogout = useHandleLogout();
  const location = useLocation();

  const isChangePasswordPage = location.pathname === '/change-password';
  const isEditProfilePage = location.pathname === '/edit-profile';

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: '100%', md: 280 },
        p: 3,
        borderRadius: 2,
        mb: { xs: 2, md: 0 },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 90, height: 90, fontSize: 32 }} alt={user.name.charAt(0)}>
          {user.name.charAt(0)}
        </Avatar>
        <Typography variant="h6" fontWeight="bold" mt={1}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem
          onClick={isEditProfilePage ? undefined : onEditProfileClick}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.grey[900],
            },
            color: isEditProfilePage ? colors.greenAccent[400] : 'inherit',
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: isEditProfilePage ? colors.greenAccent[400] : 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem
          onClick={isChangePasswordPage ? undefined : onChangePasswordClick}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.grey[900],
            },
            color: isChangePasswordPage ? colors.greenAccent[400] : 'inherit',
          }}
        >
          <ListItemIcon>
            <LockIcon sx={{ color: isChangePasswordPage ? colors.greenAccent[400] : 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem
          onClick={handleLogout}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.grey[900],
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default ProfileSidebar;
