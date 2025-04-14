import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CityType {
  _id: string;
  name: string;
}

export const addInfoApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/'}),
    reducerPath: 'addInfoApi',
    endpoints: (build) => ({
      getCities: build.query<CityType[], void>({
        query: () => `references/cities`,
      }),
      getAnimaltraits: build.query({
        query: () => '/references/animal-traits'
      })
  })

})

export const { useGetCitiesQuery, useGetAnimaltraitsQuery } = addInfoApi