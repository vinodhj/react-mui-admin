import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useCreateUserMutation } from '../../graphql/graphql-generated';
import PageHeader from '../../components/pages/page-header';
import { SearchTokens } from '../../theme/main-theme';
import CreateTeamForm from './create-team-form';
import { useEffect, useState } from 'react';
import CustomSnackbar from '../../components/common/custom-snackbar';

function CreateTeam() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const [createUserMutation, { data, loading, error }] = useCreateUserMutation();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  // Handle API response
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error]); // Runs only when `error` changes

  useEffect(() => {
    if (data?.signUp?.success) {
      setSnackbarMessage('Team member created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [data]); // Runs only when `data` changes

  return (
    <Box sx={{ m: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="CREATE TEAM" Breadcrumbs_level1="TEAM" Breadcrumbs_level1_url="/team" />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} />

      <Container
        maxWidth="sm"
        sx={{ backgroundColor: searchTokens.primary[200], p: 2, borderRadius: 2, border: `1px solid ${searchTokens.primary[400]}` }}
      >
        <CreateTeamForm createUserMutation={createUserMutation} loading={loading} />
      </Container>
    </Box>
  );
}

export default CreateTeam;
