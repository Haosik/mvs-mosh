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

export const searchRobotsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'CHANGE_USERFIELD':
      return { ...state, userfield: action.payload };
    case 'SOMETHING_ELSE':
      return { ...state, something: action.payload };
    default:
      return state;
  }
};
