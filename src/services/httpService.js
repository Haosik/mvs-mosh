import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const isExpectedError = error.response && error.response.status > 399 && error.response.status < 500;

  // if 500 response or so...
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
