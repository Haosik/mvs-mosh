import React, { Component } from 'react';
import _ from 'lodash';

// data: array
// columns: array
// onLike: func
// onDelete: func

class TableBody extends Component {
  renderCell = (item, column) => <td> {column.content ? column.content(item) : _.get(item, column.path)}</td>;
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr>{columns.map(column => this.renderCell(item, column))}</tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
