import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const marketplaceApiUsers: AxiosInstance = axios.create({
  baseURL: 'https://marketplace-backend-wrk2.onrender.com/api/users/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string): void => {
  marketplaceApiUsers.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = (): void => {
  delete marketplaceApiUsers.defaults.headers.common.Authorization;
};
