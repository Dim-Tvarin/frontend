import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  verifyUserThunk,
} from './usersOperations';

interface User {
  name: string;
  email: string;
  phone?: string;
  userType?: string;
  avatarURL?: string;
  location?: string;
  theme?: 'light' | 'dark';
}

interface UserState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    phone: '',
    userType: '',
    avatarURL: '',
    location: '',
    theme: 'light',
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'users',
  initialState,
  selectors: {
    selectUserName: state => state.user.name,
    selectUserType: state => state.user.userType,
    selectUserTheme: state => state.user.theme,
    selectToken: state => state.token,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectError: state => state.error,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(verifyUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        Object.assign(state, initialState);
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      });
  },
});

export const usersReducer = slice.reducer;
export const {
  selectUserName,
  selectUserType,
  selectUserTheme,
  selectToken,
  selectIsLoggedIn,
  selectError,
} = slice.selectors;
