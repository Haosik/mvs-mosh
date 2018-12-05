import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import _ from 'lodash';

import MoviesTable from './moviestable';
import Pagination from './common/pagination';
import ListGroup from './common/ListGroup';
import SearchBar from './searchBar';

class MoviesInDB extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    perPage: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };
  handleDelete = movie => {
    deleteMovie(movie._id);
    const movies = [...this.state.movies].filter(newMovie => newMovie !== movie);
    this.setState({ movies });
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
  handleSearch = query => {
    this.setState({
      currentGenre: null,
      currentPage: 1,
      searchQuery: query
    });
  };
  handleGenreChange = genre => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchQuery: ''
    });
  };
  getPagedData = allMovies => {
    const { currentGenre, currentPage, perPage, sortColumn, searchQuery } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (currentGenre && currentGenre._id) {
      filteredMovies = allMovies.filter(movie => movie.genre._id === currentGenre._id);
    }

    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, perPage);
    return { data: movies, totalCount: filteredMovies.length };
  };
  async componentDidMount() {
    const moviesFromApi = await getMovies();
    const genresFromApi = await getGenres();
    const defaultGenre = { _id: '', name: 'All Genres' };
    const genres = [defaultGenre, ...genresFromApi];


    this.setState({
      movies: moviesFromApi,
      genres,
      currentGenre: defaultGenre
    });
  }
  render() {
    const { movies: allMovies, genres, currentGenre, sortColumn, perPage, currentPage } = this.state;

    const { data: movies, totalCount } = this.getPagedData(allMovies);

    return (
      <div className="container">
        {allMovies.length ? (
          <div className="row">
            <div className="col-sm-2">
              <ListGroup items={genres} onItemSelect={this.handleGenreChange} currentProperty={currentGenre} />
            </div>
            <div className="col">
              <Link to="/movies/new" className="btn btn-primary btn-lg mb-3">
                New Movie
              </Link>
              <h4>Showing {totalCount} movies in the database.</h4>
              <SearchBar data={allMovies} onSearch={this.handleSearch} value={this.state.searchQuery} />
              <MoviesTable
                movies={movies}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemsTotal={totalCount}
                onPageChange={this.handlePageChange}
                perPage={perPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        ) : (
          <h4>There are no movies in the database</h4>
        )}
      </div>
    );
  }
}

export default MoviesInDB;
