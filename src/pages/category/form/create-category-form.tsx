import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme/main-theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CategoryType } from '../../../graphql/graphql-generated';
import { ValidCategoryType } from '../create';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface CreateCategoryFormProps {
  createUserMutation: (options: { variables: { input: any } }) => Promise<any>;
  loading: boolean;
  category_type: CategoryType;
  type: ValidCategoryType;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ createUserMutation, loading, category_type, type }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  const formik = useFormik({
    initialValues: {
      name: '',
      category_type: category_type,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createUserMutation({ variables: { input: values } });
        resetForm();
      } catch (err) {
        console.error(`Error creating new ${type}`, err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        Create a new {type}
      </Typography>

      {(['name'] as const).map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          name={field}
          value={formik.values[field]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
          sx={{
            '& .MuiFormLabel-root': { color: colors.grey[50] },
            '& .MuiFormLabel-root.Mui-focused': { color: colors.greenAccent[400] },
            '& .MuiOutlinedInput-root': { color: colors.grey[50] },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.grey[100] },
          }}
        />
      ))}

      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={loading}>
        {loading ? 'Creating...' : `Create ${type}`}
      </Button>
    </form>
  );
};

export default CreateCategoryForm;
