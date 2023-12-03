import { InputHTMLAttributes, ReactNode } from 'react';
import { ControlWrapper } from './ControlWrapper';
import { FieldError } from 'react-hook-form';

export const Checkbox = ({
  labelContent,
  error,
  ...checkboxProps
}: {
  labelContent?: ReactNode;
  error?: FieldError | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) => {
  const className = !!error
    ? 'ms-2 text-sm font-medium text-red-600'
    : 'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300';
  return (
    <ControlWrapper error={error}>
      <div className="flex items-center">
        <input
          id={checkboxProps.id ?? checkboxProps.name}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          {...checkboxProps}
        />
        <label
          htmlFor={checkboxProps.id ?? checkboxProps.name}
          className={className}
        >
          {labelContent}
        </label>
      </div>
    </ControlWrapper>
  );
};
