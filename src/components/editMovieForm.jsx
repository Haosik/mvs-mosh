import React from 'react';

const EditMovieForm = ({ match, history }) => {
  return (
    <div className="container">
      <h1>Movie Form {match.params.id}</h1>
      <button onClick={() => history.push('/movies')} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default EditMovieForm;
