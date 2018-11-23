import React from 'react';

const Select = ({ name, label, error, options, optProps, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {options.map(opt => (
          <option key={opt[optProps.value]} value={opt[optProps.value]}>
            {opt[optProps.title]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
