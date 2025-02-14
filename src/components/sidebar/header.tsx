import { FC } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Box, Typography, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';

interface SidebarHeaderProps {
  collapsed: boolean;
  sidebarRTL: boolean;
  setSidebarRTL: (value: boolean) => void;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  colors: any; // You can type this more specifically if desired.
}

const SidebarHeaderIcon: FC<{
  collapsed: boolean;
  sidebarRTL: boolean;
  setSidebarRTL: (value: boolean) => void;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  colors: any;
}> = ({ collapsed, sidebarRTL, setSidebarRTL, setCollapsed, setToggled, colors }) => {
  const handleMenuClick = () => {
    setToggled(true);
    setCollapsed(false);
  };

  const handleSwitchLeftClick = () => {
    setSidebarRTL(!sidebarRTL);
  };

  const handleSwitchRightClick = () => {
    setSidebarRTL(!sidebarRTL);
  };

  if (collapsed) {
    return <MenuOutlinedIcon onClick={handleMenuClick} />;
  } else if (sidebarRTL) {
    return <SwitchLeftOutlinedIcon sx={{ color: colors.greenAccent[400] }} onClick={handleSwitchLeftClick} />;
  } else {
    return <SwitchRightOutlinedIcon sx={{ color: colors.greenAccent[400] }} onClick={handleSwitchRightClick} />;
  }
};

const SidebarHeader: FC<SidebarHeaderProps> = ({ collapsed, sidebarRTL, setSidebarRTL, setCollapsed, setToggled, colors }) => {
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
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Admin
            </Typography>
            <IconButton
              onClick={() => {
                setCollapsed(true);
                setToggled(false);
              }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </MenuItem>
    </Box>
  );
};

export default SidebarHeader;
