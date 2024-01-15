import axios from 'axios';

const api = axios.create({
  baseURL: process.env.SERVER_DOMAIN, 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        window.location.href = '/login';
      }

      if (status === 403) {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
