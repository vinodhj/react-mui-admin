import SidebarItem from './item';
import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import { useLocation } from 'react-router-dom';

interface SidebarMenuItemsProps {
  collapsed: boolean;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  colors: any;
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  isMobile: boolean;
}

const SidebarMenuItems: FC<SidebarMenuItemsProps> = ({ collapsed, selected, setSelected, colors, setCollapsed, setToggled, isMobile }) => {
  const location = useLocation(); // Get current location

  // Map paths to titles with priority for parent routes
  useEffect(() => {
    const pathToTitleMap = [
      { path: '/category/tag', title: 'Tag' },
      { path: '/category/mode', title: 'Mode' },
      { path: '/category/fynix', title: 'Fynix' },
      { path: '/dashboard', title: 'Dashboard' },
      { path: '/team', title: 'Manage Team' },
      { path: '/expense', title: 'Tracker Expense' },
    ].sort((a, b) => b.path.length - a.path.length); // Sort by longest path first

    // Find the first path that matches the start of the current URL
    const matchedEntry = pathToTitleMap.find(({ path }) => location.pathname.startsWith(path));

    setSelected(matchedEntry?.title ?? 'Dashboard');
  }, [location.pathname, setSelected]);
  return (
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
        <SidebarItem
          title="Dashboard"
          to="/dashboard"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />

        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
          Data
        </Typography>
        <SidebarItem
          title="Manage Team"
          to="/team"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />

        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
          Pages
        </Typography>
        <SidebarItem
          title="Tracker Expense"
          to="/expense"
          icon={<PersonOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />

        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
          Stash
        </Typography>
        <SidebarItem
          title="Tag"
          to="/category/tag"
          icon={<CategoryIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />
        <SidebarItem
          title="Mode"
          to="/category/mode"
          icon={<CategoryIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />
        <SidebarItem
          title="Fynix"
          to="/category/fynix"
          icon={<CategoryIcon />}
          selected={selected}
          setSelected={setSelected}
          setCollapsed={setCollapsed}
          setToggled={setToggled}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
};

export default SidebarMenuItems;
