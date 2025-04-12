import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../hooks/use-session';
import { Box, Card, CardContent, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { tokens } from '../../theme/main-theme';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import { formatDate } from '../../utils/date-utils';
import InfoAlert from '../../components/common/info-alert';
import CustomSnackbar from '../../components/common/custom-snackbar';
import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';
import PageHeader from '../../components/pages/page-header';
import NewUserButton from '../../components/pages/new-user-button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid2';
import InfoRow from '../../components/pages/info-row';
import { useSnackbar } from '../../hooks/use-snackbar';
import { useDeleteExpense } from '../../hooks/use-delete-expense';
import { useDetailsExpenseTrackerByIdQuery } from '../../graphql/graphql-generated';

function ExpenseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use our custom hooks
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // fetch the expense data
  const {
    data: rowData,
    loading,
    error,
  } = useDetailsExpenseTrackerByIdQuery({
    variables: {
      id: id ?? '',
      session_id: sessionAdmin.adminID,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  // Optimize delete expense hook with callbacks
  const handleDeleteSuccess = useCallback(() => {
    setOpenDialog(false);
    // showSnackbar('Expense deleted successfully!');
    navigate('/expense', {
      state: {
        alertType: 'success',
        alertMessage: 'Expense deleted successfully',
      },
    });
  }, [showSnackbar]);

  const handleDeleteError = useCallback(
    (err: Error) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      showSnackbar(err.message ?? 'Failed to delete expense', 'error');
    },
    [showSnackbar]
  );

  // Delete category hook
  const {
    handleDeleteExpense,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteExpense({
    user_id: sessionAdmin.adminID,
    onCompleted: handleDeleteSuccess,
    onError: handleDeleteError,
  });

  // Handle delete confirmation
  const handleDelete = () => {
    if (id) {
      handleDeleteExpense(id);
    }
  };

  // Handle loading and error states with improved messaging
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={`Error loading expense details: ${error.message}`} />;
  if (deleteError) return <ErrorAlert message={`Error deleting expense: ${deleteError.message}`} />;
  if (!id) return <ErrorAlert message="Missing ID parameter" />;

  if (!rowData?.expenseTrackerById) {
    return <InfoAlert message={`No data available for expense with ID: ${id}`} />;
  }

  const expenseData = rowData.expenseTrackerById;

  if (!expenseData) {
    return <ErrorAlert message={`Expense not found with ID: ${id}`} />;
  }
  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        openDialog={openDialog}
        handleDelete={handleDelete}
        handleCloseDialog={() => setOpenDialog(false)}
        deleteLoading={deleteLoading}
      />

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={'Expense Details'} Breadcrumbs_level1={'Expense'} Breadcrumbs_level1_url={'/expense'} />

        <NewUserButton to={'/expense/create'} label={`+ New Expense`} />
      </Box>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
        {/* User Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="bold">
            Expense Basic Details
          </Typography>
          <Box>
            <Tooltip title="Delete" placement="bottom">
              <IconButton
                size="small"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <DeleteIcon sx={{ color: colors.redAccent[400], mr: 1 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="bottom">
              <IconButton size="small" component={RouterLink} to={`/expense/edit/${id}`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Details Card */}
        <Card variant="outlined">
          <CardContent>
            {/* User Info */}
            <Grid container spacing={2} mt={1}>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label={'Expense ID'} value={isMobile && id.length > 10 ? `${id.substring(0, 10)}...` : id} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Expense Period" value={expenseData.expense_period} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Expense Amount" value={expenseData.amount.toString()} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Tag" value={expenseData.tag.name} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Mode" value={expenseData.mode.name} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Fynix" value={expenseData.fynix.name} />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Expense Description" value={expenseData.description ? expenseData.description : '-'} />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Item details" value={expenseData.item_details ? expenseData.item_details : '-'} />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow
                  label="Created At"
                  value={isMobile ? formatDate(expenseData.created_at, 'MMM dd, yyyy') : formatDate(expenseData.created_at)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InfoRow
                  label="Updated At"
                  value={isMobile ? formatDate(expenseData.updated_at, 'MMM dd, yyyy') : formatDate(expenseData.updated_at)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ExpenseDetails;
