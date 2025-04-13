import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme/main-theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { validateExpensePeriod } from '../../../components/pages/expense-filter';
import {
  Category,
  ExpenseStatus,
  useExpenseFynixesQuery,
  useExpenseModesQuery,
  useExpenseTagsQuery,
} from '../../../graphql/graphql-generated';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ReactNode, useMemo } from 'react';
import ErrorAlert from '../../../components/common/error-alert';
import { useSession } from '../../../hooks/use-session';

interface ExpenseFormValues {
  id?: string;
  user_id: string;
  expense_period: string;
  amount: number | string;
  description?: string;
  item_details?: string;
  tag_id: string;
  mode_id: string;
  fynix_id: string;
  status: ExpenseStatus | string;
}

interface ExpenseFormProps {
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
  loading: boolean;
  initialValues?: ExpenseFormValues;
  submitButtonText?: string;
  title?: string;
}

const validationSchema = yup.object({
  expense_period: yup
    .string()
    .required('Expense period is required')
    .test('expense-period', 'Invalid expense period', (value) => {
      const error = validateExpensePeriod(value ?? '');
      return error === '';
    }),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  tag_id: yup.string().required('Tag is required'),
  mode_id: yup.string().required('Payment mode is required'),
  fynix_id: yup.string().required('Fynix is required'),
  status: yup.string().required('Status is required'),
  description: yup.string(),
  item_details: yup.string(),
});

const useExpenseFormData = () => {
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useExpenseTagsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: modesData,
    loading: modesLoading,
    error: modesError,
  } = useExpenseModesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
  const {
    data: fynixData,
    loading: fynixLoading,
    error: fynixError,
  } = useExpenseFynixesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const isLoading = tagsLoading || modesLoading || fynixLoading;
  // Consolidate errors
  const errors = useMemo(() => {
    return [
      tagsError && `Tags error: ${tagsError.message}`,
      modesError && `Modes error: ${modesError.message}`,
      fynixError && `Fynix error: ${fynixError.message}`,
    ].filter(Boolean);
  }, [tagsError, modesError, fynixError]);

  const optionsLoaded = !isLoading && tagsData && modesData && fynixData;

  return {
    tagsData: tagsData?.expenseTags || [],
    modesData: modesData?.expenseModes || [],
    fynixData: fynixData?.expenseFynixes || [],
    isLoading,
    errors,
    optionsLoaded,
  };
};

// Form select component to reduce duplication
const FormSelect = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  options,
  disabled,
  selectStyles,
  inputStyles,
  menuProps,
  colors,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>, _child: ReactNode) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  error: boolean;
  helperText: string | undefined;
  options: any[];
  disabled?: boolean;
  selectStyles: SxProps<Theme>;
  inputStyles: SxProps<Theme>;
  menuProps: any;
  colors: any;
}) => (
  <FormControl fullWidth margin="normal" error={error} sx={{ ...inputStyles }}>
    <InputLabel id={`${name}-select-label`} sx={{ color: colors.grey[50] }}>
      {label}
    </InputLabel>
    <Select
      labelId={`${name}-select-label`}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      disabled={disabled}
      sx={selectStyles}
      MenuProps={menuProps}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
    {error && helperText && (
      <Typography color="error" variant="caption">
        {helperText}
      </Typography>
    )}
  </FormControl>
);

const getInputStyles = (colors: any): SxProps<Theme> => ({
  '& .MuiFormLabel-root': {
    color: colors.grey[50],
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: colors.greenAccent[400],
  },
  '& .MuiOutlinedInput-root': {
    color: colors.grey[50],
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: colors.grey[100],
  },
});

