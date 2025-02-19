import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { SessionContext } from '../../contexts/session-context';
import { useContext } from 'react';
import startCase from 'lodash/startCase';
import PageHeader from '../../components/pages/page-header';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme/main-theme';
import { useHandleLogout } from '../../utils/log-out';

const Profile = () => {
  const sessionDetails = useContext(SessionContext);
  const { session } = sessionDetails ?? {};
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const handleLogout = useHandleLogout();

  const user = {
    name: session?.adminName ?? '',
    email: session?.adminEmail ?? '',
    role: session?.adminRole === 'ADMIN' ? 'Administrator' : 'User',
  };

  return (
    <Box sx={{ m: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="PROFILE" />
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mt: 4,
        }}
      >
        {/* Left Sidebar */}
        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', md: 280 },
            p: 3,
            borderRadius: 2,
            mb: { xs: 2, md: 0 }, // margin bottom on mobile, none on desktop
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ width: 90, height: 90, fontSize: 32 }} alt={user.name.charAt(0)}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" fontWeight="bold" mt={1}>
              {startCase(user.name)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Sidebar Menu */}
          <List>
            <ListItem
              onClick={() => console.log('Clicked!')}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: colors.grey[900],
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem
              onClick={() => console.log('Clicked!')}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: colors.grey[900],
                },
              }}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            <ListItem
              onClick={handleLogout}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: colors.grey[900],
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>

        {/* Right Content Area */}
        <Card
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Profile Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <PersonIcon />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Full Name
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {startCase(user.name)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <EmailIcon />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <WorkIcon />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Role
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <PhoneIcon />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Phone
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      N/A
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <HomeIcon />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      Address
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      N/A
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
