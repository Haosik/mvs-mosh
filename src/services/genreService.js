import http from './httpService';
import { genresEndpoint } from '../config.json';

export function getGenres() {
  return http.get(genresEndpoint);
}

export function getGenreById(id) {
  return http.get(`${genresEndpoint}/${id}`);
}
