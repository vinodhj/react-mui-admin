export const getToken: () => string = () => localStorage.getItem('access_token') ?? '';
