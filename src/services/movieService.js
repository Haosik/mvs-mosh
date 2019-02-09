import http from './httpService';
const moviesEndpoint = '/movies';

function movieUrl(id) {
  return `${moviesEndpoint}/${id}`;
}

export const getMovies = () => {
  return http.get(moviesEndpoint);
};

export const getMovie = id => {
  return http.get(movieUrl(id));
};

export const saveMovie = movie => {
  if (movie._id) {
    const movieBody = { ...movie };
    delete movieBody._id;
    return http.put(movieUrl(movie._id), movieBody);
  }
  return http.post(moviesEndpoint, movie);
};

export const deleteMovie = id => {
  return http.delete(movieUrl(id));
};
