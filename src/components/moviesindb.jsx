import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

import MoviesTable from './moviestable';
import Pagination from './common/pagination';

class MoviesInDB extends Component {
  state = {
    movies: [],
    perPage: 4,
    pagesTotal: 1,
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
        currentPage: page
      });
    }
  };
  componentDidMount = () => {
    this.setState({ movies: getMovies() }, () => {
      this.setState({
        pagesTotal: Math.ceil(this.state.movies.length / this.state.perPage)
      });
    });
  };
  render() {
    let { movies, pagesTotal, currentPage } = this.state;
    console.log('Pages total', this.state.pagesTotal);
    return (
      <>
        {movies.length ? (
          <>
            <h3>Showing {movies.length} movies in the database.</h3>
            <MoviesTable
              movies={movies}
              handleDelete={this.handleDelete}
              handleLike={this.handleLike}
            />
            {pagesTotal > 1 && (
              <Pagination
                onPageChange={this.handlePageChange}
                pagesTotal={pagesTotal}
                currentPage={currentPage}
              />
            )}
          </>
        ) : (
          <h4>There are no movies in the database</h4>
        )}
      </>
    );
  }
}

export default MoviesInDB;
