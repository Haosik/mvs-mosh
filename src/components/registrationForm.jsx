import React from 'react';
import Joi from 'joi-browser';

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

  doSubmit = () => {
    console.log('Submitted');
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
