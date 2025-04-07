import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { tokens } from '../theme/main-theme';
import PageHeader from '../components/pages/page-header';
interface ErrorState {
  message?: string;
}

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Get error message from location state, or use default
  const state = location.state as ErrorState;
  const errorMessage = state?.message ?? 'An unexpected error occurred';

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Box m="20px" sx={{ p: '0 15px' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
        <PageHeader title="Error" subtitle="Something went wrong" />
      </Box>

      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: colors.primary[400],
            border: `1px solid ${colors.grey[300]}`,
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 64, color: colors.redAccent[500], mb: 2 }} />

          <Typography variant="h3" gutterBottom sx={{ color: colors.grey[100] }}>
            Oops! Error Encountered
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: colors.grey[300] }}>
            {errorMessage}
          </Typography>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoHome}
              sx={{
                backgroundColor: colors.greenAccent[600],
                '&:hover': {
                  backgroundColor: colors.greenAccent[500],
                },
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ErrorPage;
