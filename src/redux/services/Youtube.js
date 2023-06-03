import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const YoutubeApi = createApi({
  reducerPath: 'YoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-search-results.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'a407dc5433mshc46facaffc4557ep17591djsnf5cf7b559f7e');
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
