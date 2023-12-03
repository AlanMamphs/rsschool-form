import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { countriesAPI } from './countriesAPI';
import formDataReducer from './formDataSlice';
export const createStore = () =>
  configureStore({
    reducer: {
      [countriesAPI.reducerPath]: countriesAPI.reducer,
      formData: formDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesAPI.middleware),
  });

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
