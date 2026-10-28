import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

type FormValues = Record<string, string>;

export function useFormWithValidation(initialValues: FormValues = {}) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, validationMessage, form } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(form?.checkValidity() ?? false);
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }, [initialValues]);

  return { values, errors, isValid, handleChange, resetForm };
}
