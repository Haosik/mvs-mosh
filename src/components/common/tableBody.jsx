import React from 'react';
import _ from 'lodash';

// data: array
// columns: array
// onLike: func
// onDelete: func

const TableBody = ({ data, columns, onLike, onDelete }) => {
  return (
    <tbody>
      {data.map(item => (
        <tr>
          {columns.map(column => {
            return <td> {item[column.path]}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
