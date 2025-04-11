import { useMemo } from 'react';
import { ExpenseFilterValues } from '../../../components/pages/expense-filter';
import { useDebounce } from '../../../hooks/use-debounce';

// Custom hook for different debounce times based on filter type
export function useSmartDebounce(filters: ExpenseFilterValues) {
  // Use a shorter delay for dropdown selections
  const discreteFilters = useMemo(
    () => ({
      expense_period: filters.expense_period,
      status: filters.status,
    }),
    [filters.expense_period, filters.status]
  );

  // Use a longer delay for numeric inputs that users might type continuously
  const rangeFilters = useMemo(
    () => ({
      min_amount: filters.min_amount,
      max_amount: filters.max_amount,
    }),
    [filters.min_amount, filters.max_amount]
  );

  // Debounce with different delays
  const debouncedDiscreteFilters = useDebounce(discreteFilters, 200);
  const debouncedRangeFilters = useDebounce(rangeFilters, 600);

  // Combine debounced filters
  return useMemo(
    () => ({
      ...debouncedDiscreteFilters,
      ...debouncedRangeFilters,
    }),
    [debouncedDiscreteFilters, debouncedRangeFilters]
  );
}
