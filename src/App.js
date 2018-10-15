import React, { Component } from 'react';
import MoviesInDB from './components/moviesindb';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <MoviesInDB />
      </div>
    );
  }
}

export default App;
