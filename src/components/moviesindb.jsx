import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

import MoviesTable from './moviestable';
import Pagination from './common/pagination';

class MoviesInDB extends Component {
  state = {
    movies: [],
    perPage: 4,
    currentPage: 1
  };
  handleDelete = id => {
    const { movies } = this.state;
    const newMovies = [...movies].filter(newMovie => newMovie._id !== id);
    this.setState({ movies: newMovies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...this.state.movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies }, () => {
      console.log(this.state.movies);
    });
  };
  handlePageChange = page => {
    if (page !== this.state.currentPage) {
      this.setState({
        currentPage: page,
      });
    }
  };
  componentDidMount = () => {
    this.setState(
      {
        movies: getMovies()
      }
    );
  };
  render() {
    let { movies: allMovies, currentPage, perPage } = this.state;
    const movies = paginate(allMovies, currentPage, perPage);
    return (
      <>
        {allMovies.length ? (
          <>
            <h3>Showing {allMovies.length} movies in the database.</h3>
            <MoviesTable
              movies={movies}
              handleDelete={this.handleDelete}
              handleLike={this.handleLike}
            />
            <Pagination
              itemsTotal={allMovies.length}
              onPageChange={this.handlePageChange}
              perPage={perPage}
              currentPage={currentPage}
            />
          </>
        ) : (
          <h4>There are no movies in the database</h4>
        )}
      </>
    );
  }
}

export default MoviesInDB;
