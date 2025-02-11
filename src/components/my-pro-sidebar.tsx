import React, { FC, useState } from 'react';
import { Menu, Sidebar, MenuItem, MenuItemStyles } from 'react-pro-sidebar';
import { tokens } from '../theme/main-theme';
import { useTheme, Box, Typography, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useSidebarContext } from '../hooks/use-sidebar-context';

// Define the props for the sidebar menu item
interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} icon={icon} component={<RouterLink to={to} />} onClick={() => setSelected(title)}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

// MenuItemStyles - In a variable for clarity
const getMenuItemStyles = (mode: 'light' | 'dark', colors: ReturnType<typeof tokens>): MenuItemStyles => ({
  button: ({ active }) => ({
    // No background color by default
    backgroundColor: 'transparent',
    // Hover style
    '&:hover': {
      backgroundColor: 'transparent',
      color: colors.blueAccent[500],
    },
    // Active/selected item
    color: (() => {
      if (active) return colors.greenAccent[500];
      return mode === 'dark' ? colors.grey[100] : '#333';
    })(),
  }),
  icon: {
    backgroundColor: 'transparent',
  },
  label: {
    backgroundColor: 'transparent',
  },
  // You can also override arrow or subMenuContent if needed
});

const MyProSidebar: FC = () => {
  const theme = useTheme();
  const mode = theme.palette.mode; // "dark" | "light"
  const colors = tokens(mode);
  const [selected, setSelected] = useState<string>('Dashboard');
  // Manage collapse state locally
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Context for RTL and sidebar image settings
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();

  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 10000,
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
        collapsed={collapsed}
        rootStyles={{
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Menu menuItemStyles={getMenuItemStyles(mode, colors)}>
          <MenuItem
            icon={(() => {
              if (collapsed) {
                return <MenuOutlinedIcon onClick={() => setCollapsed(false)} />;
              } else if (sidebarRTL) {
                return <SwitchLeftOutlinedIcon onClick={() => setSidebarRTL(!sidebarRTL)} />;
              } else {
                return <SwitchRightOutlinedIcon onClick={() => setSidebarRTL(!sidebarRTL)} />;
              }
            })()}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  component={RouterLink}
                  to="/"
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                >
                  ADMIN
                </Typography>
                <IconButton onClick={() => setCollapsed(true)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={collapsed ? undefined : '10%'}>
            <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Data
            </Typography>
            <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Pages
            </Typography>
            <Item title="Tracker Expense" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
