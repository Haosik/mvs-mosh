import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/movies';

export const getMovies = () => {
  return http.get(apiEndpoint);
};

export const getMovie = id => {
  return http.get(`${apiEndpoint}/${id}`);
};

export const saveMovie = movie => {
  if (movie._id) {
    const movieId = movie._id;
    delete movie._id;
    return http.put(`${apiEndpoint}/${movieId}`, movie);
  }
  return http.post(apiEndpoint, movie);
};

export const deleteMovie = id => {
  return http.delete(`${apiEndpoint}/${id}`);
};
