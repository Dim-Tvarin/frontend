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
    return thunkAPI.rejectWithValue(error.message || 'Registration failed');
  }
});

export const loginThunk = createAsyncThunk<
  UsersLoginResponse,
  LoginCredentials
>('login', async (credentials, thunkAPI) => {
  try {
    const { data } = await marketplaceApiUsers.post<UsersLoginResponse>(
      'login',
      credentials
    );
    setToken(data.token);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
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
