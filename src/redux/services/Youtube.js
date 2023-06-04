import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const YoutubeApi = createApi({
  reducerPath: 'YoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://youtube-search-results.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '289a97682cmsh4e2757277a78a89p188ecajsne6a91c39e6d7');
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
