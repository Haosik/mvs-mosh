import React from 'react';

const SearchBar = ({ onSearch, value }) => {
  return (
    <input
      name="s"
      className="form-control my-3"
      placeholder="Search"
      onChange={e => onSearch(e.target.value)}
      value={value}
    />
  );
};

export default SearchBar;
