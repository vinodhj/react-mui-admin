import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface InfoRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, highlight = false }) => {
  return (
    <Box display="flex" justifyContent="space-between" sx={{ py: 1, px: 2, bgcolor: highlight ? 'grey.100' : 'inherit' }}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={highlight ? 'bold' : 'normal'}>
        {value}
      </Typography>
    </Box>
  );
};

export default InfoRow;
