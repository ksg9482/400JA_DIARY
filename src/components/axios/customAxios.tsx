import axios, { AxiosInstance } from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken';
import { getRefresh } from './refreshTokenInterceptor';

const token: string = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : '';
const refreshToken: string = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken')! : '';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${config.SERVER_HOST}/api`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${token}`, "x-refresh": refreshToken }
});

customAxios.interceptors.response.use(
  reponse => { return reponse },
  error => { return getRefresh(error) }
);