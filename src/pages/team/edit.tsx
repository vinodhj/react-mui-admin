import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PageHeader from '../../components/pages/page-header';
import { SearchTokens } from '../../theme/main-theme';
import { ColumnName, useEditUserMutation, useUserByFieldQuery } from '../../graphql/graphql-generated';
import EditTeamForm from './form/edit-team-form';
import CustomSnackbar from '../../components/common/custom-snackbar';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import { SessionContext } from '../../contexts/session-context';

function EditTeam() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const { id } = useParams<{ id: string }>();
  const sessionDetails = useContext(SessionContext);

  const { data, loading, error } = useUserByFieldQuery({
    variables: {
      field: ColumnName.Id,
      value: id ?? '',
    },
  });

  const [updateUserMutation, { data: updateData, loading: updateLoading, error: updateError }] = useEditUserMutation();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  useEffect(() => {
    if (error || updateError) {
      setSnackbarMessage(error?.message || updateError?.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error, updateError]);

  useEffect(() => {
    if (updateData?.editUser?.success) {
      const { user } = updateData.editUser;
      const { session, updateSession } = sessionDetails ?? {};

      setSnackbarMessage('Team member updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // update session if data
      if (session && updateSession && session.adminID === user?.id && user?.name) {
        updateSession({
          ...session,
          adminName: user.name ?? '',
          // need to update once super role or some other setting to update email and role
          // adminEmail: user.email ?? '',
          // adminRole: user.role ?? ''
        });
      }
    }
  }, [updateData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const user = data?.userByfield?.[0];

  if (!user) {
    return <ErrorAlert message="User not found" />;
  }

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="EDIT TEAM" Breadcrumbs_level1="TEAM" Breadcrumbs_level1_url="/team" />
      </Box>

      <CustomSnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} />

      <Container
        maxWidth="sm"
        sx={{ backgroundColor: searchTokens.primary[200], p: 2, borderRadius: 2, border: `1px solid ${searchTokens.primary[400]}` }}
      >
        <EditTeamForm user={user} updateUserMutation={updateUserMutation} loading={updateLoading} />
      </Container>

      {/* Note about admin role update */}
      <Typography variant="body2" color="textSecondary" mt={2} textAlign="center">
        Note: To update role and email, please contact the admin.
      </Typography>
    </Box>
  );
}

export default EditTeam;
