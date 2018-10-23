import React, { Component } from 'react';

// columns: array
// sortColumn: obj
// onSort: func

class TableHeader extends Component {
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
  renderSortIcon = column => {
    const { sortColumn } = this.props;
    return column.path === sortColumn.path ? (
      <i className={`fa fa-sort-${sortColumn.order === 'desc' ? 'desc' : 'asc'}`} aria-hidden="true" />
    ) : null;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)} className="clickable">
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
