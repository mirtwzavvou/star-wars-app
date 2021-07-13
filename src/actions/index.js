import to from 'await-to';
import MoviesApi from '../api/moviesApi';
import * as types from '../constants/ActionTypes';
import { formatMovieList } from '../utils/utils';

export const requestMovies = () => ({ type: types.REQUEST_MOVIES });
export const receiveMovies = (movies) => ({ type: types.RECEIVE_MOVIES, movies });

const fetchMovies = () => async (dispatch) => {
  dispatch(requestMovies());
  const [error, response] = await to(MoviesApi.fetchMovies());
  if (error) {
    return new Error('There is an error on fetching movies');
  }
  const formattedMovieList = response.data ? formatMovieList({ movieListData: response.data }) : [];
  return dispatch(receiveMovies(formattedMovieList));
};

const shouldFetchMovies = (state) => {
  const { movies } = state;
  return !movies.items.length && !movies.isFetching;
};

export const fetchMoviesIfNeeded = () => (dispatch, getState) =>
  shouldFetchMovies(getState()) && dispatch(fetchMovies());

export const setSelectedMovieId = (id) => ({ type: types.SET_SELECTED_MOVIE_ID, id });

export const setFilter = (filter) => ({ type: types.SET_FILTER, filter });

export const setSortOption = (sortOption) => ({ type: types.SET_SORT_OPTION, sortOption });
