import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import NewUserButton from '../../components/pages/new-user-button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSession } from '../../hooks/use-session';
import useTheme from '@mui/material/styles/useTheme';
import { tokens } from '../../theme/main-theme';
import { useMemo, useState } from 'react';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GridColDef } from '@mui/x-data-grid/models';
import UserActionsMenu from '../../components/pages/user-actions-menu';
import DataTable from '../../components/pages/data-table';
import CustomSnackbar from '../../components/common/custom-snackbar';
import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';
import { useDeleteCategory } from '../../hooks/use-delete-category';
import { useCategoryData } from '../../hooks/use-category-data';
import { useSnackbar } from '../../hooks/use-snackbar';

function Category() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Use our custom hooks
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { data: rowData, loading, error, refetch, isValidType, capitalize } = useCategoryData(type);

  // Action menu state
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: HTMLElement | null;
    selectedId: string | null;
  }>({
    anchorEl: null,
    selectedId: null,
  });

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

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
      showSnackbar(`${capitalize(type)} deleted successfully!`);
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      showSnackbar(err.message || `Failed to delete ${type}`, 'error');
    },
  });

  // Define table columns with useMemo to prevent unnecessary re-renders
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
      anchorEl: event.currentTarget,
      selectedId: id,
    });
  };

  const handleActionClose = () => {
    setActionMenu({ ...actionMenu, anchorEl: null });
  };

  const handleDeleteClick = () => {
    handleActionClose();
    if (sessionAdmin?.adminRole !== 'ADMIN') {
      showSnackbar("You don't have permission to delete items.", 'error');
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

  // Handle loading and error states with improved messaging
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={`Error loading ${type} data: ${error.message}`} />;
  if (deleteError) return <ErrorAlert message={`Error deleting ${type}: ${deleteError.message}`} />;
  if (!isValidType) return <ErrorAlert message={`Invalid category type: ${type}`} />;
  if (!rowData.length) {
    return <InfoAlert message={`No ${type} data available`} />;
  }

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={type ?? ''} subtitle={isMobile ? '' : `Manage ${type}-specific content in a structured manner.`} />

        <NewUserButton to={`/category/${type}/create`} label={`+ New ${capitalize(type)}`} />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />

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
