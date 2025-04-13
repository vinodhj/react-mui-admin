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
import { useSnackbar } from '../../hooks/use-snackbar';
import { useDeleteExpense } from '../../hooks/use-delete-expense';
import { useDetailsExpenseTrackerByIdQuery } from '../../graphql/graphql-generated';
import { capitalize } from '../category/category-config';

interface InfoFieldProps {
  label: string;
  value: string;
  colors: any;
}

const InfoField = ({ label, value, colors }: InfoFieldProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color={colors.grey[400]} gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: colors.grey[50], fontWeight: 'medium' }}>
      {value || '-'}
    </Typography>
  </Box>
);

interface SectionTitleProps {
  title: string;
  colors: any;
}

const SectionTitle = ({ title, colors }: SectionTitleProps) => (
  <Box sx={{ mt: 3, mb: 2 }}>
    <Typography
      variant="h5"
      fontWeight="medium"
      color={colors.greenAccent[400]}
      sx={{
        pb: 1,
        borderBottom: `1px solid ${colors.greenAccent[700]}`,
      }}
    >
      {title}
    </Typography>
  </Box>
);

function ExpenseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const isDarkMode = mode === 'dark';
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
    navigate('/expense', {
      state: {
        alertType: 'success',
        alertMessage: 'Expense deleted successfully',
      },
    });
  }, [navigate]);

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

      <Box sx={{ maxWidth: '75%', mx: 'auto', mt: 4 }}>
        {/* Header with actions */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {capitalize(expenseData.fynix.name)} - {capitalize(expenseData.tag.name)} - {capitalize(expenseData.mode.name)}
          </Typography>
          <Box>
            <Tooltip title="Delete" placement="top">
              <IconButton
                onClick={() => setOpenDialog(true)}
                sx={{
                  color: colors.redAccent[400],
                  '&:hover': {
                    color: colors.redAccent[300],
                    backgroundColor: colors.redAccent[900],
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="top">
              <IconButton
                component={RouterLink}
                to={`/expense/edit/${id}`}
                sx={{
                  color: colors.greenAccent[400],
                  '&:hover': {
                    color: colors.greenAccent[300],
                    backgroundColor: colors.greenAccent[900],
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content in grid layout similar to form */}
        <Card
          variant="outlined"
          sx={{
            backgroundColor: isDarkMode ? colors.primary[400] : 'inherit',
            // boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            boxShadow: `2px 2px 8px ${colors.primary[400]}`,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Basic Information Section */}
            <SectionTitle title="Basic Information" colors={colors} />
            <Grid container spacing={2}>
              {id && (
                <Grid size={{ xs: 12, md: 4 }}>
                  <InfoField label="Expense ID" value={isMobile && id.length > 10 ? `${id.substring(0, 10)}...` : id} colors={colors} />
                </Grid>
              )}
              <Grid size={{ xs: 12, md: 4 }}>
                <InfoField label="Expense Period" value={expenseData.expense_period} colors={colors} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <InfoField label="Amount" value={expenseData.amount.toString()} colors={colors} />
              </Grid>
            </Grid>

            {/* Category Information Section */}
            <SectionTitle title="Category Information" colors={colors} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}>
                <InfoField label="Tag" value={expenseData.tag.name} colors={colors} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <InfoField label="Payment Mode" value={expenseData.mode.name} colors={colors} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <InfoField label="Fynix" value={expenseData.fynix.name} colors={colors} />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <InfoField label="Status" value={expenseData.status || '-'} colors={colors} />
              </Grid>
            </Grid>

            {/* Description Section */}
            <SectionTitle title="Expense Details" colors={colors} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoField label="Description" value={expenseData.description ?? '-'} colors={colors} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoField label="Item Details" value={expenseData.item_details ?? '-'} colors={colors} />
              </Grid>
            </Grid>

            {/* Metadata Section */}
            <SectionTitle title="Record Information" colors={colors} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoField
                  label="Created At"
                  value={isMobile ? formatDate(expenseData.created_at, 'MMM dd, yyyy') : formatDate(expenseData.created_at)}
                  colors={colors}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoField
                  label="Updated At"
                  value={isMobile ? formatDate(expenseData.updated_at, 'MMM dd, yyyy') : formatDate(expenseData.updated_at)}
                  colors={colors}
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
