import React, { useEffect, useState } from 'react';
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
import { useTheme } from '@mui/material';
import { tokens } from '../../theme/main-theme';
import { useNavigate } from 'react-router-dom';
import { useEditUserMutation } from '../../graphql/graphql-generated';
import LoadingSpinner from '../../components/common/loading-spinner';
import CustomSnackbar from '../../components/common/custom-snackbar';
import { useSession } from '../../hooks/use-session';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { session, sessionAdmin, updateSession } = useSession();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const user = {
    id: sessionAdmin.adminID,
    name: sessionAdmin.adminName,
    email: sessionAdmin.adminEmail,
    role: sessionAdmin.adminRole === 'ADMIN' ? 'Administrator' : 'User',
  };

  const [updateUserMutation, { data: updateData, loading, error }] = useEditUserMutation();

  // Initialize Formik before any early returns
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Formik will automatically update its state with the new initial values
    onSubmit: async (values, { resetForm }) => {
      try {
        await updateUserMutation({ variables: { input: { id: user.id, ...values } } });
      } catch (err) {
        console.error('Error updating team member', err);
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
    if (updateData?.editUser?.success) {
      const { user } = updateData.editUser;
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // update session if data
      if (session && sessionAdmin && updateSession && sessionAdmin?.adminID === user?.id && user?.name) {
        updateSession({
          session: {
            ...session,
          },
          sessionAdmin: {
            ...sessionAdmin,
            adminName: user.name,
          },
        });
      }
    }
  }, [updateData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <PageHeader title="Edit Profile" Breadcrumbs_level1="My Profile" Breadcrumbs_level1_url="/profile" />
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
        <ProfileSidebar user={user} onChangePasswordClick={handleChangePassword} />
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
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={formik.handleSubmit}>
              {(['name', 'email'] as const).map((field) => (
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
              <Button variant="contained" color="secondary" type="submit" sx={{ mt: 3, borderRadius: 2 }}>
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </form>
          </CardContent>
          {/* Note about admin role update */}
          <Typography variant="body2" color="textSecondary" mt={2} textAlign="center">
            Note: To update role and email, please contact the admin.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default EditProfile;
