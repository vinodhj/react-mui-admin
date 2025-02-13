import { Link as RouterLink } from 'react-router-dom';
import { useSidebarContext } from '../hooks/use-sidebar-context';
import { tokens } from '../theme/main-theme';
import { useSession } from '../hooks/use-session';
import { useHandleLogout } from '../utils/log-out';

import React, { FC, useState } from 'react';
import { Menu, Sidebar, MenuItem, MenuItemStyles } from 'react-pro-sidebar';
import { Avatar, useTheme, Menu as MuiMenu, MenuItem as MuiMenuItem, ListItemIcon, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import startCase from 'lodash/startCase';

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
  const { session } = useSession();
  const { sidebarRTL, setSidebarRTL, sidebarImage, collapsed, setCollapsed } = useSidebarContext();
  const [selected, setSelected] = useState<string>('Dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useHandleLogout();
  const imageUrl = 'https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg';
  const userAvatar = 'https://i.pravatar.cc/300?img=47';
  const border = mode === 'dark' ? '1px solid' + colors.blackWhite[200] : '1px dotted' + colors.blackWhite[200];

  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        top: 0,
        height: '100vh',
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
        }}
      >
        <Menu menuItemStyles={getMenuItemStyles(mode, colors)}>
          {/* HEADER: Sticky at top */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 2,
            }}
          >
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
          </Box>

          {/* SCROLLABLE MENU ITEMS */}
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 160px)',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: colors.blackWhite[300],
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.greenAccent[400],
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: colors.greenAccent[400],
              },
            }}
          >
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
              {/* Demo: Many items to show scrolling */}
              {[...Array(15)].map((_, i) => (
                <Item
                  key={i}
                  title={`Menu Item ${i + 1}`}
                  to={`/menu-item-${i + 1}`}
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </Box>
          </Box>

          {/* Footer Section - pinned at the bottom */}
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
                // borderTop: '1px solid',
                borderStyle: 'solid',
                borderColor: 'divider',
                backgroundColor: 'transparent',
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={userAvatar} alt="User Avatar" sx={{ width: 40, height: 40 }} />
                <Box textAlign="left">
                  <Typography variant="subtitle1" sx={{ color: colors.vibrantBlue[500], fontWeight: 'bold' }}>
                    {startCase(session.adminName.toLowerCase())}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.grey[300] }}>
                    {session.adminEmail}
                  </Typography>
                  {/* <Typography variant="subtitle2" sx={{ color: colors.grey[300] }}>
                    {startCase(session.adminRole.toLowerCase())}
                  </Typography> */}
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
                <MuiMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  slotProps={{
                    paper: {
                      sx: {
                        minWidth: 160,
                        p: 1,
                      },
                    },
                  }}
                >
                  <MuiMenuItem onClick={handleMenuClose}>
                    <ListItemIcon sx={{ color: colors.grey[100] }}>
                      <PersonOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                      My Profile
                    </Typography>
                  </MuiMenuItem>
                  <Divider />
                  <MuiMenuItem onClick={handleMenuClose}>
                    <ListItemIcon sx={{ color: colors.grey[100] }}>
                      <SettingsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                      Settings
                    </Typography>
                  </MuiMenuItem>
                  <Divider />
                  <MuiMenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon sx={{ color: colors.grey[100] }}>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                      Logout
                    </Typography>
                  </MuiMenuItem>
                </MuiMenu>
              </Box>
            </Box>
          ) : (
            // When collapsed: show only the avatar, centered at bottom
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
              <Avatar src={userAvatar} alt="User Avatar" sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={handleMenuOpen} />
              <MuiMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 160,
                      p: 1,
                    },
                  },
                }}
              >
                <MuiMenuItem onClick={handleMenuClose}>
                  <ListItemIcon sx={{ color: colors.grey[100] }}>
                    <PersonOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                    My Profile
                  </Typography>
                </MuiMenuItem>
                <Divider />
                <MuiMenuItem onClick={handleMenuClose}>
                  <ListItemIcon sx={{ color: colors.grey[100] }}>
                    <SettingsOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                    Settings
                  </Typography>
                </MuiMenuItem>
                <Divider />
                <MuiMenuItem
                  onClick={() => {
                    handleLogout();
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon sx={{ color: colors.grey[100] }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                    Logout &nbsp; <LogoutIcon />
                  </Typography>
                </MuiMenuItem>
              </MuiMenu>
            </Box>
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
