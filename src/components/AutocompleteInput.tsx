import { InputHTMLAttributes } from 'react';
import { ControlWrapper } from './ControlWrapper';
import { FieldError } from 'react-hook-form';

export const Autocomplete = ({
  datalist,
  error,
  ...inputProps
}: {
  error?: FieldError | string;
  datalist: string[];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) => {
  const className = !!error
    ? 'block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    : 'block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  return (
    <ControlWrapper error={error}>
      <label
        htmlFor={inputProps['id'] ?? inputProps['name']}
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          id={inputProps['id'] ?? inputProps['name']}
          type="search"
          className={className}
          placeholder="Start searching"
          list={`${inputProps['id'] ?? inputProps['name']}-list`}
          {...inputProps}
        />
        <datalist id={`${inputProps['id'] ?? inputProps['name']}-list`}>
          {datalist?.map((item, index) => <option key={index} value={item} />)}
        </datalist>
      </div>
    </ControlWrapper>
  );
};
