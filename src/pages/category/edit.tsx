// src/pages/category/edit.tsx
import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import CustomSnackbar from '../../components/common/custom-snackbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { SearchTokens } from '../../theme/main-theme';
import { useEffect } from 'react';
import { useUpdateCategoryMutation } from '../../graphql/graphql-generated';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { categoryTypeMap, isValidCategoryType, capitalize } from './category-config';
import { useSnackbar } from '../../hooks/use-snackbar';
import { useCategoryData } from '../../hooks/use-category-data';
import LoadingSpinner from '../../components/common/loading-spinner';
import ErrorAlert from '../../components/common/error-alert';
import CategoryForm from './form/category-form.tsx';

function EditCategory() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  // Get the category data
  const { data: categoryData, loading: dataLoading, error: dataError } = useCategoryData(type, id);

  const [updateCategoryMutation, { data, loading: updateLoading, error: updateError }] = useUpdateCategoryMutation();

  // Validate the type parameter
  const isValidType = isValidCategoryType(type);

  // Handle API response
  useEffect(() => {
    if (updateError) {
      showSnackbar(updateError.message, 'error');
    }
  }, [updateError, showSnackbar]);

  useEffect(() => {
    if (data?.updateCategory?.success) {
      showSnackbar(`${capitalize(type ?? '')} updated successfully!`, 'success');
      // Navigate back to the category details after a short delay
      const timer = setTimeout(() => {
        navigate(`/category/${type}/${id}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, type, id, navigate, showSnackbar]);

  // If type is invalid, redirect to error page
  if (!isValidType) {
    return <Navigate to="/error" replace state={{ message: `Invalid category type: ${type}` }} />;
  }

  // Show loading state while fetching data
  if (dataLoading) return <LoadingSpinner />;

  // Show error if data fetching failed
  if (dataError) {
    return <ErrorAlert message={`Error loading ${type} data: ${dataError.message}`} />;
  }

  // Get the first category from the data (should be the only one)
  const category = categoryData[0];

  if (!category) {
    return <ErrorAlert message={`${capitalize(type || '')} with ID ${id} not found`} />;
  }

  const handleSubmit = async (values: any) => {
    await updateCategoryMutation({
      variables: {
        input: {
          ...values,
          id: id,
        },
      },
    });
  };

  const category_type = categoryTypeMap[type];

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title={`Edit ${capitalize(type || '')}`} Breadcrumbs_level1={type} Breadcrumbs_level1_url={`/category/${type}`} />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={closeSnackbar} />

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: searchTokens.primary[200],
          p: 2,
          borderRadius: 2,
          border: `1px solid ${searchTokens.primary[400]}`,
        }}
      >
        <CategoryForm
          onSubmit={handleSubmit}
          loading={updateLoading}
          category_type={category_type}
          type={type}
          initialValues={{ name: category.name }}
          submitButtonText={`Update ${capitalize(type || '')}`}
        />
      </Container>
    </Box>
  );
}

export default EditCategory;
