import http from './httpService';

import { authEndpoint } from '../config.json';

export const login = async (email, password) => {
  const { data: jwt } = await http.post(authEndpoint, { email, password });
  localStorage.setItem('token', jwt);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default {
  login,
  logout
};
