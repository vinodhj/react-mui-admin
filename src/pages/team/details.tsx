import { useParams, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ColumnName, useUserByFieldQuery } from '../../graphql/graphql-generated';
import ErrorAlert from '../../components/common/error-alert';
import LoadingSpinner from '../../components/common/loading-spinner';
import { formatDate } from '../../utils/date-utils';
import { tokens } from '../../theme/main-theme';

import { useMediaQuery, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import PageHeader from '../../components/pages/page-header';
import NewUserButton from '../../components/pages/new-user-button';
import startCase from 'lodash/startCase';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';
import { useDeleteUser } from '../../hooks/use-delete-user';
import InfoRow from '../../components/pages/info-row';
import CustomSnackbar from '../../components/common/custom-snackbar';
import { useSession } from '../../hooks/use-session';

function TeamDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const { id } = useParams();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [openDialog, setOpenDialog] = useState(false);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const alertType = location.state?.alertType as string | undefined;
  const alertMessage = location.state?.alertMessage as string | undefined;

  // Show Snackbar if there's an alertMessage
  useEffect(() => {
    if (alertMessage) {
      setSnackbarMessage(alertMessage);
      setSnackbarSeverity((alertType as 'success' | 'error' | 'info' | 'warning') || 'success');
      setOpenSnackbar(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [alertMessage, alertType, navigate, location.pathname]);

  const {
    handleDeleteUser,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteUser({
    onCompleted: () => {
      setOpenDialog(false);
      navigate('/team', { state: { alertType: 'error', alertMessage: 'User deleted successfully' } });
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      setSnackbarMessage(err.message || 'Failed to delete user');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  // Use media query to determine mobile view
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDelete = () => {
    if (id) {
      handleDeleteUser(id);
    }
  };

  const { data, loading, error } = useUserByFieldQuery({
    variables: {
      field: ColumnName.Id,
      value: id ?? '',
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  if (!id) {
    return <ErrorAlert message="Invalid Registered ID" />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  if (deleteError) {
    return <ErrorAlert message={deleteError.message} />;
  }

  const user = data?.userByfield?.[0];

  if (!user) {
    return <ErrorAlert message="User not found" />;
  }

  const { name, email, phone, role, created_at, updated_at } = user;

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      {/* Snackbar Alert */}
      <CustomSnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} />

      <DeleteConfirmationDialog
        openDialog={openDialog}
        handleDelete={handleDelete}
        handleCloseDialog={() => setOpenDialog(false)}
        deleteLoading={deleteLoading}
      />

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="TEAM DETAILS" Breadcrumbs_level1="TEAM" Breadcrumbs_level1_url="/team" />

        <NewUserButton to="/team/create" label="+ New User" />
      </Box>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
        {/* User Header */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 56, height: 56 }} alt={user.name.toUpperCase()} src="/path-to-avatar.jpg" />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {startCase(name)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
          </Box>
          <Chip label="Active" color="success" sx={{ ml: 'auto', fontWeight: 'bold' }} />
        </Box>

        {/* Details Card */}
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="bold">
                Team Basic Details
              </Typography>
              <Box>
                <Tooltip title="Delete" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (sessionAdmin.adminRole !== 'ADMIN') {
                        setSnackbarMessage("You don't have permission to delete users.");
                        setSnackbarSeverity('error');
                        setOpenSnackbar(true);
                        return;
                      }
                      setOpenDialog(true);
                    }}
                  >
                    <DeleteIcon sx={{ color: colors.redAccent[400], mr: 1 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="bottom">
                  <IconButton size="small" component={RouterLink} to={`/team/edit/${id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* User Info */}
            <Grid container spacing={2} mt={1}>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Customer ID" value={isMobile && id.length > 10 ? `${id.substring(0, 10)}...` : id} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Name" value={isMobile && name.length > 20 ? `${name.substring(0, 20)}...` : name} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Email" value={email} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Phone" value={phone} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Role" value={role} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Created At" value={isMobile ? formatDate(created_at, 'MMM dd, yyyy') : formatDate(created_at)} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InfoRow label="Updated At" value={isMobile ? formatDate(updated_at, 'MMM dd, yyyy') : formatDate(updated_at)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default TeamDetails;
