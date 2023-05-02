import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SpotifyApi = createApi({
  reducerPath: 'SpotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',

    // prepareParams: (params) = {
    //   params.set("ids", '4WNcduiCmDNfmTEz7JvmLv');
    //   return params;
    // },
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '2982106e69msh54c49b08c7cbc2ap185b2cjsnfb0fbbd3b6cc');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/charts/track',
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
    }),
  }),
});
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
} = SpotifyApi;
