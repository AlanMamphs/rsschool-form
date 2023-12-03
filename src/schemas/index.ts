import { useCallback } from 'react';
import * as yup from 'yup';

export const useYupValidationResolver = <T extends object>(
  validationSchema: yup.Schema
) =>
  useCallback(
    async (data: T) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as yup.ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [(currentError as { path: string }).path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export * from './formData';
