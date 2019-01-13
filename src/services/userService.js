import http from './httpService';
import { usersEndpoint } from '../config.json';

export const register = user => {
  return http.post(usersEndpoint, {
    email: user.username,
    name: user.name,
    password: user.password
  });
};

export const loginUser = () => {};

export const deleteUser = () => {};
