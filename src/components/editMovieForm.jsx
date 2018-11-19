import React from 'react';

import Form from './common/form';
import { getMovie } from './../services/fakeMovieService';

class EditMovieForm extends Form {
  state = {
    data: {},
    errors: {}
  };

  handleNotFound = () => {
    const { match, history } = this.props;
    !getMovie(match.params.id) && history.replace('/not-found');
  };

  componentDidMount() {
    this.handleNotFound();
  }

  render() {
    const { match, history } = this.props;
    return (
      <div className="container">
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>haha</h3>
        </form>
      </div>
    );
  }
}

export default EditMovieForm;
