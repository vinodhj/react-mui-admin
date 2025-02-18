import React, { FC } from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ProgressCircle from './progress-circle';
import { tokens } from '../theme/main-theme';

interface StatBoxProps {
  title: string;
  subtitle: string;
  progress: number;
  increase: string;
  icon: React.ReactNode;
}

const StatBox: FC<StatBoxProps> = ({ title, subtitle, progress, increase, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" p="25px 0">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h3" fontWeight="bold" sx={{ color: colors.grey[400], p: '10px 0' }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" fontWeight="bold" sx={{ color: colors.greenAccent[400] }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[400] }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
