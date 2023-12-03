import { InputHTMLAttributes } from 'react';
import { ControlWrapper } from './ControlWrapper';
import { FieldError } from 'react-hook-form';

export const ImageUpload = ({
  label,
  error,
  ...fileUploadProps
}: {
  error?: FieldError | string;
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) => (
  <ControlWrapper
    label={label}
    labelHTMLFor={fileUploadProps.id ?? fileUploadProps.name}
    error={error}
  >
    <input
      id={fileUploadProps.id ?? fileUploadProps.name}
      className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
        !!error &&
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      }`}
      aria-describedby="file_input_help"
      type="file"
      {...fileUploadProps}
    />

    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
      PNG, JPG or JPEG.
    </p>
  </ControlWrapper>
);
