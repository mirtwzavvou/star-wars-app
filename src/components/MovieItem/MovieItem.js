import React from 'react';
import PropTypes from 'prop-types';
import './movieItem.scss';

const MovieItem = ({ active, movie, selectMovieItem }) => {
  return (
    <li className={`movie-item${active ? ' movie-item--active' : ''}`}>
      <button className="movie-item__button" type="button" onClick={selectMovieItem}>
        <span className="movie-item__detail movie-item__detail--episode-id">EPISODE {movie.episodeId}</span>
        <span className="movie-item__detail movie-item__detail--title">{movie.title}</span>
        <span className="movie-item__detail movie-item__detail--release-date">{movie.releaseDate}</span>
      </button>
    </li>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.shape({
    episodeId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  }).isRequired,
  selectMovieItem: PropTypes.func.isRequired,
};

export default MovieItem;
