import React from 'react';
import TestRenderer from 'react-test-renderer';
import MovieList from './MovieList';
import MovieItem from '../MovieItem/MovieItem';

jest.mock('../MovieItem/MovieItem', () => {
  return () => <div className="mock-movie-item"></div>;
});

const setup = () => {
  const props = {
    movieList: [
      {
        id: 1,
        episodeId: 1,
        title: 'TEST_TITLE_1',
        releaseDate: 'TEST_DATE_1',
      },
      {
        id: 2,
        episodeId: 2,
        title: 'TEST_TITLE_2',
        releaseDate: 'TEST_DATE_2',
      },
    ],
    selectedMovieId: 2,
    setSelectedMovieId: jest.fn(),
  };
  const testRenderer = TestRenderer.create(<MovieList {...props} />);
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('MovieList', () => {
    it('should render container', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('ul');
      expect(containerElement.props.className).toBe('movie-list');
    });
    it('should render movie items', () => {
      const { testInstance, props } = setup();
      const containerElement = testInstance.children[0];
      const movieListElements = containerElement.children;
      expect(movieListElements.length).toBe(2);
      movieListElements.forEach((movie, i) => {
        expect(movie.type).toBe(MovieItem);
        expect(movie.props.movie).toBe(props.movieList[i]);
        movie.props.selectMovieItem();
        expect(props.setSelectedMovieId).toHaveBeenCalledWith(props.movieList[i].id);
      });
    });
    it('should set movie item with selectedId to active', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      const movieListElements = containerElement.children;
      expect(movieListElements[1].props.active).toBe(true);
    });
  });
});
