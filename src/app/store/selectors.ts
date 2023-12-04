import { useSelector } from 'react-redux';
import { RootState } from '.';

export const useFormDataSelector = () =>
  useSelector((state: RootState) => state.formData.formData);
