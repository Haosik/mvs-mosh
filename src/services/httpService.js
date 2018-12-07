import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

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

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
