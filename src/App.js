import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';

import Navbar from './components/navbar';
import MoviesInDB from './components/moviesindb';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import Logout from './components/logout';

import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div className="vidly">
        <ToastContainer />
        <Navbar user={this.state.user} />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies/" render={props => <MoviesInDB {...props} user={this.state.user} />} />
          <Route path="/customers/" component={Customers} />
          <Route path="/rentals/" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
