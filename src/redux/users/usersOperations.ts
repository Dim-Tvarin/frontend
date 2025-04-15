import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearToken, marketplaceApiUsers, setToken } from '../../api';
import type { RootState } from '../store';
import { AxiosError } from 'axios';

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

interface ErrorResponse {
  message?: string;
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      400: 'Некоректні дані. Перевірте введену інформацію',
      404: 'Сервер не знайдено. Спробуйте пізніше',
      409: 'Цей email вже зайнятий. Будь ласка, оберіть інший',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Register failed'
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      400: 'Невірний формат даних для входу',
      401: 'Невірний імейл або пароль',
      403: 'Користувач не верифікований. Перевірте імейл',
      404: 'Користувача не знайдено. Зареєструйтесь',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Login failed'
    );
  }
});

export const logoutThunk = createAsyncThunk<void, void>(
  'logout',
  async (_, thunkAPI) => {
    try {
      await marketplaceApiUsers.post('logout');
      clearToken();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      const errorMessages: Record<number, string> = {
        401: 'Невірний токен',
        404: 'Користувача не знайдено',
        500: 'Помилка сервера. Спробуйте пізніше',
      };

      return thunkAPI.rejectWithValue(
        error.response?.status
          ? errorMessages[error.response.status]
          : 'Logout failed'
      );
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      401: 'Невірний токен. Будь ласка, увійдіть знову',
      404: 'Користувача не знайдено',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Refresh failed'
    );
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      400: 'Невірний чи недійсний токен, або токен не передано',
      404: 'Користувача не знайдено',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Verification failed'
    );
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      400: 'Введено неправильний формат імейлу',
      404: 'Цей імейл не зареєстрований у нашій системі',
      409: 'Ваш акаунт вже підтверджено',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Verification failed'
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
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      const errorMessages: Record<number, string> = {
        400: 'Код неправильний, спробуйте ще раз',
        500: 'Помилка сервера. Спробуйте пізніше',
      };

      return thunkAPI.rejectWithValue(
        error.response?.status
          ? errorMessages[error.response.status]
          : 'Invalid or expired verification reset code'
      );
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
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;

    const errorMessages: Record<number, string> = {
      400: 'Введено неправильний формат паролю',
      404: 'Користувача не знайдено',
      500: 'Помилка сервера. Спробуйте пізніше',
    };

    return thunkAPI.rejectWithValue(
      error.response?.status
        ? errorMessages[error.response.status]
        : 'Failed to reset password'
    );
  }
});
