import React from 'react';

const Input = ({ label, name, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="form-control"
        type={type}
      />
    </div>
  );
};

export default Input;
