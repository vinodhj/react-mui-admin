import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Role } from '../../../graphql/graphql-generated';
import { tokens } from '../../../theme/main-theme';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

interface CreateTeamFormProps {
  createUserMutation: (options: { variables: { input: any } }) => Promise<any>;
  loading: boolean;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ createUserMutation, loading }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: Role.User, // Default and non-changeable
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await createUserMutation({ variables: { input: values } });
        resetForm();
      } catch (err) {
        console.error('Error creating team member', err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        Create a new user
      </Typography>

      {(['name', 'email', 'phone', 'password'] as const).map((field) => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          type={field === 'password' ? 'password' : 'text'}
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

      <TextField label="Role" variant="outlined" fullWidth margin="normal" name="role" value={formik.values.role} disabled />

      <Button type="submit" variant="contained" color="secondary" fullWidth disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
};

export default CreateTeamForm;
