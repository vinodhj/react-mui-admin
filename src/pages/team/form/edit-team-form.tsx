import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EditUserInput, Role } from '../../../graphql/graphql-generated';
import { tokens } from '../../../theme/main-theme';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

interface EditTeamFormProps {
  user: { id: string; name: string; phone: string; email: string; role: Role };
  updateUserMutation: (options: { variables: { input: EditUserInput } }) => Promise<any>;
  loading: boolean;
}

const EditTeamForm: React.FC<EditTeamFormProps> = ({ user, updateUserMutation, loading }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserMutation({ variables: { input: { id: user.id, ...values } } });
      } catch (err) {
        console.error('Error updating team member', err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        Edit User Details
      </Typography>

      {(['name', 'phone', 'email'] as const).map((field) => (
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
          {...(field === 'email' && { disabled: true })}
          sx={{
            '& .MuiFormLabel-root': { color: colors.grey[50] },
            '& .MuiFormLabel-root.Mui-focused': { color: colors.greenAccent[400] },
            '& .MuiOutlinedInput-root': { color: colors.grey[50] },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.grey[100] },
          }}
        />
      ))}

      <TextField label="Role" variant="outlined" fullWidth margin="normal" name="role" value={user.role} disabled />

      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditTeamForm;
