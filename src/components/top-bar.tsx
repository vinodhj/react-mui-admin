import { tokens } from '../theme/main-theme';
import { useHandleLogout } from '../utils/log-out';
import { ColorModeContext } from '../contexts/color-mode-context';
import { SidebarContext } from '../contexts/sidebar-context';

import { useContext, FC, useState } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';
import UserMenu from './sidebar/user-menu';

const Topbar: FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  const colorMode = useContext(ColorModeContext);
  const handleLogout: () => void = useHandleLogout();
  const sidebarProps = useContext(SidebarContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleSidebar = () => {
    // Replace this with your own sidebar toggle functionality.
    console.log('Sidebar toggle invoked');
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const broken = false; // Replace with your sidebar break point if needed.
  const rtl = false; // Replace with your RTL setting if needed.

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: colors.primary[400],
            p: 0.2,
            borderRadius: 1,
          }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={() => sidebarProps?.setSidebarImage((prev) => !prev)}>
          <CollectionsIcon />
        </IconButton>
        <IconButton onClick={handleUserMenuOpen}>
          <SettingsOutlinedIcon />
        </IconButton>
        <UserMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleMenuClose={handleUserMenuClose}
          handleLogout={handleLogout}
          colors={colors}
        />
        {broken && rtl && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
