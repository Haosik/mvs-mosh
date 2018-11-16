import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from '../common/form';
import Input from './input';

class LoginForm extends Component {
  state = {
    data: {
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

    console.log('Submitted');
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div className="container">
        <Form>
          <Input value="123" />
        </Form>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={data.username}
            onChange={this.handleInputChange}
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <Input
            value={data.password}
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
