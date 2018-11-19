import React from 'react';

const Select = ({ name, label, error, options, genresProperties, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} onChange={onChange} defaultValue="">
        <option value="" />
        {options.map(opt => (
          <option key={opt[genresProperties.value]} value={opt[genresProperties.value]}>
            {opt[genresProperties.title]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
