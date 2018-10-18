import React from 'react';

const Filter = ({ items, onFilterChange }) => {
  return (
    <div className="col-sm-2">
      <div className="list-group">
        {items.map((item, ind) => (
          <button
            key={ind}
            onClick={() => onFilterChange(item)}
            className="list-group-item list-group-item-action active"
          >
            Cras justo odio
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
