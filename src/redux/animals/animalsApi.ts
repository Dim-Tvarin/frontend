import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type animalAge = {
  months: number;
  years: number;
}
interface AnimalType {
      "id": string;
      "age": animalAge;
      "animalName": string;
      "animalType": 'cat' |'dog' | 'bird' |'another';
      "breed": string;
      "gender": "female" | "male" | 'unknown';
      "animalLocation": string;
      "adText": string;
      "status":  string;
      "favorite": boolean;
      "owner":  string;
      "createdAt":  string;
      "updatedAt": string;
      "animalImages": string[];
}

interface AnimalsResponse {
  total: number;
  animals: AnimalType[];
}

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/' }),
  endpoints: (build) => ({
    getAnimals: build.query<AnimalsResponse, {page?: number; limit?: number;}>({
      query: ({page = 1, limit = 10}) => `animals?page=${page}&limit=${limit}`,
    }),
  }),
})


export const { useGetAnimalsQuery } = animalsApi