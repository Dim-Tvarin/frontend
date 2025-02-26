import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, marketplaceApiUsers, setToken } from 'src/api';

interface Credentials {
  email: string;
  password: string;
}

interface UsersResponse {
  user: {
    name: string;
    email: string;
    userType: string;
    avatarURL: string;
    theme: 'light' | 'dark';
  };
  token: string;
}

export const registerThunk = createAsyncThunk<UsersResponse, Credentials>(
  'register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await marketplaceApiUsers.post<UsersResponse>(
        'register',
        credentials
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const loginThunk = createAsyncThunk<UsersResponse, Credentials>(
  'login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await marketplaceApiUsers.post<UsersResponse>(
        'login',
        credentials
      );
      setToken(data.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

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
