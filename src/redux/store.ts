import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/usersSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { Persistor } from 'redux-persist';
import { dialogReducer } from './dialogs/dialogSlice';
import { type UserState } from './users/usersSlice';
import {
  favoriteAnimalsReducer,
  type FavoriteAnimalsState,
} from './animals/favoriteAnimalsSlice.ts';
import { addInfoApi } from './animals/addInfoApi.ts';
import { animalsApi } from './animals/animalsApi.ts';
import { usersApi } from './users/usersApi.ts';

const persistConfig = {
  key: 'users',
  version: 1,
  storage,
};

const persistConfigFavoriteAnimals = {
  key: 'favoriteAnimals',
  storage,
  whitelist: ['ids'],
};

export const store = configureStore({
  reducer: {
    users: persistReducer<UserState>(persistConfig, usersReducer),
    [usersApi.reducerPath]: usersApi.reducer,
    dialog: dialogReducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
    favoriteAnimals: persistReducer<FavoriteAnimalsState>(
      persistConfigFavoriteAnimals,
      favoriteAnimalsReducer
    ),
    [addInfoApi.reducerPath]: addInfoApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      animalsApi.middleware,
      addInfoApi.middleware,
      usersApi.middleware,
    ]),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
