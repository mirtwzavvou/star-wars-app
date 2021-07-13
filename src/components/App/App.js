import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SortOptions from '../../container/SortOptions';
import SearchBar from '../../container/SearchBar';
import MovieList from '../../container/MovieList';
import MoviePreview from '../../container/MoviePreview';
import './app.scss';

const App = ({ fetchMoviesIfNeeded }) => {
  useEffect(() => {
    fetchMoviesIfNeeded();
  }, []);

  return (
    <div className="star-wars-movie-app">
      <div className="star-wars-movie-app__header">
        <SortOptions />
        <SearchBar />
      </div>
      <div className="star-wars-movie-app__main-content">
        <div className="star-wars-movie-app__movie-list">
          <MovieList />
        </div>
        <div className="star-wars-movie-app__movie-preview">
          <MoviePreview />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  fetchMoviesIfNeeded: PropTypes.func.isRequired,
};

export default App;
