import { useMemo, useState } from 'react';
import { ValidationError } from 'yup';
import {
  Input,
  Select,
  ImageUpload,
  Autocomplete,
  Checkbox,
} from '../components';
import { formDataSchema } from '../schemas/formData';
import { setUncontrolledFormData } from '../app/store/formDataSlice';
import { useDispatch } from 'react-redux';
import { useFetchCountriesQuery } from '../app/store/countriesAPI';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthIndicator } from '../components/PasswordStrength';

const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const UncontrolledFormPage = () => {
  const { data: countries } = useFetchCountriesQuery({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countryNames = useMemo(() => {
    return countries?.map((country) => country.name) ?? [];
  }, [countries]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    const formData = new FormData(event.currentTarget);

    event.preventDefault();
    const parsedData: Record<string, string | boolean | number | File> = {};
    for (const [key, value] of formData.entries()) {
      if (['terms'].includes(key)) {
        parsedData[key] = value === 'on' ? true : false;
      } else if (['age'].includes(key)) {
        parsedData[key] = Number(value);
      } else {
        parsedData[key] = value;
      }
    }
    try {
      const result = await formDataSchema.validate(parsedData, {
        abortEarly: false,
      });
      dispatch(
        setUncontrolledFormData({
          ...result,
          image: (await fileToBase64(result.image as File)) as string,
        })
      );
      navigate('/');
    } catch (error) {
      const errorsByField = (error as ValidationError).inner.reduce(
        (acc, err) => {
          acc[err.path as string] = err.message;
          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(errorsByField);
    }

    return false;
  };
  return (
    <div className="text-left">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <Input type="text" name="name" label="Name" error={errors.name} />
        <Input type="number" name="age" label="Age" error={errors.age} />
        <Input type="email" name="email" label="E-mail" error={errors.email} />

        <Input
          type="password"
          name="password"
          label="Password"
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        >
          {password && <PasswordStrengthIndicator password={password} />}
        </Input>
        <Input
          type="password"
          name="confirmPswd"
          label="Confirm Password"
          error={errors.confirmPswd}
        />
        <Select
          name="gender"
          label="Gender"
          options={[
            { label: 'Choose your gender' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
          error={errors.gender}
        />

        <ImageUpload
          name="image"
          label="Upload avatar"
          accept="image/png, image/jpeg"
          error={errors.image}
        />
        <Autocomplete
          datalist={countryNames}
          name="country"
          placeholder="Select country"
          error={errors.country}
        />

        <Checkbox
          name="terms"
          labelContent={
            <>
              I agree with the{' '}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                terms and conditions
              </a>
              .
            </>
          }
          error={errors.terms}
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
