import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem/MovieItem';
import './movieList.scss';

const MovieList = ({ movieList, selectedMovieId, setSelectedMovieId }) => {
  const handleMovieItemSelection = (movieId) => {
    setSelectedMovieId(movieId);
  };
  const isMovieIdSelected = (id) => id === selectedMovieId;
  return (
    <ul className="movie-list">
      {movieList.map((movie) => (
        <MovieItem
          key={movie.id}
          active={isMovieIdSelected(movie.id)}
          movie={movie}
          selectMovieItem={() => handleMovieItemSelection(movie.id)}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      episodeId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  selectedMovieId: PropTypes.number.isRequired,
  setSelectedMovieId: PropTypes.func.isRequired,
};

export default MovieList;
