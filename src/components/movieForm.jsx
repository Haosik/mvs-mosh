import React from 'react';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

import Form from './common/form';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  doSubmit() {
    saveMovie(this.state.data);

    this.props.history.push('/movies');
  }

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const { id: movieId } = this.props.match.params;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState(this.mapToViewModel(movie));
  }

  mapToViewModel = movie => {
    const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
    return {
      data: {
        _id,
        title,
        genreId: genre._id,
        numberInStock,
        dailyRentalRate
      }
    };
  };

  render() {
    const { genres } = this.state;
    const { id: movieId } = this.props.match.params;
    const genresProperties = { value: '_id', title: 'name' };
    return (
      <div className="container">
        <h1>Movie Form {movieId}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', genres, genresProperties)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderSubmitBtn('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
