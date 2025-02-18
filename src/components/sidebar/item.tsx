import React, { FC } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarItem: FC<SidebarItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} icon={icon} component={<RouterLink to={to} />} onClick={() => setSelected(title)}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default SidebarItem;
