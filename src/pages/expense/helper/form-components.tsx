import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { ExpenseStatus } from '../../../graphql/graphql-generated';
import TextField from '@mui/material/TextField';
import { ExpenseFormValues } from './expense-form';
import { FormikErrors, FormikTouched } from 'formik';
import { tokens } from '../../../theme/main-theme';

// Define types for the form components
interface FormikState {
  values: ExpenseFormValues;
  touched: FormikTouched<ExpenseFormValues>;
  errors: FormikErrors<ExpenseFormValues>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
}

interface StatusSelectFieldProps {
  formik: FormikState;
  selectStyles: SxProps<Theme>;
  menuProps: {
    PaperProps: {
      sx: Record<string, any>;
    };
  };
  colors: ReturnType<typeof tokens>;
  inputStyles: SxProps<Theme>;
}

interface FormTextFieldProps {
  name: keyof ExpenseFormValues;
  label: string;
  multiline?: boolean;
  rows?: number;
  formik: FormikState;
  inputStyles: SxProps<Theme>;
  inputProps?: Record<string, any>;
}

export const getInputStyles = (colors: any): SxProps<Theme> => ({
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

// Extracted status select field component to reduce complexity
export const StatusSelectField: React.FC<StatusSelectFieldProps> = ({ formik, selectStyles, menuProps, colors, inputStyles }) => {
  // Create the adapter function inside the component so it has access to formik
  const handleSelectChange = (event: SelectChangeEvent<string>, _child: ReactNode) => {
    formik.handleChange({
      target: {
        name: event.target.name,
        value: event.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <FormControl fullWidth margin="normal" error={formik.touched.status && Boolean(formik.errors.status)} sx={{ ...inputStyles }}>
      <InputLabel id="status-select-label" sx={{ color: colors.grey[50] }}>
        Status
      </InputLabel>
      <Select
        labelId="status-select-label"
        id="status"
        name="status"
        value={formik.values.status}
        onChange={handleSelectChange}
        onBlur={formik.handleBlur}
        label="Status"
        sx={selectStyles}
        MenuProps={menuProps}
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
  );
};

// Extracted text field component to reduce repetition
export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  multiline = false,
  rows = 1,
  formik,
  inputStyles,
  inputProps = {},
}) => (
  <TextField
    label={label}
    type={name === 'amount' ? 'number' : 'text'}
    variant="outlined"
    fullWidth
    margin="normal"
    name={name}
    id={name}
    multiline={multiline}
    rows={rows}
    placeholder={name === 'expense_period' ? 'YYYY-MM' : `Enter ${label}`}
    value={formik.values[name]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={!!(formik.touched[name] && formik.errors[name])}
    helperText={(formik.touched[name] && formik.errors[name]) as string | undefined}
    sx={{ ...inputStyles }}
    slotProps={
      name === 'amount'
        ? {
            input: { inputProps: { min: 0, step: '0.01' } },
          }
        : undefined
    }
    {...inputProps}
  />
);

// Form select component to reduce duplication
export const FormSelect = ({
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
