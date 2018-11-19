import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { getMovie } from './../services/fakeMovieService';

class EditMovieForm extends Form {
  state = {
    data: {
      title: ''
    },
    errors: {
      title: ''
    }
  };

  schema = {
    title: Joi.string().required()
  };

  handleNotFound = () => {
    const { match, history } = this.props;
    // If id in url does not exist in DB - redirect to 404
    !getMovie(match.params.id) && history.replace('/not-found');
  };

  componentDidMount() {
    this.handleNotFound();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>haha</h3>
          {this.renderInput('title', 'Title')}
          {this.renderSubmitBtn('Save')}
        </form>
      </div>
    );
  }
}

export default EditMovieForm;
