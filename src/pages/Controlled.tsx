import { useMemo } from 'react';
import {
  Input,
  Select,
  ImageUpload,
  Autocomplete,
  Checkbox,
  SubmitButton,
} from '../components';
import {
  FormDataType,
  formDataSchema,
  useYupValidationResolver,
} from '../schemas';
import { setControlledFormData } from '../app/store/formDataSlice';
import { useDispatch } from 'react-redux';
import { useFetchCountriesQuery } from '../app/store/countriesAPI';
import { useForm, Controller } from 'react-hook-form';
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

export const ControlledFormPage = () => {
  const navigate = useNavigate();
  const { data: countries } = useFetchCountriesQuery({});
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(formDataSchema);
  const { handleSubmit, control, formState } = useForm<FormDataType>({
    resolver,
    mode: 'onBlur',
  });

  const countryNames = useMemo(() => {
    return countries?.map((country) => country.name) ?? [];
  }, [countries]);

  const handleValidSubmit = async (formData: FormDataType) => {
    dispatch(
      setControlledFormData({
        ...formData,
        image: (await fileToBase64(formData.image as File)) as string,
      })
    );
    navigate('/');
  };

  const formStatus = useMemo(() => {
    if (formState.isDirty) return 'dirty';
    if (formState.isLoading || formState.isSubmitting) return 'loading';

    if (!formState.isValid || formState.disabled) return 'disabled';

    if (!!formState.errors) return 'failure';

    return 'valid';
  }, [formState]);

  return (
    <div className="text-left">
      <form
        className="max-w-sm mx-auto"
        onSubmit={handleSubmit(handleValidSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input type="text" label="Name" error={error} {...field} />
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              label="Age"
              pattern="[0-9]*"
              error={error}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input type="email" label="E-mail" error={error} {...field} />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input type="password" label="Password" error={error} {...field}>
              {field.value && (
                <PasswordStrengthIndicator password={field.value} />
              )}
            </Input>
          )}
        />

        <Controller
          name="confirmPswd"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="password"
              label="Confirm Password"
              error={error}
              {...field}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="Gender"
              options={[
                { label: 'Choose your gender' },
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]}
              error={error}
              {...field}
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <ImageUpload
              label="Upload avatar"
              accept="image/png, image/jpeg"
              error={error}
              onChange={(e) => onChange(e.target.files?.[0])}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              datalist={countryNames}
              placeholder="Select country"
              {...field}
              error={error}
            />
          )}
        />

        <Controller
          name="terms"
          control={control}
          render={({
            field: { value, ...fieldProps },
            fieldState: { error },
          }) => (
            <Checkbox
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
              value={value as unknown as string}
              {...fieldProps}
              error={error}
            />
          )}
        />

        <SubmitButton state={formStatus} />
      </form>
    </div>
  );
};
