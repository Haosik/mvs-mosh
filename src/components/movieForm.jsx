import React from 'react';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, getMovies, saveMovie } from '../services/fakeMovieService';

import Form from './common/form';

class MovieForm extends Form {
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
    },
    id: '',
    genres: []
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
    const { id, title, genre, numberInStock, dailyRentalRate } = this.state.data;
    const genreName = this.state.genres.filter(g => g._id === genre).name;
    const newMovie = {
      id,
      title,
      genre: { _id: genre, name: genreName },
      numberInStock: +numberInStock,
      dailyRentalRate: +dailyRentalRate
    };
    saveMovie(newMovie);

    const { history } = this.props;
    history.push('/movies');
  }

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const { id } = this.props.match.params;
    if (!id) return;

    const { title, genre, numberInStock, dailyRentalRate } = getMovie(id);
    this.setState({
      data: {
        id,
        title,
        genre,
        numberInStock,
        dailyRentalRate
      }
    });
  }

  render() {
    const { id, genres } = this.state;
    const genresProperties = { value: '_id', title: 'name' };
    return (
      <div className="container">
        <h1>Movie Form {id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', genres, genresProperties)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderSubmitBtn('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
