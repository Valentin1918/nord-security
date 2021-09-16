export const getToken = () => localStorage.getItem('token');

export const clearToken = () => localStorage.removeItem('token');

export const setToken = (token: string) => localStorage.setItem('token', token);
