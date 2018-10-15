import React from 'react';

const MovieRow = ({ id, title, genre, stock, rate, handleDelete }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <button type="button" onClick={() => handleDelete(id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;
