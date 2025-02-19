import { tokens } from '../../theme/main-theme';
import PageHeader from '../../components/pages/page-header';
import StatBox from '../../components/stat-box';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Grid from '@mui/material/Grid2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Dashboard() {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box
        display={smScreen ? 'flex' : 'block'}
        flexDirection={smScreen ? 'row' : 'column'}
        justifyContent={smScreen ? 'space-between' : 'start'}
        alignItems={smScreen ? 'center' : 'start'}
        m="10px 0"
      >
        <PageHeader
          title="DASHBOARD"
          subtitle="A streamlined interface designed specifically for administrators, the admin dashboard provides real-time insights into system performance, user activity, and key metrics."
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '13px',
              fontWeight: 'bold',
              padding: '10px 10px',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '4px' }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
          <Box width="100%" sx={{ backgroundColor: colors.primary[400] }} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress={0.5}
              increase="+5%"
              icon={<PersonAddIcon sx={{ color: colors.greenAccent[400], fontSize: '26px' }} />}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
