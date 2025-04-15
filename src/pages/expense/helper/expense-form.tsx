import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme/main-theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { validateExpensePeriod } from '../../../components/pages/expense-filter';
import { Category, ExpenseStatus } from '../../../graphql/graphql-generated';
import Grid from '@mui/material/Grid2';
import { useMemo } from 'react';
import ErrorAlert from '../../../components/common/error-alert';
import { useSession } from '../../../hooks/use-session';
import { FormSelect, FormTextField, getInputStyles, StatusSelectField } from './form-components';
import { useExpenseFormData } from '../../../hooks/use-expense-form-data';

export interface ExpenseFormValues {
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

// Helper function to determine initial option value
const getInitialOptionValue = (
  initialId: string | undefined,
  optionsData: (Category | null)[] | undefined,
  optionsLoaded: boolean
): string => {
  if (!optionsLoaded || !initialId) return '';
  return optionsData?.some((item: Category | null) => item?.id === initialId) ? initialId : '';
};

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

  // Pre-process initial values to use in formik
  const processedInitialValues = useMemo(() => {
    if (!optionsLoaded) return initialValues;

    return {
      ...initialValues,
      user_id: sessionAdmin?.adminID || initialValues.user_id,
      tag_id: getInitialOptionValue(initialValues.tag_id, tagsData, optionsLoaded),
      mode_id: getInitialOptionValue(initialValues.mode_id, modesData, optionsLoaded),
      fynix_id: getInitialOptionValue(initialValues.fynix_id, fynixData, optionsLoaded),
    };
  }, [initialValues, optionsLoaded, tagsData, modesData, fynixData, sessionAdmin]);

  const formik = useFormik<ExpenseFormValues>({
    initialValues: processedInitialValues,
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
  const formTitle = title ?? `${initialValues.id ? 'Edit' : 'Create'} Expense`;

  return (
    <>
      {/* Error displays */}
      {dataErrors.map((error, index) => (
        <ErrorAlert key={`${String(error)?.slice(0, 4)}-${index}`} message={error as string} />
      ))}
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" gutterBottom sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          {formTitle}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormTextField name="expense_period" label="Expense Period" formik={formik} inputStyles={inputStyles} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormTextField name="amount" label="Amount" formik={formik} inputStyles={inputStyles} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormSelect
              name="tag_id"
              label="Tag"
              value={formik.values.tag_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.tag_id && formik.errors.tag_id)}
              helperText={formik.touched.tag_id && formik.errors.tag_id ? String(formik.errors.tag_id) : undefined}
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
              helperText={formik.touched.mode_id && formik.errors.mode_id ? String(formik.errors.mode_id) : undefined}
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
              helperText={formik.touched.fynix_id && formik.errors.fynix_id ? String(formik.errors.fynix_id) : undefined}
              options={fynixData}
              disabled={optionsLoading}
              selectStyles={selectStyles}
              inputStyles={inputStyles}
              menuProps={selectMenuProps}
              colors={colors}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StatusSelectField
              formik={formik}
              selectStyles={selectStyles}
              menuProps={selectMenuProps}
              colors={colors}
              inputStyles={inputStyles}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormTextField name="description" label="Description" formik={formik} inputStyles={inputStyles} multiline={true} rows={2} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormTextField name="item_details" label="Item Details" formik={formik} inputStyles={inputStyles} multiline={true} rows={3} />
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
