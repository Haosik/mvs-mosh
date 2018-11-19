import Joi from 'joi-browser';
import React, { Component } from 'react';
import Input from './input';
import Select from './select';

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

  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    // On every input change setState with new errors object
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    // On every input change setState with new data object
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    // Prevent null to be setStated as error object
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log('Should do submit')
    this.doSubmit();
  };

  renderSubmitBtn(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(property, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[property]}
        onChange={this.handleInputChange}
        name={property}
        label={label}
        type={type}
        error={errors[property]}
      />
    );
  }

  renderSelect(property, label, options, optionsProperties) {
    const { data, errors } = this.state;
    return (
      <Select
        value={data[property]}
        label={label}
        onChange={this.handleInputChange}
        name={property}
        id={property}
        error={errors[property]}
        options={options}
        optionsProperties={optionsProperties}
      />
    );
  }
}

export default Form;
