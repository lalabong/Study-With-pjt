import { useState } from 'react';

import { USER_ERROR_MESSAGES } from '@/constants/errorMessages';

type ValidateFormField = {
  value: string;
  validate: boolean;
};

type ValidateFormFields = {
  userId: ValidateFormField;
  password: ValidateFormField;
  nickname?: ValidateFormField;
  confirmPassword?: ValidateFormField;
};

type ValidateFormErrors = {
  userId?: string;
  password?: string;
  nickname?: string;
  confirmPassword?: string;
};

export const useValidateForm = (initialFields: ValidateFormFields) => {
  const [errors, setErrors] = useState<ValidateFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidateFormErrors = {};

    if (initialFields.userId.validate && initialFields.userId.value.length < 4) {
      newErrors.userId = USER_ERROR_MESSAGES.ID_MIN_LENGTH;
    }

    if (initialFields.password.validate) {
      if (initialFields.password.value.length < 8) {
        newErrors.password = USER_ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
      } else {
        const isPasswordFormatValid =
          /[a-zA-Z]/.test(initialFields.password.value) &&
          /[0-9]/.test(initialFields.password.value);

        if (!isPasswordFormatValid) {
          newErrors.password = USER_ERROR_MESSAGES.PASSWORD_FORMAT;
        }
      }
    }

    if (initialFields.nickname?.validate && initialFields.nickname.value.length < 2) {
      newErrors.nickname = USER_ERROR_MESSAGES.NICKNAME_MIN_LENGTH;
    }

    if (
      initialFields.confirmPassword?.validate &&
      initialFields.password.value !== initialFields.confirmPassword.value
    ) {
      newErrors.confirmPassword = USER_ERROR_MESSAGES.PASSWORD_MISMATCH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};
