import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
// Really we need only register method from userService
import * as userService from '../services/userService';
import auth from '../services/authService';

import Form from './common/form';

class RegistrationForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: ''
    },
    errors: {
      username: '',
      password: '',
      name: ''
    }
  };

  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = async () => {
    try {
      const resp = await userService.register(this.state.data);
      auth.loginWithJwt(resp.headers['x-auth-token']);
      window.location = '/';
      // this.props.history.push('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.dir(err);
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
        toast(err.response.data);
      }
    }
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderSubmitBtn('Register')}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
