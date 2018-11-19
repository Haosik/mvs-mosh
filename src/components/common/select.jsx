import React from 'react';

const Select = ({ name, label, error, options, optionsProperties, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} onChange={onChange} defaultValue="">
        <option value="" />
        {options.map(opt => (
          <option key={opt[optionsProperties.value]} value={opt[optionsProperties.value]}>
            {opt[optionsProperties.title]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
