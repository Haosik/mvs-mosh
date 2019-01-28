import Joi from 'joi-browser';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentUser, login } from '../services/authService';
import Form from './common/form';

class LoginForm extends Form {
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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
      // this.props.history.push('/');
    } catch (err) {
      console.dir(err.response.data);
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderSubmitBtn('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
