import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

// data: array
// columns: array

class TableBody extends Component {
  renderCell = (item, column) => (column.content ? column.content(item) : _.get(item, column.path));

  createKey = (item, column) => item._id + (column.path || column.key);

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default TableBody;
