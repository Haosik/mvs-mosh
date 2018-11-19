import React from 'react';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie } from '../services/fakeMovieService';

import Form from './common/form';

class NewMovieForm extends Form {
  state = {
    data: {
      title: '',
      genre: { _id: '', name: '' },
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {
      title: '',
      genre: { _id: '', name: '' },
      numberInStock: '',
      dailyRentalRate: ''
    }
  };

  schema = {
    title: Joi.string().required(),
    genre: { _id: Joi.number().required(), name: Joi.string().required() },
    numberInStock: Joi.number()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
  };

  doSubmit = () => {
    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    const newMovie = {
      title,
      genre,
      numberInStock,
      dailyRentalRate
    };
    saveMovie(newMovie);

    const { history } = this.props;
    history.push('/movies');
  };

  render() {
    const genresOptions = getGenres();
    const genresProperties = { value: '_id', title: 'name'};
    return (
      <div className="container">
        <h1>New Movie Form</h1>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genre', 'Genre', genresOptions, genresProperties)}
        {this.renderInput('numberInStock', 'Number in Stock')}
        {this.renderInput('dailyRentalRate', 'Rate')}
        {this.renderSubmitBtn('Save')}
      </div>
    );
  }
}

export default NewMovieForm;
