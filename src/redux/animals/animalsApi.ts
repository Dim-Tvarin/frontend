import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/' }),
  endpoints: (build) => ({
    getAnimals: build.query<any, string>({
      query: () => `animals`,
    }),
  }),
})


export const { useGetAnimalsQuery } = animalsApi