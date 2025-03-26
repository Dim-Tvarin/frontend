import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, marketplaceApiUsers, setToken } from '../../api';
import type { RootState } from '../store';

interface RegisterCredentials {
  name: string;
  phone: string;
  email: string;
  password: string;
  location: string;
  repeat_password: string;
  userType: 'guardian' | 'adopter';
}
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  userType: 'guardian' | 'adopter';
  avatarURL?: string;
  location?: string;
  theme?: 'light' | 'dark';
}

interface UsersRegisterResponse {
  user: User;
}

interface UsersLoginResponse {
  user: User;
  token: string;
}

interface UsersRefreshResponse {
  user: User;
}

interface UsersVerificationResponse {
  user: User;
  token: string;
  message: string;
}

interface ResetPasswordCredentials {
  password: string;
  repeat_password: string;
}

export const registerThunk = createAsyncThunk<
  UsersRegisterResponse,
  RegisterCredentials
>('register', async (credentials, thunkAPI) => {
  try {
    const { data } = await marketplaceApiUsers.post<UsersRegisterResponse>(
      'register',
      credentials
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.status === 409
        ? 'Цей email вже зайнятий. Будь ласка, оберіть інший'
        : error.message || 'Registration failed'
    );
  }
});

export const loginThunk = createAsyncThunk<
  UsersLoginResponse,
  LoginCredentials
>('login', async (credentials, thunkAPI) => {
  try {
    const { data } = await marketplaceApiUsers.post<UsersVerificationResponse>(
      'login',
      credentials
    );
    setToken(data.token);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.status === 401
        ? 'Не вірний email або пароль. Будь ласка, спробуйте знов'
        : error.message || 'Login failed'
    );
  }
});

export const logoutThunk = createAsyncThunk<void, void>(
  'logout',
  async (_, thunkAPI) => {
    try {
      await marketplaceApiUsers.post('logout');
      clearToken();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const refreshThunk = createAsyncThunk<
  UsersRefreshResponse,
  void,
  { state: RootState }
>('refresh', async (_, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).users.token;

  if (!token) {
    return thunkAPI.rejectWithValue('Token does not exist');
  }

  setToken(token);

  try {
    const { data } =
      await marketplaceApiUsers.get<UsersRefreshResponse>('current');
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Refresh failed');
  }
});

export const verifyUserThunk = createAsyncThunk<
  UsersVerificationResponse,
  string
>('verify', async (verificationToken, thunkAPI) => {
  try {
    const { data } = await marketplaceApiUsers.get<UsersVerificationResponse>(
      `verify/${verificationToken}`
    );

    setToken(data.token);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Verification failed');
  }
});

export const forgotPasswordThunk = createAsyncThunk<
  { message: string },
  string
>('forgotPassword', async (email, thunkAPI) => {
  try {
    const { data } = await marketplaceApiUsers.post<{ message: string }>(
      'forgot-password',
      { email }
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || 'Failed to send reset code'
    );
  }
});

export const verifyResetPasswordThunk = createAsyncThunk(
  'users/verifyResetPassword',
  async ({ resetPasswordCode }: { resetPasswordCode: string }, thunkAPI) => {
    try {
      const { data } = await marketplaceApiUsers.post('reset-password', {
        resetPasswordCode,
      });
      setToken(data.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.status === 400
          ? 'Не вірний код підтвердження або час дії його минув'
          : error.message || 'Invalid or expired verification reset code'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk<
  { message: string },
  ResetPasswordCredentials
>('resetPassword', async (credentials, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).users.token;

  if (!token) {
    return thunkAPI.rejectWithValue('Token does not exist');
  }

  setToken(token);
  try {
    const { data } = await marketplaceApiUsers.patch<{ message: string }>(
      'reset-password',
      credentials,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || 'Failed to reset password'
    );
  }
});
