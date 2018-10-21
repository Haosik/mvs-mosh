import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';

import MoviesTable from './moviestable';
import Pagination from './common/pagination';
import Filter from './common/filter';
import filterByGenre from '../utils/filterByGenre';

class MoviesInDB extends Component {
  state = {
    movies: [],
    genres: [],
    perPage: 4,
    currentPage: 1,
    currentGenre: ''
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
  handlePageChange = page => {
    if (page !== this.state.currentPage) {
      this.setState({
        currentPage: page
      });
    }
  };
  handleGenreChange = genre => {
    this.handlePageChange(1);
    if (!genre) {
      this.setState({
        currentGenre: ''
      });
      return;
    }
    const currentFilter = this.state.genres.find(elem => elem === genre);
    const currentGenre = currentFilter.name;
    this.setState({
      currentGenre
    });
  };
  componentDidMount = () => {
    this.setState({
      movies: getMovies(),
      genres: getGenres()
    });
  };
  render() {
    const { movies: allMovies, genres, currentGenre, currentPage, perPage } = this.state;
    const filteredMovies = filterByGenre(allMovies, currentGenre);
    const movies = paginate(filteredMovies, currentPage, perPage);
    return (
      <>
        {allMovies.length ? (
          <div className="row">
            <div className="col-sm-2">
              <Filter
                items={genres}
                onFilterChange={this.handleGenreChange}
                currentProperty={currentGenre}
              />
            </div>
            <div className="col">
              <h3>Showing {filteredMovies.length} movies in the database.</h3>
              <MoviesTable
                movies={movies}
                handleDelete={this.handleDelete}
                handleLike={this.handleLike}
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
