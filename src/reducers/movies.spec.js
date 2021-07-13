import movies from './movies';

jest.mock('../constants/ActionTypes', () => ({
  REQUEST_MOVIES: 'REQUEST_MOVIES',
  RECEIVE_MOVIES: 'RECEIVE_MOVIES',
  SET_SELECTED_MOVIE_ID: 'SET_SELECTED_MOVIE_ID',
}));

describe('movies reducer', () => {
  it('should handle initial state', () => {
    expect(movies(undefined, {})).toEqual({
      isFetching: false,
      items: [],
      selectedMovieId: 0,
    });
  });
  it('should handle REQUEST_MOVIES', () => {
    expect(movies({}, { type: 'REQUEST_MOVIES' })).toEqual({
      isFetching: true,
    });
    expect(
      movies(
        {
          isFetching: false,
          items: [],
          selectedMovieId: 0,
        },
        { type: 'REQUEST_MOVIES' }
      )
    ).toEqual({
      isFetching: true,
      items: [],
      selectedMovieId: 0,
    });
  });
  it('should handle RECEIVE_MOVIES', () => {
    expect(movies({}, { type: 'RECEIVE_MOVIES', movies: ['A', 'B'] })).toEqual({
      isFetching: false,
      items: ['A', 'B'],
    });
    expect(movies({}, { type: 'RECEIVE_MOVIES' })).toEqual({
      isFetching: false,
      items: [],
    });
    expect(
      movies(
        {
          isFetching: false,
          items: [],
          selectedMovieId: 0,
        },
        { type: 'RECEIVE_MOVIES', movies: ['A', 'B'] }
      )
    ).toEqual({
      isFetching: false,
      items: ['A', 'B'],
      selectedMovieId: 0,
    });
  });
  it('should handle SET_SELECTED_MOVIE_ID', () => {
    expect(movies({}, { type: 'SET_SELECTED_MOVIE_ID', id: 10 })).toEqual({
      selectedMovieId: 10,
    });
    expect(movies({}, { type: 'SET_SELECTED_MOVIE_ID' })).toEqual({
      selectedMovieId: 0,
    });
    expect(
      movies(
        {
          isFetching: false,
          items: [],
          selectedMovieId: 0,
        },
        { type: 'SET_SELECTED_MOVIE_ID', id: 10 }
      )
    ).toEqual({
      isFetching: false,
      items: [],
      selectedMovieId: 10,
    });
  });
});
