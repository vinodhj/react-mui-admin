import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../hooks/use-session';
import { Box, Card, CardContent, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { tokens } from '../../theme/main-theme';
import { useDeleteCategory } from '../../hooks/use-delete-category';
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
import { useCategoryData } from '../../hooks/use-category-data';
import { useSnackbar } from '../../hooks/use-snackbar';
import { ValidCategoryType } from './category-config';

function CategoryDetails() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use our custom hooks
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { data: rowData, loading, error, isValidType, capitalize } = useCategoryData(type, id);

  // Delete category hook
  const {
    handleDeleteCategory,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCategory({
    type: type as ValidCategoryType,
    onCompleted: () => {
      setOpenDialog(false);
      navigate(`/category/${type}`, {
        state: {
          alertType: 'success',
          alertMessage: `${capitalize(type)} deleted successfully`,
        },
      });
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      showSnackbar(err.message || `Failed to delete ${type}`, 'error');
    },
  });

  // Handle delete confirmation
  const handleDelete = () => {
    if (id) {
      handleDeleteCategory(id);
    }
  };

  // Handle loading and error states with improved messaging
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={`Error loading ${type} details: ${error.message}`} />;
  if (deleteError) return <ErrorAlert message={`Error deleting ${type}: ${deleteError.message}`} />;
  if (!isValidType) return <ErrorAlert message={`Invalid category type: ${type}`} />;
  if (!id) return <ErrorAlert message="Missing ID parameter" />;

  if (!rowData.length) {
    return <InfoAlert message={`No data available for ${type} with ID: ${id}`} />;
  }

  const categoryData = rowData[0];

  if (!categoryData) {
    return <ErrorAlert message={`${capitalize(type)} not found with ID: ${id}`} />;
  }

  const { name, created_at, updated_at } = categoryData;

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
        <PageHeader title={`${capitalize(type)} Details`} Breadcrumbs_level1={type} Breadcrumbs_level1_url={`/category/${type}`} />

        <NewUserButton to={`/category/${type}/create`} label={`+ New ${capitalize(type)}`} />
      </Box>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
        {/* User Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="bold">
            {capitalize(type)} Basic Details
          </Typography>
          <Box>
            <Tooltip title="Delete" placement="bottom">
              <IconButton
                size="small"
                onClick={() => {
                  if (sessionAdmin?.adminRole !== 'ADMIN') {
                    showSnackbar("You don't have permission to delete items.", 'error');
                    return;
                  }
                  setOpenDialog(true);
                }}
              >
                <DeleteIcon sx={{ color: colors.redAccent[400], mr: 1 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="bottom">
              <IconButton size="small" component={RouterLink} to={`/category/${type}/edit/${id}`}>
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
                <InfoRow label={`${capitalize(type)} ID`} value={isMobile && id.length > 10 ? `${id.substring(0, 10)}...` : id} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Name" value={isMobile && name.length > 20 ? `${name.substring(0, 20)}...` : name} />
              </Grid>
              <Grid size={{ xs: 12 }} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <InfoRow label="Created At" value={isMobile ? formatDate(created_at, 'MMM dd, yyyy') : created_at} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InfoRow label="Updated At" value={isMobile ? formatDate(updated_at, 'MMM dd, yyyy') : updated_at} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CategoryDetails;
