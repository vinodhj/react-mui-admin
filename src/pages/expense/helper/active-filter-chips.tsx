import Stack from '@mui/material/Stack';
import { ExpenseFilterValues } from '../../../components/pages/expense-filter';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

// Separate reusable components
const ActiveFilterChips = ({
  filters,
  onDeleteFilter,
  isPending,
}: {
  filters: ExpenseFilterValues;
  onDeleteFilter: (key: keyof ExpenseFilterValues) => void;
  isPending: boolean;
}) => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
      {filters.expense_period && (
        <Chip
          label={`Period: ${filters.expense_period}`}
          size="small"
          onDelete={() => onDeleteFilter('expense_period')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.min_amount && (
        <Chip
          label={`Min: $${filters.min_amount}`}
          size="small"
          onDelete={() => onDeleteFilter('min_amount')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.max_amount && (
        <Chip
          label={`Max: $${filters.max_amount}`}
          size="small"
          onDelete={() => onDeleteFilter('max_amount')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {filters.status && filters.status.length > 0 && (
        <Chip
          label={`Status: ${filters.status.join(', ')}`}
          size="small"
          onDelete={() => onDeleteFilter('status')}
          sx={isPending ? { opacity: 0.7 } : {}}
        />
      )}
      {isPending && (
        <Fade in={isPending}>
          <CircularProgress size={20} thickness={5} sx={{ ml: 1 }} />
        </Fade>
      )}
    </Stack>
  );
};

export default ActiveFilterChips;
