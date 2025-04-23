import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnimalType } from 'pages/Announcement/types';

interface CityType {
  _id: string;
  name: string;
}

export interface AnimalTrait {
  breed: string;
  size: string;
  weight: string;
  coat: string;
  _id: string;
}

export interface TraitsRequest {
  [AnimalType.cats]: AnimalTrait[];
  [AnimalType.dogs]: AnimalTrait[];
  [AnimalType.birds]: AnimalTrait[];
  [AnimalType.other]: string;
}


export const addInfoApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/'}),
    reducerPath: 'addInfoApi',
    endpoints: (build) => ({
      getCities: build.query<CityType[], void>({
        query: () => `references/cities`,
      }),
      getAnimaltraits: build.query<TraitsRequest, void>({
        query: () => '/references/animal-traits'
      })
  })

})

export const { useGetCitiesQuery, useGetAnimaltraitsQuery } = addInfoApi