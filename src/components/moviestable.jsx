import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

import Like from './common/like';
import Table from './common/table';

// this.columns: array

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}> {movie.title} </Link> },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} /> }
  ];

  

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push({
        key: 'delete',
        content: movie => (
          <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">
            Delete
          </button>
        )
      });
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />;
  }
}

export default MoviesTable;
