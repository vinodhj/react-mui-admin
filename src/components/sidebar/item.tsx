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
  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  isMobile: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ title, to, icon, selected, setSelected, setCollapsed, setToggled, isMobile }) => {
  const handleClick = () => {
    setSelected(title);
    if (isMobile) {
      setCollapsed(true);
      setToggled(false); // Close sidebar only on mobile
    }
  };
  return (
    <MenuItem active={selected === title} icon={icon} component={<RouterLink to={to} />} onClick={handleClick}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default SidebarItem;
