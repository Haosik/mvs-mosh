import React from 'react';

import Like from './common/like';

const MovieRow = ({ id, title, genre, stock, rate, liked, handleDelete, handleLike }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <Like liked={liked} onLike={handleLike} />
      </td>
      <td>
        <button type="button" onClick={() => handleDelete(id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;
