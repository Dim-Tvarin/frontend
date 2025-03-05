import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, marketplaceApiUsers, setToken } from '../../api';

interface RegisterCredentials {
  name: string;
  phone: string;
  email: string;
  password: string;
  location: string;
  repeat_password: string;
  userType: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}

interface UsersRegisterResponse {
  user: {
    name: string;
    email: string;
    phone: string;
    userType: string;
  };
}
interface UsersLoginResponse {
  user: {
    name: string;
    email: string;
    userType: string;
    avatarURL: string;
    theme: 'light' | 'dark';
  };
  token: string;
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
