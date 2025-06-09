import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://marketplace-backend-wrk2.onrender.com/',
  }),
  endpoints: builder => ({
    sendFeedback: builder.mutation<void, { email: string; feedback: string }>({
      query: body => ({
        url: 'feedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendFeedbackMutation } = feedbackApi;
