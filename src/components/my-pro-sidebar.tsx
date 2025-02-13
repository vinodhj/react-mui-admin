import { Link as RouterLink } from 'react-router-dom';
import { useSidebarContext } from '../hooks/use-sidebar-context';
import { tokens } from '../theme/main-theme';

import React, { FC, useState } from 'react';
import { Menu, Sidebar, MenuItem, MenuItemStyles } from 'react-pro-sidebar';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';

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
      color: colors.blueAccent[400],
    },
    // Active/selected item
    color: (() => {
      if (active) return colors.greenAccent[400];
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

  // Context for RTL and sidebar image settings
  const { sidebarRTL, setSidebarRTL, sidebarImage, collapsed, setCollapsed } = useSidebarContext();

  const imageUrl = 'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg';

  const border = mode === 'dark' ? '1px solid' + colors.blackWhite[200] : '1px dotted' + colors.blackWhite[200];

  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 1200,
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.blackWhite[300]}
        image={sidebarImage ? imageUrl : undefined}
        collapsed={collapsed}
        border-right-width={'2px solid' + colors.blackWhite[200]}
        rootStyles={{
          border,
          // boxShadow: 'none',
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
                  color={colors.vibrantBlue[500]}
                  component={RouterLink}
                  to="/"
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Admin
                </Typography>
                <IconButton onClick={() => setCollapsed(true)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={collapsed ? undefined : '2%'}>
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
