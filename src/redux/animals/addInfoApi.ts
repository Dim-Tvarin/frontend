import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CityType {
  _id: string;
  idArea: string;
  idCity: string;
  name: string;
}

export const addInfoApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/'}),
    reducerPath: 'addInfoApi',
    endpoints: (build) => ({
      getCities: build.query<CityType[], void>({
      query: () => `references/cities`,
    }),
  })

})

export const { useGetCitiesQuery } = addInfoApi