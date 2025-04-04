import { useLocation, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../hooks/use-session';
import { Box, Card, CardContent, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { tokens } from '../../theme/main-theme';
import { useDeleteCategory } from '../../hooks/use-delete-category';
import {
  useExpenseFynixesQuery,
  useExpenseModesQuery,
  useExpenseTagsQuery,
  Category as categoryMerge,
} from '../../graphql/graphql-generated';
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

const ALLOWED_TYPES = ['tag', 'mode', 'fynix'];

// Type mapping to help with type-specific operations
const TYPE_CONFIG = {
  tag: {
    useQuery: useExpenseTagsQuery,
    dataKey: 'expenseTags',
  },
  mode: {
    useQuery: useExpenseModesQuery,
    dataKey: 'expenseModes',
  },
  fynix: {
    useQuery: useExpenseFynixesQuery,
    dataKey: 'expenseFynixes',
  },
};

function CategoryDetails() {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Handle alert messages from navigation state
  useEffect(() => {
    const alertType = location.state?.alertType as string | undefined;
    const alertMessage = location.state?.alertMessage as string | undefined;

    if (alertMessage) {
      setSnackbar({
        open: true,
        message: alertMessage,
        severity: (alertType as 'success' | 'error' | 'info' | 'warning') || 'success',
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  // Handle delete confirmation
  const handleDelete = () => {
    if (id) {
      handleDeleteCategory(id);
    }
  };

  // Run the appropriate query based on the type
  const queryConfig = type ? TYPE_CONFIG[type as keyof typeof TYPE_CONFIG] : null;
  const { data, loading, error } = queryConfig
    ? queryConfig.useQuery({
        variables: { categoryFilter: { id } },
        skip: !type || !ALLOWED_TYPES.includes(type),
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
      })
    : { data: null, loading: false, error: new Error('Invalid type') };

  // Delete category hook
  const {
    handleDeleteCategory,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCategory({
    type: type as 'tag' | 'mode' | 'fynix',
    onCompleted: () => {
      setOpenDialog(false);
      navigate(`/category/${type}`, { state: { alertType: 'success', alertMessage: 'User deleted successfully' } });
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: err.message || `Failed to delete ${type}`,
        severity: 'error',
      });
    },
  });

  // Handle loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error.message} />;
  if (deleteError) return <ErrorAlert message={deleteError.message} />;
  if (!type || !ALLOWED_TYPES.includes(type)) return null;

  // Process data for table
  const processData = () => {
    if (!data || !type || !queryConfig) return [];

    const items = data[queryConfig.dataKey as keyof typeof data] ?? [];

    if (!Array.isArray(items)) return [];

    return items
      .map((item: categoryMerge | null, index: number) => {
        if (!item) return null;
        return {
          id: index + 1,
          registeredId: item.id,
          name: item.name,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
      })
      .filter(Boolean);
  };

  const rowData = processData();

  if (!rowData.length) {
    return <InfoAlert message="No data available" />;
  }

  if (!id) {
    return <ErrorAlert message="Invalid Registered ID" />;
  }

  const categoryData = rowData[0];

  if (!categoryData) {
    return <ErrorAlert message="categoryData not found" />;
  }

  console.log('categoryData', categoryData);
  const { name, created_at, updated_at } = categoryData;

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      {/* Snackbar Alert */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
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
                    setSnackbar({
                      open: true,
                      message: "You don't have permission to delete items.",
                      severity: 'error',
                    });
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

export default CategoryDetails;