const getInitialValues = (): ExpenseFormValues => ({
  id: '',
  user_id: '',
  expense_period: '',
  amount: '',
  description: '',
  item_details: '',
  tag_id: '',
  mode_id: '',
  fynix_id: '',
  status: '',
});

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, loading, initialValues = getInitialValues(), submitButtonText, title }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const colors = tokens(mode);
  const { sessionAdmin } = useSession();

  // Define common input styles
  const inputStyles = getInputStyles(colors);

  const selectMenuProps = useMemo(
    () => ({
      PaperProps: {
        sx: {
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: colors.greenAccent[900],
            },
            '&.Mui-selected': {
              backgroundColor: colors.greenAccent[600],
            },
          },
        },
      },
    }),
    [colors]
  );

  const selectStyles = useMemo(
    (): SxProps<Theme> => ({
      color: colors.grey[50],
      '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.grey[100] },
    }),
    [colors]
  );

  // Use custom hook for data fetching
  const { tagsData, modesData, fynixData, isLoading: optionsLoading, errors: dataErrors, optionsLoaded } = useExpenseFormData();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      user_id: sessionAdmin?.adminID || initialValues.user_id,
      // Only set select values if they exist in the options
      tag_id:
        optionsLoaded && initialValues.tag_id && tagsData?.some((tag: Category | null) => tag?.id === initialValues.tag_id)
          ? initialValues.tag_id
          : '',
      mode_id:
        optionsLoaded && initialValues.mode_id && modesData?.some((mode: Category | null) => mode?.id === initialValues.mode_id)
          ? initialValues.mode_id
          : '',
      fynix_id:
        optionsLoaded && initialValues.fynix_id && fynixData?.some((fynix: Category | null) => fynix?.id === initialValues.fynix_id)
          ? initialValues.fynix_id
          : '',
    },
    validationSchema,
    enableReinitialize: true, // Reinitialize form when initialValues change
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        // Ensure amount is a number
        const formattedValues = {
          ...values,
          amount: parseFloat(values.amount as string),
        };

        // For create, we don't want to send the id field
        const submitValues = !initialValues.id ? { ...formattedValues, id: undefined } : formattedValues;

        await onSubmit(submitValues);

        if (!initialValues.id) {
          // Only reset if it's a create form
          resetForm();
        }
      } catch (err) {
        console.error(`Error submitting expense form`, err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Show a loader while options are loading
  if (!optionsLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const submitText = initialValues.id ? 'Update' : 'Create';
  const isLoading = loading || optionsLoading;

  return (
    <>
      {/* Error displays */}
      {dataErrors.map((error, index) => (
        <ErrorAlert key={`${error?.slice(0, 4)}-${index}`} message={error as string} />
      ))}
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          {title ?? `${initialValues.id ? 'Edit' : 'Create'} Expense`}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Expense Period"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              name="expense_period"
              id="expense_period"
              placeholder="YYYY-MM"
              value={formik.values.expense_period}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.expense_period && Boolean(formik.errors.expense_period)}
              helperText={formik.touched.expense_period && formik.errors.expense_period}
              sx={{
                ...inputStyles,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="amount"
              id="amount"
              placeholder="Enter Expense Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              sx={{
                ...inputStyles,
              }}
              slotProps={{
                input: {
                  inputProps: {
                    min: 0,
                    step: '0.01',
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              name="tag_id"
              label="Tag"
              value={formik.values.tag_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.tag_id && formik.errors.tag_id)}
              helperText={formik.touched.tag_id ? formik.errors.tag_id : undefined}
              options={tagsData}
              disabled={optionsLoading}
              selectStyles={selectStyles}
              inputStyles={inputStyles}
              menuProps={selectMenuProps}
              colors={colors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              name="mode_id"
              label="Payment Mode"
              value={formik.values.mode_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.mode_id && formik.errors.mode_id)}
              helperText={formik.touched.mode_id ? formik.errors.mode_id : undefined}
              options={modesData}
              disabled={optionsLoading}
              selectStyles={selectStyles}
              inputStyles={inputStyles}
              menuProps={selectMenuProps}
              colors={colors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              name="fynix_id"
              label="Fynix"
              value={formik.values.fynix_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.fynix_id && formik.errors.fynix_id)}
              helperText={formik.touched.fynix_id ? formik.errors.fynix_id : undefined}
              options={fynixData}
              disabled={optionsLoading}
              selectStyles={selectStyles}
              inputStyles={inputStyles}
              menuProps={selectMenuProps}
              colors={colors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth margin="normal" error={formik.touched.status && Boolean(formik.errors.status)} sx={{ ...inputStyles }}>
              <InputLabel id="status-select-label" sx={{ color: colors.grey[50] }}>
                Status
              </InputLabel>
              <Select
                labelId="status-select-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Status"
                sx={selectStyles}
                MenuProps={selectMenuProps}
              >
                <MenuItem value={ExpenseStatus.Paid}>Paid</MenuItem>
                <MenuItem value={ExpenseStatus.UnPaid}>Unpaid</MenuItem>
                <MenuItem value={ExpenseStatus.NextDue}>Next Due</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <Typography color="error" variant="caption">
                  {formik.errors.status}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              id="description"
              multiline
              rows={2}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{
                ...inputStyles,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Item Details"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              name="item_details"
              id="item_details"
              multiline
              rows={3}
              value={formik.values.item_details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.item_details && Boolean(formik.errors.item_details)}
              helperText={formik.touched.item_details && formik.errors.item_details}
              sx={{
                ...inputStyles,
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={isLoading || !formik.dirty || !formik.isValid}
            startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
          >
            {isLoading ? 'Submitting...' : submitButtonText ?? `${submitText} Expense`}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ExpenseForm;
