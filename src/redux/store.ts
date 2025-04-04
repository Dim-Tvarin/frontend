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
import { animalsApi } from './animals/animalsApi';

const persistConfig = {
  key: 'users',
  version: 1,
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'],
};

export const store = configureStore({
  reducer: {
    users: persistReducer<UserState>(persistConfig, usersReducer),
    dialog: dialogReducer,
    [animalsApi.reducerPath]: animalsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([animalsApi.middleware]),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
