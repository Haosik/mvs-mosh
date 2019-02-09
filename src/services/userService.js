import http from './httpService';

const usersEndpoint = '/users';

export const register = user => {
  return http.post(usersEndpoint, {
    email: user.username,
    name: user.name,
    password: user.password
  });
};

export const loginUser = () => {};

export const deleteUser = () => {};
