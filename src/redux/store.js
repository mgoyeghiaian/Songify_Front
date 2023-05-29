import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import { SpotifyApi } from './services/Spotify';
import { YoutubeApi } from './services/Youtube';

export const store = configureStore({
  reducer: {
    [SpotifyApi.reducerPath]: SpotifyApi.reducer,
    [YoutubeApi.reducerPath]: YoutubeApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(SpotifyApi.middleware)
    .concat(YoutubeApi.middleware),
});
