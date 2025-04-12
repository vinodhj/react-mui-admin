import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import CustomSnackbar from '../../components/common/custom-snackbar';
import Container from '@mui/material/Container';
import { CircularProgress, useTheme } from '@mui/material';
import { SearchTokens } from '../../theme/main-theme';
import { lazy, Suspense, useEffect } from 'react';
import { useEditExpenseTrackerByIdQuery, useUpdateExpenseTrackerMutation } from '../../graphql/graphql-generated';
import { useSnackbar } from '../../hooks/use-snackbar';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/common/loading-spinner';
import { useSession } from '../../hooks/use-session';

const LazyExpenseForm = lazy(() => import('./helper/expense-form'));

function UpdateExpense() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sessionAdmin } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);

  // fetch the expense data
  const { data, loading, error } = useEditExpenseTrackerByIdQuery({
    variables: {
      id: id ?? '',
      session_id: sessionAdmin.adminID,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const [updateExpenseTrackerMutation, { data: updateData, loading: updateLoading, error: updateError }] =
    useUpdateExpenseTrackerMutation();

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Handle API response
  useEffect(() => {
    if (error?.message) {
      showSnackbar(error.message, 'error');
    } else if (updateError?.message) {
      showSnackbar(updateError.message, 'error');
    }
  }, [error, updateError, showSnackbar]); // Runs only when `error` changes

  useEffect(() => {
    if (updateData?.updateExpenseTracker?.success) {
      showSnackbar('Expense updated successfully!', 'success');
      const timer = setTimeout(() => {
        navigate(`/expense/${id}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [updateData]);

  // Redirect to error page
  if (!id) {
    return <Navigate to="/error" replace state={{ message: 'Expense ID not found' }} />;
  }

  if (loading || updateLoading) {
    return <LoadingSpinner />;
  }

  if (!data?.expenseTrackerById) {
    if (error) {
      return <Navigate to="/error" replace state={{ message: error.message }} />;
    }
    return <Navigate to="/expense" />;
  }

  const initialValues = {
    ...data.expenseTrackerById,
    description: data.expenseTrackerById.description ?? ``,
    item_details: data.expenseTrackerById.item_details ?? ``,
    tag_id: data.expenseTrackerById.tag_id || '',
    mode_id: data.expenseTrackerById.mode_id || '',
    fynix_id: data.expenseTrackerById.fynix_id || '',
  };

  const handleSubmit = async (values: any) => {
    const { __typename, ...updateValues } = values;
    await updateExpenseTrackerMutation({
      variables: {
        input: {
          ...updateValues,
          id: id,
        },
      },
    });
  };

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader
          title={'Update Expense'}
          Breadcrumbs_level1={'Expense'}
          Breadcrumbs_level1_url={'/expense'}
          Breadcrumbs_level2={'Details'}
          Breadcrumbs_level2_url={`/expense/${id}`}
        />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />

      <Container
        maxWidth="md"
        sx={{ backgroundColor: searchTokens.primary[200], p: 2, borderRadius: 2, border: `1px solid ${searchTokens.primary[400]}` }}
      >
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          }
        >
          <LazyExpenseForm onSubmit={handleSubmit} loading={updateLoading} initialValues={initialValues} />
        </Suspense>
      </Container>
    </Box>
  );
}

export default UpdateExpense;
