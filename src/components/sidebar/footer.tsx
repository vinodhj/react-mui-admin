import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import startCase from 'lodash/startCase';
import SettingMenu from '../setting-menu';
import StyleBadge from '../style-badge';

interface SidebarFooterProps {
  collapsed: boolean;
  userAvatar: string;
  sessionAdmin: { adminName: string; adminEmail: string };
  colors: any;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleLogout: () => void;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  isMobile: boolean;
}

const SidebarFooter: FC<SidebarFooterProps> = ({
  collapsed,
  userAvatar,
  sessionAdmin,
  colors,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
  setCollapsed,
  setToggled,
  isMobile,
}) => {
  return (
    <>
      {!collapsed ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            borderStyle: 'solid',
            borderColor: 'divider',
            backgroundColor: 'transparent',
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <StyleBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar src={userAvatar} alt={sessionAdmin.adminName.toUpperCase()} sx={{ width: 40, height: 40 }} />
            </StyleBadge>
            <Box textAlign="left">
              <Typography variant="subtitle1" sx={{ color: colors.vibrantBlue[500], fontWeight: 'bold' }}>
                {startCase(sessionAdmin.adminName.toLowerCase())}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.grey[300] }}>
                {sessionAdmin.adminEmail}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              aria-label="more"
              onClick={handleMenuOpen}
              sx={{
                color: colors.grey[100],
                border: '1px solid ' + colors.grey[300],
                width: 40,
                height: 40,
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <SettingMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleMenuClose={handleMenuClose}
              handleLogout={handleLogout}
              colors={colors}
              setCollapsed={setCollapsed}
              setToggled={setToggled}
              isMobile={isMobile}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <StyleBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar
              src={userAvatar}
              alt={sessionAdmin.adminName.toUpperCase()}
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
              onClick={handleMenuOpen}
            />
          </StyleBadge>
          <SettingMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
            colors={colors}
            setCollapsed={setCollapsed}
            setToggled={setToggled}
            isMobile={isMobile}
          />
        </Box>
      )}
    </>
  );
};

export default SidebarFooter;
