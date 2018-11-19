import React from 'react';
import Joi from 'joi-browser';
import { getGenres, getGenreById } from '../services/fakeGenreService';
import { saveMovie } from '../services/fakeMovieService';

import Form from './common/form';

class NewMovieForm extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: ''
    }
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
  };

  doSubmit() {
    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    const genreName = getGenreById(genre).name;
    const newMovie = {
      _id: new Date(),
      title,
      genre: { _id: genre, name: genreName },
      numberInStock,
      dailyRentalRate
    };
    console.log(321);
    saveMovie(newMovie);

    console.log(123);

    const { history } = this.props;
    history.push('/movies');
  }

  render() {
    const genresOptions = getGenres();
    const genresProperties = { value: '_id', title: 'name' };
    return (
      <div className="container">
        <h1>New Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', genresOptions, genresProperties)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderSubmitBtn('Save')}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
