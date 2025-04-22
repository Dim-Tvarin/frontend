import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export type animalAge = {
  months: number;
  years: number;
};
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

export interface AnimalsResponse {
  total: number;
  animals: AnimalType[];
}

interface MyAnimalsResponse {
  total: number;
  animals: AnimalType[] | [];
}

interface AnimalById {
  animal: AnimalType;
  ownerName: string;
  ownerPhone: string;
}

export type SortOrder = 'newest' | 'oldest';

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://marketplace-backend-wrk2.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).users?.token;
      if (token && token !== 'null') {
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
        animalType?: string;
        gender?: string;
        breed?: string;
        location?: string;
        age?: string;
        size?: string;
        sortByDate?: SortOrder;
      }
    >({
      query: ({ page = 1, limit = 12, ...params }) => {
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
        );
        const queryString = new URLSearchParams(filteredParams).toString();
        const url = `animals/filter?page=${page}&limit=${limit}&${queryString}`;
        return url;
      },
    }),
    createAnimal: build.mutation<unknown, FormData>({
      query: formData => ({
        url: '/animals',
        method: 'POST',
        body: formData,
      }),
    }),

    getAnimalById: build.query<AnimalById, string>({
      query: id => `animals/${id}`,
    }),
    getMyAnimals: build.query<
      MyAnimalsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 9 }) =>
        `animals/my-animals?page=${page}&limit=${limit}`,
    }),
    addFavoriteAnimal: build.mutation<unknown, string>({
      query: animalId => ({
        url: `/animals/${animalId}/favorite`,
        method: 'PATCH',
        body: { favorite: true },
      }),
    }),
  }),
});

export const {
  useGetAnimalsQuery,
  useCreateAnimalMutation,
  useGetFilteredAnimalsQuery,
  useGetAnimalByIdQuery,
  useGetMyAnimalsQuery,
  useAddFavoriteAnimalMutation,
} = animalsApi;
