import React, { FC } from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import startCase from 'lodash/startCase';
import UserMenu from './user-menu';

interface SidebarFooterProps {
  collapsed: boolean;
  userAvatar: string;
  session: { adminName: string; adminEmail: string };
  colors: any;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleLogout: () => void;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': { transform: 'scale(.8)', opacity: 1 },
    '100%': { transform: 'scale(2.4)', opacity: 0 },
  },
}));

const SidebarFooter: FC<SidebarFooterProps> = ({
  collapsed,
  userAvatar,
  session,
  colors,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
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
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar src={userAvatar} alt="User Avatar" sx={{ width: 40, height: 40 }} />
            </StyledBadge>
            <Box textAlign="left">
              <Typography variant="subtitle1" sx={{ color: colors.vibrantBlue[500], fontWeight: 'bold' }}>
                {startCase(session.adminName.toLowerCase())}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.grey[300] }}>
                {session.adminEmail}
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
            <UserMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleMenuClose={handleMenuClose}
              handleLogout={handleLogout}
              colors={colors}
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
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar src={userAvatar} alt="User Avatar" sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={handleMenuOpen} />
          </StyledBadge>
          <UserMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleMenuClose={handleMenuClose}
            handleLogout={handleLogout}
            colors={colors}
          />
        </Box>
      )}
    </>
  );
};

export default SidebarFooter;
