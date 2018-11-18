import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/navbar';
import MoviesInDB from './components/moviesindb';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import EditMovieForm from './components/editMovieForm';
import NewMovieForm from './components/newMovieForm';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="vidly">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/movies/new" component={NewMovieForm} />
          <Route path="/movies/:id" component={EditMovieForm} />
          <Route path="/movies" component={MoviesInDB} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
