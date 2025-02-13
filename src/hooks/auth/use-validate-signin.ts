import { useState, ChangeEvent } from 'react';
import * as yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

// Define a Yup schema for sign-in validation
const signInSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const useValidateSignInForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited and any previous server error
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError(null);
  };

  const validate = async (): Promise<boolean> => {
    try {
      // Validate the values with the schema
      await signInSchema.validate(values, { abortEarly: false });
      // If successful, clear any previous errors
      setErrors({});
      return true;
    } catch (err: any) {
      // If there are validation errors, build an error object
      const formErrors: FormErrors = {};
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach((validationError: yup.ValidationError) => {
          // Only set the first error per field
          if (!formErrors[validationError.path as keyof FormErrors]) {
            formErrors[validationError.path as keyof FormErrors] = validationError.message;
          }
        });
      }
      setErrors(formErrors);
      return false;
    }
  };

  return { values, errors, serverError, setServerError, handleChange, validate };
};
