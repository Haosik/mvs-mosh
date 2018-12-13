import http from './httpService';

import { authEndpoint } from '../config.json';

export const login = (email, password) => {
  return http.post(authEndpoint, { email, password });
};

export const logout = () => {
  return http.post(authEndpoint);
};
