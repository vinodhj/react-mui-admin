import React, { FC, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { useSidebarContext } from '../../hooks/use-sidebar-context';
import { tokens } from '../../theme/main-theme';
import { useSession } from '../../hooks/use-session';
import { useHandleLogout } from '../../utils/log-out';
import SidebarHeader from './header';
import SidebarMenuItems from './sidebar-menu-items';
import SidebarFooter from './footer';
import { getMenuItemStyles } from './menu-item-styles';

const MyProSidebar: FC = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const { session } = useSession();
  const { sidebarRTL, setSidebarRTL, sidebarImage, collapsed, setCollapsed } = useSidebarContext();
  const [selected, setSelected] = useState<string>('Dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = useHandleLogout();

  const sidbarImageUrl = import.meta.env.VITE_SIDEBAR_IMAGE_URL;
  const userAvatar = import.meta.env.VITE_AVATAR;
  const border = mode === 'dark' ? '1px solid' + colors.blackWhite[200] : '0.2px dotted' + colors.blackWhite[200];

  return (
    <Box sx={{ position: 'sticky', display: 'flex', top: 0, height: '100vh', zIndex: 1200 }}>
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.blackWhite[300]}
        image={sidebarImage ? sidbarImageUrl : undefined}
        collapsed={collapsed}
        border-right-width={'2px solid' + colors.blackWhite[200]}
        rootStyles={{ border }}
      >
        <Menu menuItemStyles={getMenuItemStyles(mode, colors)}>
          <SidebarHeader
            collapsed={collapsed}
            sidebarRTL={sidebarRTL}
            setSidebarRTL={setSidebarRTL}
            setCollapsed={setCollapsed}
            colors={colors}
          />
          <SidebarMenuItems collapsed={collapsed} selected={selected} setSelected={setSelected} colors={colors} />
          <SidebarFooter
            collapsed={collapsed}
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
