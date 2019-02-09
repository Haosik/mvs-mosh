import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// Base url of all calls to API (from .env)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Handling of all axios requests
axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status > 399 && error.response.status < 500;

  //  Global handling error 500 response or so...
  if (!isExpectedError) {
    logger.log(error);
    console.log(logger.log);
    toast.error('Sorry, unexpected error occured');
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
