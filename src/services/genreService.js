import http from './httpService';
import { genresUrl } from '../config.json';

export function getGenres() {
  return http.get(genresUrl);
}

export function getGenreById(id) {
  return http.get(`${genresUrl}/${id}`);
}
