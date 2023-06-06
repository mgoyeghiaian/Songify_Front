import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const YoutubeApi = createApi({
  reducerPath: 'YoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-search-results.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '6cda817cf5msh39f1af9669028c2p1fdb0djsnde344d6cf49d');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getYoutubeDetails: builder.query({
      query: ({ artistName, artistGenre }) => ({
        url: '/youtube-search/',
        params: {
          q: `${artistName} + ${artistGenre}`,
        },
      }),
    }),
  }),
});

export const { useGetYoutubeDetailsQuery } = YoutubeApi;
