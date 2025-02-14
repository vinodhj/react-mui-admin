import React, { FC, useContext, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { tokens } from '../../theme/main-theme';
import { useSession } from '../../hooks/use-session';
import { useHandleLogout } from '../../utils/log-out';
import SidebarHeader from './header';
import SidebarMenuItems from './sidebar-menu-items';
import SidebarFooter from './footer';
import { getMenuItemStyles } from './menu-item-styles';
import { SidebarContext } from '../../contexts/sidebar-context';

const MyProSidebar: FC = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const { session } = useSession();
  const sidebarProps = useContext(SidebarContext);
  const [selected, setSelected] = useState<string>('Dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Use media query to determine mobile view
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = useHandleLogout();

  const sidbarImageUrl = import.meta.env.VITE_SIDEBAR_IMAGE_URL;
  const userAvatar = import.meta.env.VITE_AVATAR;
  const border = mode === 'dark' ? '1px solid' + colors.blackWhite[200] : '0.2px dotted' + colors.blackWhite[200];

  const finalToggled = isMobile ? sidebarProps?.toggled : false;

  return (
    <Box sx={{ position: 'sticky', display: 'flex', top: 0, height: '100vh', zIndex: 1200 }}>
      <Sidebar
        breakPoint="md"
        rtl={sidebarProps?.sidebarRTL}
        backgroundColor={colors.blackWhite[300]}
        image={sidebarProps?.sidebarImage ? sidbarImageUrl : undefined}
        collapsed={sidebarProps?.collapsed}
        toggled={finalToggled}
        onBackdropClick={() => sidebarProps?.setToggled(false)}
        border-right-width={'2px solid' + colors.blackWhite[200]}
        rootStyles={{ border }}
      >
        <Menu menuItemStyles={getMenuItemStyles(mode, colors)}>
          <SidebarHeader
            collapsed={sidebarProps!.collapsed}
            sidebarRTL={sidebarProps!.sidebarRTL}
            setSidebarRTL={sidebarProps!.setSidebarRTL}
            setCollapsed={sidebarProps!.setCollapsed}
            setToggled={sidebarProps!.setToggled}
            colors={colors}
          />
          <SidebarMenuItems collapsed={sidebarProps!.collapsed} selected={selected} setSelected={setSelected} colors={colors} />
          <SidebarFooter
            collapsed={sidebarProps!.collapsed}
            userAvatar={userAvatar}
            session={session}
            colors={colors}
            anchorEl={anchorEl}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
          />
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
