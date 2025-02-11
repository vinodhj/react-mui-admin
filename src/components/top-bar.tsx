import { ColorModeContext, tokens } from '../theme/main-theme';

import { useContext, FC } from 'react';
import { useTheme, Box, IconButton, InputBase } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHandleLogout } from '../utils/log-out';

const Topbar: FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  const colorMode = useContext(ColorModeContext);
  const handleLogout = useHandleLogout();

  const toggleSidebar = () => {
    // Replace this with your own sidebar toggle functionality.
    console.log('Sidebar toggle invoked');
  };
  const broken = false; // Replace with your sidebar break point if needed.
  const rtl = false; // Replace with your RTL setting if needed.

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: 'flex',
            backgroundColor: colors.primary[400],
            p: 0.2,
            borderRadius: 1,
          }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
        {broken && rtl && (
          <IconButton sx={{ margin: '0 6 0 2' }} onClick={toggleSidebar}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
