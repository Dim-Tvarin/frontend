import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  resetPasswordThunk,
  verifyResetPasswordThunk,
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
          forgotPasswordThunk.rejected,
          verifyResetPasswordThunk.rejected,
          resetPasswordThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
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
