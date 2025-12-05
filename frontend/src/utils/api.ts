import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Keep interceptor as a fallback (some imports may run server-side),
// but also attach token explicitly per-request below for reliability.
try {
  apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
} catch (err) {
  // noop — if Cookies is unavailable during SSR this prevents crashes
}

export const authApi = {
  register: async (username: string, email: string, password: string, firstName?: string, lastName?: string) => {
    const token = Cookies.get('token');
    const response = await apiClient.post(
      '/auth/register',
      {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      },
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  },

  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const token = Cookies.get('token');
    const response = await apiClient.get('/auth/profile', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },
  // Admin / user management
  getAllUsers: async () => {
    const token = Cookies.get('token');
    const response = await apiClient.get('/auth/users', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  getUser: async (id: number) => {
    const token = Cookies.get('token');
    const response = await apiClient.get(`/auth/users/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  updateUser: async (id: number, payload: { username?: string; email?: string; first_name?: string; last_name?: string }) => {
    const token = Cookies.get('token');
    const response = await apiClient.put(`/auth/users/${id}`, payload, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  // Subscriptions
  createSubscription: async (payload: { name: string; amount: number; due_date: string; web_url?: string; description?: string; status?: string }) => {
    const token = Cookies.get('token');
    const response = await apiClient.post('/auth/subscriptions', payload, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  getUserSubscriptions: async () => {
    const token = Cookies.get('token');
    const response = await apiClient.get('/auth/subscriptions', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  getSubscription: async (id: number) => {
    const token = Cookies.get('token');
    const response = await apiClient.get(`/auth/subscriptions/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  updateSubscription: async (id: number, payload: { name?: string; amount?: number; due_date?: string; web_url?: string; description?: string; status?: string }) => {
    const token = Cookies.get('token');
    const response = await apiClient.put(`/auth/subscriptions/${id}`, payload, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },

  deleteSubscription: async (id: number) => {
    const token = Cookies.get('token');
    const response = await apiClient.delete(`/auth/subscriptions/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    return response.data;
  },
};

export default apiClient;
