import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import {
  changeThemeThunk,
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  resetPasswordThunk,
  verifyResetPasswordThunk,
  verifyUserThunk,
} from './usersOperations';
import type { Animal } from '../animals/animalsApi';

interface User {
  name: string;
  email: string;
  phone?: string;
  userType?: string;
  avatarURL?: string;
  location?: string;
  theme?: 'light' | 'dark';
  favorites: Animal[];
}

export interface UserState {
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
    favorites: [],
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
    selectUser: state => state.user,
    selectUserName: state => state.user.name,
    selectUserEmail: state => state.user.email,
    selectUserPhone: state => state.user.phone,
    selectUserType: state => state.user.userType,
    selectUserTheme: state => state.user.theme,
    selectToken: state => state.token,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectError: state => state.error,
    selectLoading: state => state.isLoading,
    selectFavorites: state => state.user.favorites,
  },
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    updateUserLocally: (state, action: PayloadAction<User>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = false;
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
      })
      .addCase(verifyResetPasswordThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(resetPasswordThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(changeThemeThunk.fulfilled, (state, action) => {
        state.user.theme = action.meta.arg.theme;
      })
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          verifyUserThunk.fulfilled,
          loginThunk.fulfilled,
          logoutThunk.fulfilled,
          refreshThunk.fulfilled,
          forgotPasswordThunk.fulfilled,
          verifyResetPasswordThunk.fulfilled,
          resetPasswordThunk.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          verifyUserThunk.pending,
          loginThunk.pending,
          logoutThunk.pending,
          refreshThunk.pending,
          forgotPasswordThunk.pending,
          verifyResetPasswordThunk.pending,
          resetPasswordThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          verifyUserThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          refreshThunk.rejected,
          forgotPasswordThunk.rejected,
          verifyResetPasswordThunk.rejected,
          resetPasswordThunk.rejected
        ),
        (state, action) => {
          const message = action.payload as string;
          if (!message) return;
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const usersReducer = slice.reducer;
export const { setUserEmail, clearError } = slice.actions;
export const {
  selectUser,
  selectUserName,
  selectUserEmail,
  selectUserPhone,
  selectUserType,
  selectUserTheme,
  selectToken,
  selectIsLoggedIn,
  selectError,
  selectLoading,
  selectFavorites,
} = slice.selectors;
