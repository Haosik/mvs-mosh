import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/navbar';
import MoviesInDB from './components/moviesindb';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="vidly">
        <Navbar />
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
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
