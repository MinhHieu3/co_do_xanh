import { DEFAULT_ORDER_API } from '../../data/business';

const baseUrl = (import.meta.env.VITE_API_URL?.trim() || DEFAULT_ORDER_API).replace(/\/+$/, '');

export const fetchApi = (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers = new Headers(options.headers);
  if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  return fetch(`${baseUrl}${endpoint}`, { ...options, headers });
};
