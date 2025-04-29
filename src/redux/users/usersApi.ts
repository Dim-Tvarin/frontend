import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  avatarURL: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://marketplace-backend-wrk2.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).users.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    updateUser: builder.mutation<
      { message: string; user: User },
      { userData: object; avatar?: File }
    >({
      query: ({ userData, avatar }) => {
        const formData = new FormData();
        formData.append('userData', JSON.stringify(userData));
        if (avatar) formData.append('avatar', avatar);

        return {
          url: 'users/update',
          method: 'PATCH',
          body: formData,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch({
            type: 'users/updateUserLocally',
            payload: data.user,
          });
        } catch (err) {
          console.error('Не вдалося оновити користувача:', err);
        }
      },
    }),
  }),
});

export const { useUpdateUserMutation } = usersApi;
