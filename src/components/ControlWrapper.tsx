import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

export const ControlWrapper = ({
  label,
  labelHTMLFor,
  children,
  error,
}: PropsWithChildren<{
  label?: string;
  error?: FieldError | string;
  labelHTMLFor?: string;
}>) => {
  const labelClassName = !!error
    ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
    : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={labelHTMLFor} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  );
};
