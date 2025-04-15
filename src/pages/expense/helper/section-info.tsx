import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InfoFieldProps {
  label: string;
  value: string;
  colors: any;
}

interface SectionTitleProps {
  title: string;
  colors: any;
}

export const InfoField = ({ label, value, colors }: InfoFieldProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color={colors.grey[400]} gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: colors.grey[50], fontWeight: 'medium' }}>
      {value || '-'}
    </Typography>
  </Box>
);

export const SectionTitle = ({ title, colors }: SectionTitleProps) => (
  <Box sx={{ mt: 3, mb: 2 }}>
    <Typography
      variant="h5"
      fontWeight="medium"
      color={colors.greenAccent[400]}
      sx={{
        pb: 1,
        borderBottom: `1px solid ${colors.greenAccent[700]}`,
      }}
    >
      {title}
    </Typography>
  </Box>
);
