import { FC } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleMenuClose: () => void;
  handleLogout: () => void;
  colors: any; // You can type this more strictly if desired.
}

const SettingMenu: FC<UserMenuProps> = ({ anchorEl, open, handleMenuClose, handleLogout, colors }) => {
  const navigate = useNavigate();
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: { sx: { minWidth: 160, p: 0, border: '1px solid', borderColor: 'divider' } },
      }}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/profile');
        }}
      >
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          <PersonOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          My Profile
        </Typography>
      </MenuItem>
      <Divider />

      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/change-password');
        }}
      >
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          <LockIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          Change Password
        </Typography>
      </MenuItem>

      <Divider />
      <MenuItem
        onClick={() => {
          handleLogout();
          handleMenuClose();
        }}
      >
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default SettingMenu;
