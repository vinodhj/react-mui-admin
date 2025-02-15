import { tokens } from '../theme/main-theme';
import { useHandleLogout } from '../utils/log-out';
import { ColorModeContext } from '../contexts/color-mode-context';
import { SidebarContext } from '../contexts/sidebar-context';

import { useContext, FC, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import SettingMenu from './setting-menu';
import SearchDialog from './search-popover';

const Topbar: FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  // Determine if the screen is mobile (using MUI breakpoints)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const colorMode = useContext(ColorModeContext);
  const handleLogout: () => void = useHandleLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sidebarProps = useContext(SidebarContext);

  const toggleSidebar = () => {
    sidebarProps?.setCollapsed(!sidebarProps.collapsed);
    sidebarProps?.setToggled(!sidebarProps.toggled);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {isMobile && !sidebarProps?.sidebarRTL && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <SearchDialog />
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
        <SettingMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleMenuClose={handleUserMenuClose}
          handleLogout={handleLogout}
          colors={colors}
        />
        {isMobile && sidebarProps?.sidebarRTL && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
