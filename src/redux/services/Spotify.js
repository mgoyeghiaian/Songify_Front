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
      headers.set('X-RapidAPI-Key', 'd6324640d1msh378a1ba9cd425e3p1f4fe4jsna8c3ffc48600');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/charts/track'
      ,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: ({ songid }) => `/list-similarities?id=track-similarities-id-${songid}`,
    }),
  }),
});
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} = SpotifyApi;
