import Box from '@mui/material/Box';
import PageHeader from '../../components/pages/page-header';
import CustomSnackbar from '../../components/common/custom-snackbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { SearchTokens } from '../../theme/main-theme';
import { useEffect, useState } from 'react';
import { useCreateCategoryMutation } from '../../graphql/graphql-generated';
import CreateCategoryForm from './form/create-category-form';
import { Navigate, useParams } from 'react-router-dom';
import { categoryTypeMap } from '../../hooks/use-delete-category';
import { isValidCategoryType } from '../../hooks/use-category-data';

// Define the valid types
export type ValidCategoryType = 'tag' | 'mode' | 'fynix';

function CreateCategory() {
  const { type } = useParams<{ type: string }>();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const searchTokens = SearchTokens(mode);
  const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation();

  // Validate the type parameter - moved after all hooks
  const isValidType = isValidCategoryType(type);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  // Handle API response
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error]); // Runs only when `error` changes

  useEffect(() => {
    if (data?.createCategory?.success) {
      setSnackbarMessage(`${type} created successfully!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [data]); // Runs only when `data` changes

  // If type is invalid, redirect to error page
  if (!isValidType) {
    return <Navigate to="/error" replace state={{ message: `Invalid category type: ${type}` }} />;
  }

  const category_type = categoryTypeMap[type];

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader
          title={type ? `Create ${type}` : 'Create Category'}
          Breadcrumbs_level1={type}
          Breadcrumbs_level1_url={`/category/${type}`}
        />
      </Box>

      {/* Snackbar Alert */}
      <CustomSnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} />

      <Container
        maxWidth="sm"
        sx={{ backgroundColor: searchTokens.primary[200], p: 2, borderRadius: 2, border: `1px solid ${searchTokens.primary[400]}` }}
      >
        <CreateCategoryForm createUserMutation={createCategoryMutation} loading={loading} category_type={category_type} type={type} />
      </Container>
    </Box>
  );
}

export default CreateCategory;
