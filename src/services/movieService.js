import http from './httpService';
import { moviesUrl } from '../config.json';

export const getMovies = () => {
  return http.get(moviesUrl);
};

export const getMovie = id => {
  return http.get(`${moviesUrl}/${id}`);
};

export const saveMovie = movie => {
  if (movie._id) {
    const movieId = movie._id;
    delete movie._id;
    return http.put(`${moviesUrl}/${movieId}`, movie);
  }
  return http.post(moviesUrl, movie);
};

export const deleteMovie = id => {
  return http.delete(`${moviesUrl}/${id}`);
};
