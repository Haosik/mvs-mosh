import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

import MoviesTable from './moviestable';
import Pagination from './common/pagination';
import ListGroup from './common/ListGroup';

class MoviesInDB extends Component {
  state = {
    movies: [],
    genres: [],
    perPage: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
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
    this.setState({ movies });
  };
  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };
  handlePageChange = page => {
    if (page !== this.state.currentPage) {
      this.setState({
        currentPage: page
      });
    }
  };
  handleGenreChange = genre => {
    this.setState({
      currentGenre: genre,
      currentPage: 1
    });
  };
  componentDidMount = () => {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres
    });
  };
  render() {
    const { movies: allMovies, genres, currentGenre, currentPage, perPage, sortColumn } = this.state;
    const filteredMovies =
      currentGenre && currentGenre._id ? allMovies.filter(movie => movie.genre._id === currentGenre._id) : allMovies;
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, perPage);
    return (
      <>
        {allMovies.length ? (
          <div className="row">
            <div className="col-sm-2">
              <ListGroup items={genres} onItemSelect={this.handleGenreChange} currentProperty={currentGenre} />
            </div>
            <div className="col">
              <h3>Showing {filteredMovies.length} movies in the database.</h3>
              <MoviesTable
                movies={movies}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsTotal={filteredMovies.length}
                onPageChange={this.handlePageChange}
                perPage={perPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        ) : (
          <h4>There are no movies in the database</h4>
        )}
      </>
    );
  }
}

export default MoviesInDB;
