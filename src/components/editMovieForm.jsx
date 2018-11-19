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
        <button onClick={() => history.push('/movies')} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default EditMovieForm;
