import React, { Component } from 'react';

import MovieRow from './movierow';

class MoviesTable extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      if (sortColumn.order === 'asc') {
        sortColumn.order = 'desc';
      } else {
        sortColumn.order = 'asc';
      }
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')}>Title</th>
            <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
            <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
            <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
            <th>Liked</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <MovieRow
              key={movie._id}
              id={movie._id}
              title={movie.title}
              genre={movie.genre.name}
              stock={movie.numberInStock}
              rate={movie.dailyRentalRate}
              liked={movie.liked}
              onDelete={onDelete}
              onLike={() => onLike(movie)}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
