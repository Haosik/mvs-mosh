import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, nameProperty, valueProperty, onItemSelect, currentProperty }) => {
  return (
    <div className="list-group">
      {items.map((item, ind) => (
        <button
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={`list-group-item list-group-item-action ${item === currentProperty ? 'active' : ''}`}
        >
          {item[nameProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  nameProperty: 'name',
  valueProperty: '_id'
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
