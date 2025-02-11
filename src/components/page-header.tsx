import { FC } from 'react';
import { Typography, Box, useTheme, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { tokens } from '../theme/main-theme';
import { startCase } from 'lodash';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: '5px' }}>
        {title}
      </Typography>
      {title.toLowerCase() !== 'dashboard' && (
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="inherit" href="/Dashboard">
              Dashboard
            </Link>
            <Typography color="text.primary"> {startCase(title.toLowerCase())}</Typography>
          </Breadcrumbs>
        </Box>
      )}
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
