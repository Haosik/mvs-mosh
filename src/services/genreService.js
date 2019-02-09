import http from './httpService';

const genresEndpoint = '/genres';

export function getGenres() {
  return http.get(genresEndpoint);
}

export function getGenreById(id) {
  return http.get(`${genresEndpoint}/${id}`);
}
