import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { SessionContext } from '../../contexts/session-context';
import { useContext } from 'react';
import startCase from 'lodash/startCase';
import PageHeader from '../../components/pages/page-header';
import ProfileSidebar from '../../components/profile-sidebar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const sessionDetails = useContext(SessionContext);
  const { session } = sessionDetails ?? {};
  const navigate = useNavigate();

  // Callbacks for sidebar actions
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

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
        <ProfileSidebar user={user} onEditProfileClick={handleEditProfile} onChangePasswordClick={handleChangePassword} />

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
