import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import { SpotifyApi } from './services/Spotify';

export const store = configureStore({
  reducer: {
    [SpotifyApi.reducerPath]: SpotifyApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SpotifyApi.middleware),
});
