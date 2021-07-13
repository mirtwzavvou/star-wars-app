import { createSelector } from 'reselect';
import { SHOW_ALL, SHOW_BY_KEYWORD } from '../constants/FilterTypes';
import { NO_SORT, SORT_BY_EPISODE, SORT_BY_YEAR } from '../constants/SortTypes';
import { getReleaseYear } from '../utils/utils';

const getFilter = (state) => state.filter;
const getMovies = (state) => (state.movies ? state.movies.items : []);

export const getFilteredMovies = createSelector(
  [getFilter, getMovies],
  ({ type = SHOW_ALL, keyword = '' } = {}, movies = []) => {
    switch (type) {
      case SHOW_ALL:
        return movies;
      case SHOW_BY_KEYWORD:
        return movies.filter((movie) => movie.title && movie.title.toLowerCase().includes(keyword.toLowerCase()));
      default:
        throw new Error(`Unknown filter: ${type}`);
    }
  }
);

const getSortOption = (state) => state.sortOption;
const filteredMovies = (state) => getFilteredMovies(state);

export const getSortedFilteredMovies = createSelector(
  [getSortOption, filteredMovies],
  (sortOption = NO_SORT, movies = []) => {
    switch (sortOption) {
      case NO_SORT:
        return movies;
      case SORT_BY_YEAR:
        return [...movies].sort((a, b) => getReleaseYear(a.releaseDate) - getReleaseYear(b.releaseDate));
      case SORT_BY_EPISODE:
        return [...movies].sort((a, b) => a.episodeId - b.episodeId);
      default:
        throw new Error(`Unknown filter: ${sortOption}`);
    }
  }
);
