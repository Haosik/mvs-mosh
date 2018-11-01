import React, { Component } from 'react';

class MovieForm extends Component {
  state = {};
  handleSave = () => {
    this.props.history.replace('/movies');
  };
  render() {
    return (
      <div className="container">
        <h1>Movie Form {this.props.match.params._id}</h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
