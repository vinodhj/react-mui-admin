import { tokens } from '../theme/main-theme';

import { FC } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import startCase from 'lodash/startCase';
import { Link as RouterLink } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ mb: '5px' }}>
        {title}
      </Typography>
      {title.toLowerCase() !== 'dashboard' && (
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" component={RouterLink} to="/dashboard">
              Dashboard
            </Link>
            <Typography color="text.primary"> {startCase(title.toLowerCase())}</Typography>
          </Breadcrumbs>
        </Box>
      )}
      <Typography variant="h6" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
