import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import NewUserButton from '../../components/pages/new-user-button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSession } from '../../hooks/use-session';
import useTheme from '@mui/material/styles/useTheme';
import { tokens } from '../../theme/main-theme';
import { useEffect, useMemo, useState } from 'react';
import {
  useExpenseFynixesQuery,
  useExpenseModesQuery,
  useExpenseTagsQuery,
  Category as categoryMerge,
} from '../../graphql/graphql-generated';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';
import { formatDate } from '../../utils/date-utils';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GridColDef } from '@mui/x-data-grid/models';
import UserActionsMenu from '../../components/pages/user-actions-menu';
import DataTable from '../../components/pages/data-table';
import CustomSnackbar from '../../components/common/custom-snackbar';
import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';
import { useDeleteCategory } from '../../hooks/use-delete-category';

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

function Category() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Action menu state
  const [actionMenu, setActionMenu] = useState({
    anchorEl: null as HTMLElement | null,
    selectedId: null as string | null,
  });

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

  // Validate type and redirect if invalid
  useEffect(() => {
    if (!type || !ALLOWED_TYPES.includes(type)) {
      navigate('/category-not-found', { replace: true });
    }
  }, [type, navigate]);

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

  // Run the appropriate query based on the type
  const queryConfig = type ? TYPE_CONFIG[type as keyof typeof TYPE_CONFIG] : null;
  const { data, loading, error, refetch } = queryConfig
    ? queryConfig.useQuery({
        skip: !type || !ALLOWED_TYPES.includes(type),
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      })
    : { data: null, loading: false, error: new Error('Invalid type'), refetch: () => {} };

  // Delete category hook
  const {
    handleDeleteCategory,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCategory({
    type: type as 'tag' | 'mode' | 'fynix',
    onCompleted: () => {
      // Refetch data after deletion
      refetch();
      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: `${capitalize(type)} deleted successfully!`,
        severity: 'success',
      });
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

  // Define table columns
  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 50 },
      {
        field: 'registeredId',
        headerName: 'Registered Id',
        width: 200,
        renderCell: (params) => (
          <Link
            component={RouterLink}
            to={`/category/${type}/${params.value}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {params.value}
          </Link>
        ),
      },
      {
        field: 'name',
        headerName: 'Name',
        cellClassName: 'name-column--cell',
        width: 200,
      },
      { field: 'created_at', headerName: 'Created At', width: 200 },
      { field: 'updated_at', headerName: 'Updated At', width: 200 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
          <IconButton
            onClick={(event) => handleActionClick(event, params.row.registeredId)}
            aria-label="more"
            sx={{
              color: 'inherit',
              border: '1.5px solid ' + colors.greenAccent[400],
              width: 40,
              height: 40,
            }}
          >
            <MoreVertIcon style={{ cursor: 'pointer', color: 'inherit' }} />
          </IconButton>
        ),
      },
    ],
    [type, colors]
  );

  // Action menu handlers
  const handleActionClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setActionMenu({
      anchorEl: event.currentTarget as HTMLElement,
      selectedId: id,
    });
  };

  const handleActionClose = () => {
    setActionMenu({ ...actionMenu, anchorEl: null });
  };

  const handleDeleteClick = () => {
    handleActionClose();
    if (sessionAdmin?.adminRole !== 'ADMIN') {
      setSnackbar({
        open: true,
        message: "You don't have permission to delete items.",
        severity: 'error',
      });
      return;
    }
    setOpenDialog(true);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    if (actionMenu.selectedId) {
      handleDeleteCategory(actionMenu.selectedId);
    }
  };

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
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
        };
      })
      .filter(Boolean);
  };

  // Handle loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error.message} />;
  if (deleteError) return <ErrorAlert message={deleteError.message} />;
  if (!type || !ALLOWED_TYPES.includes(type)) return null;

  const rowData = processData();

  if (!rowData.length) {
    return <InfoAlert message="No data available" />;
  }

  // Helper function to capitalize strings
  const capitalize = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={type} subtitle={isMobile ? '' : `Manage  ${type}-specific content in a structured manner."`} />

        <NewUserButton to={`/category/${type}/create`} label={`+ New ${capitalize(type)}`} />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <DataTable rows={rowData} columns={columns} />

      <UserActionsMenu
        anchorEl={actionMenu.anchorEl}
        handleClose={handleActionClose}
        onView={() => {
          handleActionClose();
          navigate(`${actionMenu.selectedId}`);
        }}
        onEdit={() => {
          handleActionClose();
          navigate(`edit/${actionMenu.selectedId}`);
        }}
        onDelete={handleDeleteClick}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        openDialog={openDialog}
        handleDelete={handleDelete}
        handleCloseDialog={() => setOpenDialog(false)}
        deleteLoading={deleteLoading}
      />
    </Box>
  );
}

export default Category;
