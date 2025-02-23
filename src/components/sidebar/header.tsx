import { FC, memo, useCallback } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';

interface SidebarHeaderProps {
  collapsed: boolean;
  sidebarRTL: boolean;
  setSidebarRTL: (value: boolean | ((prev: boolean) => boolean)) => void;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  colors: any; // You can type this more specifically if desired.
}

const SidebarHeaderIcon: FC<{
  collapsed: boolean;
  sidebarRTL: boolean;
  setSidebarRTL: (value: boolean | ((prev: boolean) => boolean)) => void;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  colors: any;
}> = ({ collapsed, sidebarRTL, setSidebarRTL, setCollapsed, setToggled, colors }) => {
  const handleMenuClick = useCallback(() => {
    setToggled(true);
    setCollapsed(false);
  }, [setToggled, setCollapsed]);

  const toggleSidebarDirection = useCallback(() => {
    setSidebarRTL((prev: boolean) => !prev);
  }, [setSidebarRTL]);

  if (collapsed) {
    return <MenuOutlinedIcon onClick={handleMenuClick} />;
  }
  return (
    <>
      {sidebarRTL ? (
        <SwitchLeftOutlinedIcon sx={{ color: colors.greenAccent[400] }} onClick={toggleSidebarDirection} />
      ) : (
        <SwitchRightOutlinedIcon sx={{ color: colors.greenAccent[400] }} onClick={toggleSidebarDirection} />
      )}
    </>
  );
};

const SidebarHeader: FC<SidebarHeaderProps> = ({ collapsed, sidebarRTL, setSidebarRTL, setCollapsed, setToggled, colors }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/', { replace: true }); // Prevents duplicate re-renders
      }
    },
    [location.pathname, navigate]
  );

  // ✅ Prevent unnecessary state updates
  const handleCollapse = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!collapsed) {
        setCollapsed(true);
        setToggled(false);
      }
    },
    [collapsed, setCollapsed, setToggled]
  );

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 2 }}>
      <MenuItem
        icon={
          <SidebarHeaderIcon
            collapsed={collapsed}
            sidebarRTL={sidebarRTL}
            setSidebarRTL={setSidebarRTL}
            setCollapsed={setCollapsed}
            setToggled={setToggled}
            colors={colors}
          />
        }
        component={<RouterLink to="/" replace />}
        style={{
          margin: '10px 0 20px 0',
          color: colors.grey[100],
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.12)',
        }}
      >
        {!collapsed && (
          <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
            <Typography
              variant="h4"
              color={colors.vibrantBlue[500]}
              sx={{ textDecoration: 'none', fontWeight: 'bold' }}
              onClick={handleAdminClick}
            >
              Admin
            </Typography>
            <IconButton onClick={handleCollapse}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </MenuItem>
    </Box>
  );
};

export default memo(SidebarHeader);
