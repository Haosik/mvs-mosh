import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/genres';

export async function getGenres() {
  const { data: genres } = await http.get(apiEndpoint);
  return genres;
}

export async function getGenreById(id) {
  const { data: genre } = await http.get(`${apiEndpoint}/${id}`);
  return genre;
}
