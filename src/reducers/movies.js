import { RECEIVE_MOVIES, REQUEST_MOVIES, SET_SELECTED_MOVIE_ID } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  items: [],
  selectedMovieId: 0,
};

const moviesReducer = (state = initialState, { type = '', movies = [], id = 0 } = {}) => {
  switch (type) {
    case REQUEST_MOVIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_MOVIES:
      return {
        ...state,
        isFetching: false,
        items: movies,
      };
    case SET_SELECTED_MOVIE_ID:
      return {
        ...state,
        selectedMovieId: id,
      };
    default:
      return state;
  }
};

export default moviesReducer;
