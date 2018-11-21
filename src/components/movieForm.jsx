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
    id: '',
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
  };

  doSubmit() {
    const { _id, title, genreId, numberInStock, dailyRentalRate } = this.state.data;
    const genreName = this.state.genres.filter(g => g._id === genreId).name;
    const newMovie = {
      _id,
      title,
      genre: { _id: genreId, name: genreName },
      numberInStock: +numberInStock,
      dailyRentalRate: +dailyRentalRate
    };
    saveMovie(newMovie);

    const { history } = this.props;
    history.push('/movies');
  }

  componentDidMount() {
    const { history } = this.props;
    this.setState({ genres: getGenres() });

    const { id } = this.props.match.params;
    if (!id) return;

    if (!getMovie(id)) {
      history.replace('/not-found');
      return;
    }

    const { title, genre, numberInStock, dailyRentalRate } = getMovie(id);
    this.setState({
      data: {
        _id: id,
        title,
        genreId: genre._id,
        numberInStock,
        dailyRentalRate
      }
    });
  }

  render() {
    const { id, genres, data } = this.state;
    const genresProperties = { value: '_id', title: 'name' };
    return (
      <div className="container">
        <h1>Movie Form {id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', genres, genresProperties, data.genreId)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderSubmitBtn('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
