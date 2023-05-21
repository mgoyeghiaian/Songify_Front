import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SpotifyApi = createApi({
  reducerPath: 'SpotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'bd7d322739mshf24a1b14cb6b67ap173692jsnd222054ae47f');
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getTopCharts: builder.query({
      query: (selectedGenre) => ({
        url: '/charts/track',
        params: {
          pageSize: '20',
          startFrom: '0',
          listId: selectedGenre,

        },
      }),
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => ({
        url: '/songs/get-details',
        params: {
          key: songid,
        },
      }),
    }),
    getRelatedSongs: builder.query({
      query: ({ songid }) => ({
        url: '/shazam-songs/list-similarities',
        params: {
          id: `track-similarities-id-${songid}`,
        },
      }),
    }),
    getArtistDetails: builder.query({
      query: (artiatId) => ({
        url: '/artists/get-summary',
        params: {
          id: `${artiatId}`,
        },
      }),
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => ({
        url: '/charts/track',
        params: {
          listId: `ip-country-chart-${countryCode}`,
        },
      }),
    }),

    getsongsGenre: builder.query({
      query: () => ({
        url: '/charts/list',
      }),
    }),
  }),

});

export const {
  useGetsongsGenreQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetRelatedSongsQuery,
} = SpotifyApi;
