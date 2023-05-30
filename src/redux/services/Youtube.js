import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const YoutubeApi = createApi({
  reducerPath: 'YoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-search-results.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_SPOTIFY_API_KEY);
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
