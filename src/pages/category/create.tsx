import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import CustomSnackbar from '../../components/common/custom-snackbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { SearchTokens } from '../../theme/main-theme';
import { useEffect } from 'react';
import { useCreateCategoryMutation } from '../../graphql/graphql-generated';
import { Navigate, useParams } from 'react-router-dom';
import { categoryTypeMap } from '../../hooks/use-delete-category';
import { useSnackbar } from '../../hooks/use-snackbar';
import CategoryForm from './form/category-form';
import { isValidCategoryType } from './category-config';

function CreateCategory() {
  const { type } = useParams<{ type: string }>();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation();

  // Validate the type parameter - moved after all hooks
  const isValidType = isValidCategoryType(type);

  // Handle API response
  useEffect(() => {
    if (error) {
      showSnackbar(error.message, 'error');
    }
  }, [error, showSnackbar]); // Runs only when `error` changes

  useEffect(() => {
    if (data?.createCategory?.success) {
      showSnackbar(`${type} created successfully!`, 'success');
    }
  }, [data]); // Runs only when `data` changes

  // If type is invalid, redirect to error page
  if (!isValidType) {
    return <Navigate to="/error" replace state={{ message: `Invalid category type: ${type}` }} />;
  }

  const handleSubmit = async (values: any) => {
    await createCategoryMutation({ variables: { input: values } });
  };

  const category_type = categoryTypeMap[type];

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={`Create ${type}`} Breadcrumbs_level1={type} Breadcrumbs_level1_url={`/category/${type}`} />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />

      <Container
        maxWidth="sm"
        sx={{ backgroundColor: searchTokens.primary[200], p: 2, borderRadius: 2, border: `1px solid ${searchTokens.primary[400]}` }}
      >
        <CategoryForm onSubmit={handleSubmit} loading={loading} category_type={category_type} type={type} />
      </Container>
    </Box>
  );
}

export default CreateCategory;
