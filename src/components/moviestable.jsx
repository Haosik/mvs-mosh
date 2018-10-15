import React from 'react';

import MovieRow from './movierow';

const MoviesTable = ({ movies, handleDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
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
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
