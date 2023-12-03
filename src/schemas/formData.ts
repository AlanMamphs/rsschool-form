import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

interface FileObject {
  size: number;
  type: string;
}

export const formDataSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Z][a-z]*$/,
      'Name should start with an uppercase letter and should be valid'
    )
    .required('Name is required'),

  age: yup
    .number()
    .positive('Age should be a positive number')
    .integer('Age should be a whole number')
    .required('Age is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup
    .string()
    .min(8)
    .minLowercase(1)
    .minUppercase(1)
    .minSymbols(1)
    .minNumbers(1),

  confirmPswd: yup
    .string()
    .oneOf([yup.ref('password'), 'null'], 'Passwords must match')
    .required('Confirm Password is required'),

  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other']),

  terms: yup
    .boolean()
    .required('Please accept the terms and conditions')
    .oneOf([true], 'Please accept the terms and conditions'),

  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'File size is too large (1MB max)', (value) => {
      if (!value) return false;

      return (value as FileObject).size <= 1024000; // 1 MB
    })
    .test('fileType', 'Invalid file type', (value) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes((value as FileObject).type);
    }),

  country: yup.string().required('Country is required'),
});

export type FormDataType = yup.InferType<typeof formDataSchema>;
