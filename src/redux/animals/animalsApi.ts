import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AnimalTypeEnum } from 'pages/Announcement/types';

export type animalAge = {
  months: number;
  years: number;
}
interface AnimalType {
  id: string;
  age: animalAge;
  animalName: string;
  animalType: 'cats' | 'dogs' | 'birds' | 'other';
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
  ownerName: string;
  ownerPhone: string;
}

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://marketplace-backend-wrk2.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).users?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: build => ({
    getAnimals: build.query<AnimalsResponse, { page?: number; limit?: number }>(
      {
        query: ({ page = 1, limit = 12 }) =>
          `animals?page=${page}&limit=${limit}`,
      }
    ),
    getFilteredAnimals: build.query<
      AnimalsResponse,
      {
        page?: number;
        limit?: number;
        animalType?: AnimalTypeEnum;
        gender?: string;
        breed?: string;
        location?: string;
        age?: string;
        size?: string;
      }
    >({
      query: ({ page = 1, limit = 12, ...params }) => {
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
        );
        const queryString = new URLSearchParams(filteredParams).toString();
        const url = `animals/filter?page=${page}&limit=${limit}&${queryString}`;
        return url
      }
        
    }),
    createAnimal: build.mutation<any, FormData>({
      query: formData => ({
        url: '/animals',
        method: 'POST',
        body: formData,
      }),
    }),
    getAnimalById: build.query<AnimalById, string>({
      query: id => `animals/${id}`,
    }),
  }),
});


export const { useGetAnimalsQuery, useGetFilteredAnimalsQuery, useCreateAnimalMutation, useGetAnimalByIdQuery  } = animalsApi