import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import CustomSnackbar from '../../components/common/custom-snackbar';
import Container from '@mui/material/Container';
import { CircularProgress, useTheme } from '@mui/material';
import { SearchTokens } from '../../theme/main-theme';
import { lazy, Suspense, useEffect } from 'react';
import { useCreateExpenseTrackerMutation } from '../../graphql/graphql-generated';
import { useSnackbar } from '../../hooks/use-snackbar';

const LazyExpenseForm = lazy(() => import('./helper/expense-form'));

function CreateExpense() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [createExpenseTrackerMutation, { data, loading, error }] = useCreateExpenseTrackerMutation();

  // Handle API response
  useEffect(() => {
    if (error) {
      showSnackbar(error.message, 'error');
    }
  }, [error, showSnackbar]); // Runs only when `error` changes

  useEffect(() => {
    if (data?.createExpenseTracker?.success) {
      showSnackbar('Expense created successfully!', 'success');
    }
  }, [data]); // Runs only when `data` changes

  const handleSubmit = async (values: any) => {
    const { id, ...createInput } = values;
    await createExpenseTrackerMutation({ variables: { input: createInput } });
  };

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={'Create Expense'} Breadcrumbs_level1={'Expense'} Breadcrumbs_level1_url={'/expense'} />
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
          <LazyExpenseForm onSubmit={handleSubmit} loading={loading} />
        </Suspense>
      </Container>
    </Box>
  );
}

export default CreateExpense;
