// src/api/board-service.js
import axiosBase from '@/apis/base/axiosBase';
import AxiosBase from '@/apis/base/axiosBase';
import axios from 'axios';

const apiClient = axiosBase;

const AUTH_URL = '/Authentication';


export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post(`${AUTH_URL}/login`, { email, password });
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await apiClient.post(`${AUTH_URL}/register`, { email, password });
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await apiClient.post(`${AUTH_URL}/forgot-password`, { email });
    return response.data;
  },
  logout: async () => {
    return true;
  },
};