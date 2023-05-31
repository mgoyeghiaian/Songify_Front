import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SpotifyApi = createApi({
  reducerPath: 'SpotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '5bd6d78fc3mshc553a0b2d3aeb0fp1de3a7jsnf5784f44bb26');
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

    getSongADetails: builder.query({
      query: ({ songid }) => ({
        url: '/songs/v2/get-details',
        params: {
          id: songid,
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

    getSearchDetails: builder.query({
      query: (searchTerm) => ({
        url: '/search',
        params: {
          term: `${searchTerm}`,
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
  useGetSongADetailsQuery,
  useGetSearchDetailsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetRelatedSongsQuery,
} = SpotifyApi;
