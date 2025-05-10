import axios from "axios";


const axiosBase = axios.create({
  baseURL: 'https://localhost:44396/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosBase;