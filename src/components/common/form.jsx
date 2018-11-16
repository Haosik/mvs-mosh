import React, { Component } from 'react';
import { Joi } from 'joi-browser';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    const { details } = error;
    details.forEach(item => {
      errors[item.path[0]] = item.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // Received name and value of changed input
    const obj = { [name]: value };
    // Validate against specific field from global schema
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    return <h1>Form</h1>;
  }
}

export default Form;
