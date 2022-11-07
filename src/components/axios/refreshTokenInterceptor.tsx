import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import serverConfig from 'config';

export const getRefresh = async (error: AxiosError) => {
    const accessToken: string = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')! : '';
    const refreshToken:string = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken')! : '';
   
     console.log(error.response)
     if(error.response?.data.error === 'expire_token') {
        let originalRequest = error.config;
        const getAccessToken: any = await axios.get(
            `${serverConfig.SERVER_HOST}/api/auth/refresh`,
            { withCredentials: true, headers:{ Authorization: `Bearer ${accessToken}`, "x-refresh": refreshToken } }
          );
        localStorage.setItem('accessToken', getAccessToken.data.accessToken)

        axios.defaults.headers.common.Authorization = `Bearer ${getAccessToken.data.accessToken}`;
        originalRequest.headers!.Authorization = `Bearer ${getAccessToken.data.accessToken}`;
        return axios(originalRequest);
     }
    
    return error;
  }