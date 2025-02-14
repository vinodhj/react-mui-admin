import SidebarItem from './item';
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

interface SidebarMenuItemsProps {
  collapsed: boolean;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  colors: any;
}

const SidebarMenuItems: FC<SidebarMenuItemsProps> = ({ collapsed, selected, setSelected, colors }) => {
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
        <SidebarItem title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
          Data
        </Typography>
        <SidebarItem title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

        <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
          Pages
        </Typography>
        <SidebarItem title="Tracker Expense" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

        {/* Demo: Generate multiple items */}
        {[...Array(15)].map((_, i) => (
          <SidebarItem
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
  );
};

export default SidebarMenuItems;
