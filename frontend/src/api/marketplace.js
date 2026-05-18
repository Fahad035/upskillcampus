import apiClient from './apiClient';

export const getMerchants = () => apiClient.get('/merchants');
export const getMerchant = (merchantId) => apiClient.get(`/merchants/${merchantId}`);
export const getMyOrders = () => apiClient.get('/orders/my');
export const getOrderById = (orderId) => apiClient.get(`/orders/${orderId}`);
export const getCart = () => apiClient.get('/cart');
export const addToCart = (payload) => apiClient.post('/cart/add', payload);
export const checkoutCart = () => apiClient.post('/cart/checkout');
export const createPaidOrder = (payload) => apiClient.post('/orders/paid', payload);
export const getMerchantReviews = (merchantId) => apiClient.get(`/reviews/${merchantId}`);
export const getMerchantRating = (merchantId) => apiClient.get(`/reviews/rating/${merchantId}`);
export const createReview = (payload) => apiClient.post('/reviews', payload);