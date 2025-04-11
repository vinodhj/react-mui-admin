import { Chip, CircularProgress, Fade, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { tokens } from '../../theme/main-theme';
import { useSnackbar } from '../../hooks/use-snackbar';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
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
import ExpenseFilter, { ExpenseFilterValues } from '../../components/pages/expense-filter';
import { useDebounce } from '../../hooks/use-debounce';
import { useTypedLocalStorage } from '../../hooks/use-typed-local-storage.ts';

// Define state reducer for pagination and filter state management
type StateAction =
  | { type: 'SET_PAGINATION_MODEL'; payload: GridPaginationModel }
  | { type: 'SET_CURSORS'; payload: { page: number; cursor: string | null } }
  | { type: 'SET_FILTERS'; payload: ExpenseFilterValues }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_TOTAL_ITEMS'; payload: number }
  | { type: 'RESET_CURSORS' }
  | { type: 'SET_FILTERS_PENDING'; payload: boolean };

interface State {
  paginationModel: GridPaginationModel;
  cursors: { [page: number]: string | null };
  filters: ExpenseFilterValues;
  totalItems: number;
  filtersPending: boolean;
}

const initialState: State = {
  paginationModel: { page: 0, pageSize: 10 },
  cursors: { 0: null },
  filters: {},
  totalItems: 0,
  filtersPending: false,
};

function stateReducer(state: State, action: StateAction): State {
  switch (action.type) {
    case 'SET_PAGINATION_MODEL':
      return { ...state, paginationModel: action.payload };
    case 'SET_CURSORS':
      return {
        ...state,
        cursors: { ...state.cursors, [action.payload.page]: action.payload.cursor },
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
        paginationModel: { ...state.paginationModel, page: 0 },
        cursors: { 0: null },
        filtersPending: true,
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {},
        paginationModel: { ...state.paginationModel, page: 0 },
        cursors: { 0: null },
        filtersPending: true,
      };
    case 'SET_TOTAL_ITEMS':
      return { ...state, totalItems: action.payload };
    case 'SET_FILTERS_PENDING':
      return { ...state, filtersPending: action.payload };
    default:
      return state;
  }
}

// Custom hook for different debounce times based on filter type
function useSmartDebounce(filters: ExpenseFilterValues) {
  // Use a shorter delay for dropdown selections
  const discreteFilters = useMemo(
    () => ({
      expense_period: filters.expense_period,
      status: filters.status,
    }),
    [filters.expense_period, filters.status]
  );

  // Use a longer delay for numeric inputs that users might type continuously
  const rangeFilters = useMemo(
    () => ({
      min_amount: filters.min_amount,
      max_amount: filters.max_amount,
    }),
    [filters.min_amount, filters.max_amount]
  );

  // Debounce with different delays
  const debouncedDiscreteFilters = useDebounce(discreteFilters, 200);
  const debouncedRangeFilters = useDebounce(rangeFilters, 600);

  // Combine debounced filters
  return useMemo(
    () => ({
      ...debouncedDiscreteFilters,
      ...debouncedRangeFilters,
    }),
    [debouncedDiscreteFilters, debouncedRangeFilters]
  );
}

// Separate reusable components
const ActiveFilterChips = ({
  filters,
  onDeleteFilter,
  isPending,
}: {
  filters: ExpenseFilterValues;
  onDeleteFilter: (key: keyof ExpenseFilterValues) => void;
  isPending: boolean;
}) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
      {filters.expense_period && (
        <Chip
          label={`Period: ${filters.expense_period}`}
          size="small"
          onDelete={() => onDeleteFilter('expense_period')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.min_amount && (
        <Chip
          label={`Min: $${filters.min_amount}`}
          size="small"
          onDelete={() => onDeleteFilter('min_amount')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.max_amount && (
        <Chip
          label={`Max: $${filters.max_amount}`}
          size="small"
          onDelete={() => onDeleteFilter('max_amount')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.status && filters.status.length > 0 && (
        <Chip
          label={`Status: ${filters.status.join(', ')}`}
          size="small"
          onDelete={() => onDeleteFilter('status')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {isPending && (
        <Fade in={isPending}>
          <CircularProgress size={20} thickness={5} sx={{ ml: 1 }} />
        </Fade>
      )}
    </Stack>
  );
};

function Expense() {
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Load saved filters from local storage
  const [savedFilters, setSavedFilters] = useTypedLocalStorage<ExpenseFilterValues>('expenseFilters', {});

  // Use reducer for pagination and filter state management
  const [state, dispatch] = useReducer(stateReducer, {
    ...initialState,
    filters: savedFilters,
  });

  const { paginationModel, cursors, filters, totalItems, filtersPending } = state;

  // Apply smart debounce to filters based on their type
  const debouncedFilters = useSmartDebounce(filters);

  // Keep action menu and dialog as separate state hooks
  const [actionMenu, setActionMenu] = useState<{
    anchorEl: HTMLElement | null;
    selectedId: string | null;
  }>({
    anchorEl: null,
    selectedId: null,
  });

  const [openDialog, setOpenDialog] = useState(false);

  // Memoize query variables to prevent unnecessary re-fetches
  const variables = useMemo(
    () => ({
      session_id: sessionAdmin.adminID,
      input: {
        first: paginationModel.pageSize,
        after: cursors[paginationModel.page] ?? null,
        expense_period: debouncedFilters.expense_period ?? undefined,
        min_amount: debouncedFilters.min_amount ?? undefined,
        max_amount: debouncedFilters.max_amount ?? undefined,
        statuses: debouncedFilters.status ?? undefined,
      },
    }),
    [sessionAdmin.adminID, paginationModel.pageSize, cursors, paginationModel.page, debouncedFilters]
  );

  const { data, loading, error, refetch } = useUserPaginatedExpenseQuery({
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  // Update filters pending state when debounced filters change
  useEffect(() => {
    // If the debounced filters have caught up with the current filters
    const isEqual =
      debouncedFilters.expense_period === filters.expense_period &&
      debouncedFilters.min_amount === filters.min_amount &&
      debouncedFilters.max_amount === filters.max_amount &&
      JSON.stringify(debouncedFilters.status) === JSON.stringify(filters.status);

    if (isEqual && filtersPending) {
      dispatch({ type: 'SET_FILTERS_PENDING', payload: false });
    }
  }, [debouncedFilters, filters, filtersPending]);

  // Save filters to local storage when they change
  useEffect(() => {
    setSavedFilters(filters);
  }, [filters, setSavedFilters]);

  // Optimize delete expense hook with callbacks
  const handleDeleteSuccess = useCallback(() => {
    refetch();
    setOpenDialog(false);
    showSnackbar('Expense deleted successfully!');
  }, [refetch, showSnackbar]);

  const handleDeleteError = useCallback(
    (err: Error) => {
      console.error('Delete failed:', err);
      setOpenDialog(false);
      showSnackbar(err.message ?? 'Failed to delete expense', 'error');
    },
    [showSnackbar]
  );

  const {
    handleDeleteExpense,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteExpense({
    user_id: sessionAdmin.adminID,
    onCompleted: handleDeleteSuccess,
    onError: handleDeleteError,
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

  // Modified handleApplyFilter to conditionally apply debounce
  const handleApplyFilter = useCallback((newFilters: ExpenseFilterValues, skipDebounce = false) => {
    // For select/dropdown changes, we can apply immediately without debounce
    if (skipDebounce) {
      dispatch({ type: 'SET_FILTERS', payload: newFilters });
      // Also update the debounced value immediately
      return;
    }

    // For text input changes, use the normal debounce behavior
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  }, []);

  const handlePaginationModelChange = useCallback(
    (newModel: GridPaginationModel) => {
      if (newModel.page > paginationModel.page && data?.paginatedExpenseTrackers.pageInfo.endCursor && !cursors[newModel.page]) {
        dispatch({
          type: 'SET_CURSORS',
          payload: { page: newModel.page, cursor: data.paginatedExpenseTrackers.pageInfo.endCursor },
        });
      }
      dispatch({ type: 'SET_PAGINATION_MODEL', payload: newModel });
    },
    [paginationModel.page, data, cursors]
  );

  const handleActionClick = useCallback((event: React.MouseEvent<HTMLElement>, id: string) => {
    setActionMenu({
      anchorEl: event.currentTarget,
      selectedId: id,
    });
  }, []);

  const handleActionClose = useCallback(() => {
    setActionMenu((prev) => ({
      ...prev,
      anchorEl: null,
    }));
  }, []);

  const handleDeleteClick = useCallback(() => {
    handleActionClose();
    if (sessionAdmin?.adminRole !== 'ADMIN') {
      showSnackbar("You don't have permission to delete items.", 'error');
      return;
    }
    setOpenDialog(true);
  }, [handleActionClose, sessionAdmin, showSnackbar]);

  const handleDelete = useCallback(() => {
    if (actionMenu.selectedId) {
      handleDeleteExpense(actionMenu.selectedId);
    }
  }, [actionMenu.selectedId, handleDeleteExpense]);

  const handleDeleteFilter = useCallback(
    (key: keyof ExpenseFilterValues) => {
      const newFilters = { ...filters };
      delete newFilters[key];
      handleApplyFilter(newFilters);
    },
    [filters, handleApplyFilter]
  );

  const handleResetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  // Memoize the has active filters check
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((value) => value !== null && (Array.isArray(value) ? value.length > 0 : true)),
    [filters]
  );

  // Update total items whenever the data changes
  useEffect(() => {
    if (data?.paginatedExpenseTrackers.pageInfo.totalCount !== undefined) {
      // If we get empty results and we're not on the first page, reset to first page
      if (data.paginatedExpenseTrackers.edges?.length === 0 && paginationModel.page > 0) {
        dispatch({ type: 'RESET_CURSORS' });
        dispatch({
          type: 'SET_PAGINATION_MODEL',
          payload: { ...paginationModel, page: 0 },
        });
      }

      // If there are no results at all, make sure we don't have any cursors
      if (data.paginatedExpenseTrackers.pageInfo.totalCount === 0) {
        dispatch({ type: 'RESET_CURSORS' });
      }

      if (data?.paginatedExpenseTrackers.pageInfo.totalCount && paginationModel.page === 0) {
        console.log('total count', data.paginatedExpenseTrackers.pageInfo.totalCount);
        // Only update total count on the first page to keep it consistent
        dispatch({
          type: 'SET_TOTAL_ITEMS',
          payload: data.paginatedExpenseTrackers.pageInfo.totalCount,
        });
      }
    }
  }, [data, paginationModel.page]);

  // Memoize the row data to prevent re-renders
  const rowData = useMemo(
    () =>
      data?.paginatedExpenseTrackers.edges
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
        .filter((row) => row !== null) || [],
    [data]
  );

  // Memoize the filter component with pending indicator
  const filterComponent = useMemo(
    () => (
      <Box sx={{ width: '100%' }}>
        <ExpenseFilter
          currentFilters={filters}
          onApplyFilter={(newFilters) => {
            // Check if this is a dropdown change vs text input
            const isDropdownChange = 'expense_period' in newFilters || 'status' in newFilters;
            handleApplyFilter(newFilters, isDropdownChange);
          }}
          onResetFilters={handleResetFilters}
        />
        {hasActiveFilters && !isMobile && (
          <ActiveFilterChips filters={filters} onDeleteFilter={handleDeleteFilter} isPending={filtersPending} />
        )}
      </Box>
    ),
    [filters, hasActiveFilters, isMobile, handleApplyFilter, handleResetFilters, handleDeleteFilter, filtersPending]
  );

  // Handle loading and error states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={`Error loading data: ${error.message}`} />;
  if (deleteError) return <ErrorAlert message={`Error deleting data: ${deleteError.message}`} />;
  if (!data?.paginatedExpenseTrackers.edges) {
    return <InfoAlert message="No data available" />;
  }

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

      {loading && !data ? (
        <LoadingSpinner />
      ) : (
        <ServerDataTable
          rows={rowData}
          columns={columns}
          totalCount={totalItems}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          loading={false} // We're handling loading state separately now
          filterComponent={filterComponent}
        />
      )}

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
