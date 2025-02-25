import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const marketplaceApi: AxiosInstance = axios.create({
  baseURL: 'https://marketplace-backend-wrk2.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
