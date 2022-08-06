import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const get = (endpoint: string, config?: AxiosRequestConfig) => {
  return axios.get(endpoint, {
    baseURL: process.env.API_URL,
    ...config,
  });
};
