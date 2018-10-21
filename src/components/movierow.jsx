import React from 'react';

import Like from './common/like';

const MovieRow = ({ id, title, genre, stock, rate, liked, onDelete, onLike }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <Like liked={liked} onLike={onLike} />
      </td>
      <td>
        <button type="button" onClick={() => onDelete(id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;
