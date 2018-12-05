import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/movies';

export const getMovies = async () => {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
};

export const getMovie = async id => {
  const { data: movie } = await http.get(`${apiEndpoint}/${id}`);
  return movie;
};

export const saveMovie = async movie => {
  if (movie._id) {
    const movieId = movie._id;
    delete movie._id;
    const { data: updatedMovie } = await http.put(`${apiEndpoint}/${movieId}`, movie);
    return updatedMovie;
  }
  const { data: savedMovie } = await http.post(apiEndpoint, movie);
  return savedMovie;
};

export const deleteMovie = async id => {
  let movieInDb = await http.delete(`${apiEndpoint}/${id}`);
  return movieInDb;
};
