import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type animalAge = {
  months: number;
  years: number;
}
interface AnimalType {
  id: string;
  age: animalAge;
  animalName: string;
  animalType: 'cat' | 'dog' | 'bird' | 'another';
  breed: string;
  gender: 'female' | 'male' | 'unknown';
  animalLocation: string;
  adText: string;
  status: string;
  size?: string;
  favorite: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
  animalImages: string[];
}

interface AnimalsResponse {
  total: number;
  animals: AnimalType[];
}

interface AnimalById {
  animal: AnimalType;
}

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://marketplace-backend-wrk2.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).users?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
   }),
 
  endpoints: (build) => ({
    getAnimals: build.query<AnimalsResponse, {page?: number; limit?: number;}>({
      query: ({page = 1, limit = 10}) => `animals?page=${page}&limit=${limit}`,
    }),
    createAnimal: build.mutation<any, FormData>({
      query: (formData) => ({
        url: '/animals',
        method: 'POST',
        body: formData,
      }),
    }),
    getAnimalById: build.query<AnimalById, string>({
      query: (id) => `animals/${id}`,
    }),

  }),
})


export const { useGetAnimalsQuery, useCreateAnimalMutation, useGetAnimalByIdQuery  } = animalsApi