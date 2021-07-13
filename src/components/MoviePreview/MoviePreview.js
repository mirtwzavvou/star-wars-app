import React from 'react';
import PropTypes from 'prop-types';
import './moviePreview.scss';

const MoviePreview = ({ selectedMovie }) => {
  const movieDetails = (movie) => {
    return (
      <>
        <h2>{movie.title}</h2>
        <div className="movie-preview__description">{movie.description}</div>
        <div>Directed By: {movie.director}</div>
      </>
    );
  };
  return <div className="movie-preview">{selectedMovie ? movieDetails(selectedMovie) : 'No movie selected'}</div>;
};

MoviePreview.propTypes = {
  selectedMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }),
};

export default MoviePreview;
