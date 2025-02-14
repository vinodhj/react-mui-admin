import React, { FC } from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListItemIcon, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleMenuClose: () => void;
  handleLogout: () => void;
  colors: any; // You can type this more strictly if desired.
}

const UserMenu: FC<UserMenuProps> = ({ anchorEl, open, handleMenuClose, handleLogout, colors }) => {
  return (
    <MuiMenu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: { sx: { minWidth: 160, p: 0, border: '1px solid', borderColor: 'divider' } },
      }}
    >
      <MuiMenuItem onClick={handleMenuClose}>
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          <PersonOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          My Profile
        </Typography>
      </MuiMenuItem>
      <Divider />
      <MuiMenuItem onClick={handleMenuClose}>
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          <SettingsOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" sx={{ color: colors.grey[100] }}>
          Settings
        </Typography>
      </MuiMenuItem>
      <Divider />
      <MuiMenuItem
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
      </MuiMenuItem>
    </MuiMenu>
  );
};

export default UserMenu;
