import React, { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
  componentDidMount() {
    try {
      auth.logout();
      window.location = '/';
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return null;
  }
}

export default Logout;
