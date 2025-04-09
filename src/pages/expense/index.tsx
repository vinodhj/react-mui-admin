import { useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { tokens } from '../../theme/main-theme';
import { useSnackbar } from '../../hooks/use-snackbar';
import { useMemo, useState } from 'react';
import { useUserPaginatedExpenseQuery } from '../../graphql/graphql-generated';
import { useSession } from '../../hooks/use-session';
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid/models';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import InfoAlert from '../../components/common/info-alert';
import { formatDate } from '../../utils/date-utils';
import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import NewUserButton from '../../components/pages/new-user-button';
import CustomSnackbar from '../../components/common/custom-snackbar';
import UserActionsMenu from '../../components/pages/user-actions-menu';
import ServerDataTable from '../../components/pages/server-data-table';
import DeleteConfirmationDialog from '../../components/pages/delete-confirmation-dialog';
import { useDeleteExpense } from '../../hooks/use-delete-expense';

function Expense() {
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Pagination state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  // Cursor state
  const [cursors, setCursors] = useState<{
    [page: number]: string | null;
  }>({
    0: null, // First page has no cursor
  });

  const variables = {
    session_id: sessionAdmin.adminID,
    input: {
      first: paginationModel.pageSize,
      after: cursors[paginationModel.page] ?? null,
    },
  };

  // custom hooks
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
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

  const { data, loading, error, refetch } = useUserPaginatedExpenseQuery({
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  // Delete expense hook
  const {
    handleDeleteExpense,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteExpense({
    user_id: sessionAdmin.adminID,
    onCompleted: () => {
      // Refetch data after deletion
      refetch();
      setOpenDialog(false);
      showSnackbar('Expense deleted successfully!');
    },
    onError: (err) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      showSnackbar(err.message ?? 'Failed to delete expense', 'error');
    },
  });

  // Define table columns with useMemo to prevent unnecessary re-renders
  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 50 },
      {
        field: 'registeredId',
        headerName: 'Registered Id',
        width: 100,
        renderCell: (params) => (
          <Link
            component={RouterLink}
            to={`/expense/${params.value}`}
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
        field: 'expense_period',
        headerName: 'Expense Period',
        cellClassName: 'expense-period-column--cell',
        width: 110,
      },
      {
        field: 'status',
        headerName: 'Status',
        cellClassName: 'status-column--cell',
        width: 100,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        cellClassName: 'amount-column--cell',
        width: 100,
      },
      {
        field: 'tag',
        headerName: 'Tag',
        cellClassName: 'tag-column--cell',
        width: 100,
      },
      {
        field: 'mode',
        headerName: 'Mode',
        cellClassName: 'mode-column--cell',
        width: 100,
      },
      {
        field: 'fynix',
        headerName: 'Fynix',
        cellClassName: 'fynix-column--cell',
        width: 100,
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
    [colors]
  );

  // Handle pagination changes
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    // If we're moving to a new page we haven't visited before
    // and we have a cursor from the current page, store it
    if (newModel.page > paginationModel.page && data?.paginatedExpenseTrackers.pageInfo.endCursor && !cursors[newModel.page]) {
      setCursors({
        ...cursors,
        [newModel.page]: data.paginatedExpenseTrackers.pageInfo.endCursor,
      });
    }

    setPaginationModel(newModel);
  };

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
      handleDeleteExpense(actionMenu.selectedId);
    }
  };

  // Handle loading and error states with improved messaging
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={`Error loading data: ${error.message}`} />;
  if (deleteError) return <ErrorAlert message={`Error deleting data: ${deleteError.message}`} />;
  if (!data?.paginatedExpenseTrackers.edges.length) {
    return <InfoAlert message="No data available" />;
  }

  // Map the fetched data into the format required by DataTable
  const rowData = data.paginatedExpenseTrackers.edges
    ?.map((row, index) => {
      if (!row) return null;
      return {
        id: index + 1,
        registeredId: row.node.id,
        expense_period: row.node.expense_period,
        amount: row.node.amount,
        status: row.node.status,
        tag: row.node.tag.name,
        mode: row.node.mode.name,
        fynix: row.node.fynix.name,
        created_at: formatDate(row.node.created_at),
        updated_at: formatDate(row.node.updated_at),
      };
    })
    .filter((row) => row !== null);

  // Pagination
  const pageInfo = data.paginatedExpenseTrackers.pageInfo;
  const totalCount = pageInfo.totalCount;

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader
          title="Expense"
          subtitle={isMobile ? '' : 'The expense page is a place where you can track and manage your expenses.'}
        />

        <NewUserButton to={`/expense/create`} label="+ New Expense" />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />

      <ServerDataTable
        rows={rowData}
        columns={columns}
        totalCount={totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        loading={loading}
      />

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

export default Expense;
