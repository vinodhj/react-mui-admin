import { useState, ChangeEvent } from 'react';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

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

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);

    // Clear server error if validation fails
    if (!isValid) {
      setServerError(null);
    }

    return isValid;
  };

  return { values, errors, serverError, setServerError, handleChange, validate };
};
