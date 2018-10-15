import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import MoviesTable from './moviestable';

class MoviesInDB extends Component {
  state = {
    movies: []
  };
  handleDelete = id => {
    const { movies } = this.state;
    const newMovies = [...movies].filter(newMovie => newMovie._id !== id);
    this.setState({ movies: newMovies });
  };
  componentDidMount = () => {
    this.setState({ movies: getMovies() });
  };
  render() {
    let { movies } = this.state;
    return (
      <>
        {movies.length ? (
          <>
            <h3>Showing {movies.length} movies in the database.</h3>
            <MoviesTable movies={movies} handleDelete={this.handleDelete} />
          </>
        ) : (
          <h4>There are no movies in the database</h4>
        )}
      </>
    );
  }
}

export default MoviesInDB;
