import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useFormik } from 'formik';
import * as yup from 'yup';
import ProfileSidebar from '../../components/profile-sidebar';
import PageHeader from '../../components/pages/page-header';
import { SessionContext } from '../../contexts/session-context';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme/main-theme';
import { useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '../../graphql/graphql-generated';
import CustomSnackbar from '../../components/common/custom-snackbar';

const validationSchema = yup.object({
  current_password: yup
    .string()
    .required('Current Password is required')
    .min(6, 'New Password should be of minimum 6 characters length')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  new_password: yup
    .string()
    .required('New Password is required')
    .min(6, 'New Password should be of minimum 6 characters length')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ChangePassword: React.FC = () => {
  const sessionDetails = useContext(SessionContext);
  const { session } = sessionDetails ?? {};
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const user = {
    id: session?.adminID ?? '',
    name: session?.adminName ?? '',
    email: session?.adminEmail ?? '',
    role: session?.adminRole === 'ADMIN' ? 'Administrator' : 'User',
  };

  const [changePasswordMutation, { data: updateData, loading, error }] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await changePasswordMutation({ variables: { input: { id: user.id, ...values } } });
      } catch (err) {
        console.error('Error changing password', err);
      }
      resetForm();
    },
  });

  // Handle error side-effect (ideally, use an effect for this)
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error?.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error]);

  useEffect(() => {
    if (updateData?.changePassword) {
      setSnackbarMessage('Password updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [updateData]);

  // Callbacks for sidebar actions
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <PageHeader title="CHANGE PASSWORD" Breadcrumbs_level1="My Profile" Breadcrumbs_level1_url="/profile" />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mt: 4,
        }}
      >
        <CustomSnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} />
        <ProfileSidebar user={user} onEditProfileClick={handleEditProfile} />
        <Card
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Change Password
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={formik.handleSubmit}>
              {(['current_password', 'new_password', 'confirm_password'] as const).map((field) => (
                <TextField
                  key={field}
                  label={field
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                  type="password"
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
              <Button variant="contained" color="secondary" type="submit" sx={{ mt: 3, borderRadius: 2 }}>
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ChangePassword;
