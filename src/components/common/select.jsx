import React from 'react';

const Select = ({ property, label, error, options, optionsProperties, value, id, name, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select className="form-control" id={id} name={name} onChange={onChange} value={value}>
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
