import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme/main-theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CategoryType } from '../../../graphql/graphql-generated';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { capitalize, ValidCategoryType } from '../category-config';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
});

interface CreateCategoryFormProps {
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
  category_type: CategoryType;
  type: ValidCategoryType;
  initialValues?: { name: string };
  submitButtonText?: string;
  title?: string;
}

const CategoryForm: React.FC<CreateCategoryFormProps> = ({
  onSubmit,
  loading,
  category_type,
  type,
  initialValues = { name: '' },
  submitButtonText,
  title,
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      category_type: category_type,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await onSubmit(values);
        if (!initialValues.name) {
          // Only reset if it's a create form
          resetForm();
        }
      } catch (err) {
        console.error(`Error submitting ${type} form`, err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const submitText = initialValues.name ? 'Update' : 'Create';

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        {title ?? `${initialValues.name ? 'Edit' : 'Create'} ${capitalize(type)}`}
      </Typography>

      <TextField
        label="Name"
        type="text"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{
          '& .MuiFormLabel-root': { color: colors.grey[50] },
          '& .MuiFormLabel-root.Mui-focused': { color: colors.greenAccent[400] },
          '& .MuiOutlinedInput-root': { color: colors.grey[50] },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.grey[100] },
        }}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          disabled={loading || !formik.dirty || !formik.isValid}
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
        >
          {loading ? 'Submitting...' : submitButtonText || `${submitText} ${capitalize(type)}`}
        </Button>
      </Box>
    </form>
  );
};

export default CategoryForm;
