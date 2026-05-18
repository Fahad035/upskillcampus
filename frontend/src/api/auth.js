import apiClient from './apiClient';

export const registerUser = (payload) => apiClient.post('/auth/register', payload);
export const loginUser = (payload) => apiClient.post('/auth/login', payload);
export const getProfile = () => apiClient.get('/auth/profile');
export const forgotPassword = (payload) => apiClient.post('/auth/forgot-password', payload);
export const resetPassword = (token, payload) => apiClient.post(`/auth/reset-password?token=${token}`, payload);