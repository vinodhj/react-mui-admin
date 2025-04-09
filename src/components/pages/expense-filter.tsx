import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from '../../theme/main-theme';
import { ExpenseStatus } from '../../graphql/graphql-generated';

export interface ExpenseFilterValues {
  expense_period?: string | null;
  min_amount?: number | null;
  max_amount?: number | null;
  status?: ExpenseStatus[] | null;
}

interface ExpenseFilterProps {
  currentFilters?: ExpenseFilterValues;
  onApplyFilter: (filters: ExpenseFilterValues) => void;
  onResetFilters?: () => void; // Optional prop
}

const validateExpensePeriod = (value: string) => {
  if (!value) return '';
  // Check format first
  if (!/^\d{4}-\d{2}$/.test(value)) {
    return 'Format: YYYY-MM';
  }
  // Split into year and month
  const [yearStr, monthStr] = value.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  // Validate month
  if (month < 1 || month > 12) {
    return 'Invalid month (1-12)';
  }
  // Validate year
  if (year < 1900 || year > 2100) {
    return 'Year must be between 1900 and 2100';
  }
  // Valid
  return '';
};

const ExpenseFilter: FC<ExpenseFilterProps> = ({ currentFilters = {}, onApplyFilter, onResetFilters }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [expanded, setExpanded] = useState<boolean>(false);
  const [expensePeriod, setExpensePeriod] = useState<string>(currentFilters.expense_period ?? '');
  const [minAmount, setMinAmount] = useState<number | null>(currentFilters.min_amount ?? null);
  const [maxAmount, setMaxAmount] = useState<number | null>(currentFilters.max_amount ?? null);
  const [status, setStatus] = useState<ExpenseStatus[]>(currentFilters.status ?? []);

  useEffect(() => {
    setExpensePeriod(currentFilters.expense_period ?? '');
    setMinAmount(currentFilters.min_amount ?? null);
    setMaxAmount(currentFilters.max_amount ?? null);
    setStatus(currentFilters.status ?? []);
  }, [currentFilters]);

  const handleStatusChange = (event: SelectChangeEvent<typeof status>) => {
    const value = event.target.value;
    // Handle the case when value is an array of strings
    setStatus(typeof value === 'string' ? [value as ExpenseStatus] : value);
  };

  const handleApplyFilter = () => {
    const filters = {
      expense_period: expensePeriod || null,
      min_amount: minAmount,
      max_amount: maxAmount,
      status: status.length > 0 ? status : null,
    };
    onApplyFilter(filters);
    if (isMobile) {
      setExpanded(false);
    }
  };

  const handleClearFilter = () => {
    setExpensePeriod('');
    setMinAmount(null);
    setMaxAmount(null);
    setStatus([]);
    onApplyFilter({});
    if (onResetFilters) {
      onResetFilters();
    }
    if (isMobile) {
      setExpanded(false);
    }
  };

  const minAmountError = minAmount && minAmount < 0 ? 'Cannot be negative' : '';
  const maxAmountError = maxAmount && maxAmount < 0 ? 'Cannot be negative' : '';

  // Check if any filters are active to show visual indicator
  const hasActiveFilters = expensePeriod || minAmount || maxAmount || status.length > 0;

  const filterContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        width: '100%',
        alignItems: { xs: 'stretch', md: 'center' },
      }}
    >
      {/* Simple text field for date input in YYYY-MM-DD format */}
      <TextField
        label="Expense Period"
        type="text"
        size="small"
        value={expensePeriod}
        onChange={(e) => setExpensePeriod(e.target.value ?? '')}
        placeholder="YYYY-MM"
        sx={{ minWidth: '150px' }}
        helperText={validateExpensePeriod(expensePeriod)}
        error={expensePeriod !== '' && validateExpensePeriod(expensePeriod) !== ''}
        slotProps={{
          input: {
            inputProps: {
              pattern: '\\d{4}-\\d{2}',
            },
          },
        }}
      />

      <TextField
        label="Min Amount"
        type="number"
        size="small"
        value={minAmount}
        onChange={(e) => setMinAmount(Number(e.target.value))}
        sx={{ minWidth: '100px' }}
        slotProps={{
          input: {
            inputProps: {
              min: 0,
              step: '1',
            },
          },
        }}
        helperText={
          minAmount && maxAmount && minAmount > maxAmount ? 'Minimum amount cannot be greater than maximum amount' : minAmountError
        }
        error={(!!minAmount && minAmount < 0) || (!!minAmount && !!maxAmount && minAmount > maxAmount)}
      />

      <TextField
        label="Max Amount"
        type="number"
        size="small"
        value={maxAmount}
        onChange={(e) => setMaxAmount(Number(e.target.value))}
        sx={{ minWidth: '100px' }}
        slotProps={{
          input: {
            inputProps: {
              min: 0,
              step: '1',
            },
          },
        }}
        helperText={maxAmount && minAmount && maxAmount < minAmount ? 'Maximum amount cannot be less than minimum amount' : maxAmountError}
        error={(!!maxAmount && maxAmount < 0) || (!!maxAmount && !!minAmount && maxAmount < minAmount)}
      />

      <FormControl size="small" sx={{ minWidth: '120px' }}>
        <InputLabel>Status</InputLabel>
        <Select multiple value={status} label="Status" onChange={handleStatusChange}>
          <MenuItem value={ExpenseStatus.Paid}>Paid</MenuItem>
          <MenuItem value={ExpenseStatus.UnPaid}>Unpaid</MenuItem>
          <MenuItem value={ExpenseStatus.NextDue}>Next Due</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilter}
          startIcon={<FilterAltIcon />}
          size="small"
          sx={hasActiveFilters ? { bgcolor: colors.greenAccent[500] } : {}}
        >
          Apply
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearFilter} startIcon={<ClearIcon />} size="small">
          Clear
        </Button>
      </Box>
    </Box>
  );

  // Show accordion on mobile, regular layout on desktop
  if (isMobile) {
    return (
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          mb: 2,
          width: '100%',
          bgcolor: hasActiveFilters ? colors.greenAccent[600] : colors.primary[400],
          '&::before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterAltIcon sx={{ mr: 1, color: hasActiveFilters ? colors.greenAccent[300] : 'inherit' }} />
            Filters {hasActiveFilters && ' (Active)'}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{filterContent}</AccordionDetails>
      </Accordion>
    );
  }

  return filterContent;
};

export default ExpenseFilter;
