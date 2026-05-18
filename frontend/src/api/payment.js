import apiClient from './apiClient';

export const createPaymentOrder = (payload) => apiClient.post('/payment/create-order', payload);
export const verifyPayment = (payload) => apiClient.post('/payment/verify', payload);