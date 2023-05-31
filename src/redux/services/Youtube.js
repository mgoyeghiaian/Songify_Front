import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const YoutubeApi = createApi({
  reducerPath: 'YoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-search-results.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '5bd6d78fc3mshc553a0b2d3aeb0fp1de3a7jsnf5784f44bb26');
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
