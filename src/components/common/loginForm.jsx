import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';

class LoginForm extends Component {
  state = {
    account: {
      username: '',
      password: ''
    },
    errors: {
      username: '',
      password: ''
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

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

    // On every input change setState with new account object
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    // Prevent null to be setStated as error object
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log('Submitted');
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            onChange={this.handleInputChange}
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <Input
            value={account.password}
            onChange={this.handleInputChange}
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
          {/* <div class="form-group">
            <label htmlFor="exampleFormControlSelect1">Example select</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> */}
        </form>
      </div>
    );
  }
}

export default LoginForm;
