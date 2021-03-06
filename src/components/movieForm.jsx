import React from 'react';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

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

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;

      const { data: movie } = await getMovie(movieId);
      this.setState(this.mapToViewModel(movie));
    } catch (err) {
      if (err.response && err.response.status === 404) return this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
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
