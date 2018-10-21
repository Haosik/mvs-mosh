import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ items, nameProperty, valueProperty, onFilterChange, currentProperty }) => {
  return (
    <div className="list-group">
      <button
        onClick={() => onFilterChange('')}
        className={`list-group-item list-group-item-action ${currentProperty ? '' : 'active'}`}
      >
        All genres
      </button>
      {items.map(item => (
        <button
          key={item[valueProperty]}
          onClick={() => onFilterChange(item)}
          className={`list-group-item list-group-item-action ${
            item[nameProperty] === currentProperty ? 'active' : ''
          }`}
        >
          {item[nameProperty]}
        </button>
      ))}
    </div>
  );
};

Filter.defaultProps = {
  nameProperty: 'name',
  valueProperty: '_id'
};

Filter.propTypes = {
  items: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  currentActive: PropTypes.string
};

export default Filter;
