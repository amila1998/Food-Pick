// axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store token globally (optional: better to use redux or context in real app)
let accessToken: string | null = null;

export const setAuthToken = async (token: string | null) => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response || {};
    if (status === 403 || status === 401) {
      // Handle token expiration or unauthorized access
    }
    return Promise.reject(error);
  }
);

/**
 * Helper function to handle multipart/form-data requests
 */
export const uploadFile = (url: string, files: any[]) => {
  return axiosInstance.post(url, files, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default axiosInstance;
