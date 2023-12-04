import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataType } from '../../schemas/formData';
import * as uuid from 'uuid';

export enum FormType {
  'uncontrolled' = 'Uncontrolled',
  'controlled' = 'Controlled',
}
type State = {
  formData: ({
    type: FormType;
    id: string;
    isNew: boolean;
  } & FormDataType)[];
};

const initialState: State = {
  formData: [],
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formData = [
        {
          type: FormType.uncontrolled,
          id: uuid.v4(),
          ...action.payload,
          isNew: true,
        },
        ...state.formData.map((data) => ({ ...data, isNew: false })),
      ];
    },
    setControlledFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formData = [
        {
          type: FormType.controlled,
          id: uuid.v4(),
          ...action.payload,
          isNew: true,
        },
        ...state.formData.map((data) => ({ ...data, isNew: false })),
      ];
    },
  },
});

export const { setControlledFormData, setUncontrolledFormData } =
  formDataSlice.actions;

export default formDataSlice.reducer;
