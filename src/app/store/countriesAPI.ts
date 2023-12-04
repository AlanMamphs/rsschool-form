import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesAPI = createApi({
  reducerPath: 'countriesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1' }),
  endpoints: (builder) => ({
    fetchCountries: builder.query({
      query: () => 'all',
      transformResponse: (
        response: { name: { official: string }; flag: string }[]
      ) => response.map((r) => ({ name: r.name.official, flag: r.flag })),
    }),
  }),
});

export const { useFetchCountriesQuery } = countriesAPI;
