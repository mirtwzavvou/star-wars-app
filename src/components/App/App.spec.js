import React  from 'react';
import 'regenerator-runtime/runtime';
import TestRenderer from 'react-test-renderer';
import App from './App';
import SortOptions from '../../container/SortOptions';
import SearchBar from '../../container/SearchBar';
import MovieList from '../../container/MovieList';
import MoviePreview from '../../container/MoviePreview';

jest.mock('../../container/SortOptions', () => {
  return () => {
    return <div className="mock-sort-options"></div>;
  };
});
jest.mock('../../container/SearchBar', () => {
  return () => {
    return <div className="mock-search-bar"></div>;
  };
});
jest.mock('../../container/MovieList', () => {
  return () => {
    return <div className="mock-movie-list"></div>;
  };
});
jest.mock('../../container/MoviePreview', () => {
  return () => {
    return <div className="mock-movie-preview"></div>;
  };
});

const setup = () => {
  const props = {
    fetchMoviesIfNeeded: jest.fn(),
  };
  const { act } = TestRenderer;
  let testRenderer;
  act(() => {
    testRenderer = TestRenderer.create(<App {...props} />);
  });
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('App', () => {
    it('should call fetchMoviesIfNeeded, on mounted', () => {
      const { props } = setup();
      expect(props.fetchMoviesIfNeeded).toHaveBeenCalled();
    });
    it('should render container', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('div');
      expect(containerElement.props.className).toBe('star-wars-movie-app');
    });
    it('should render a header element with 2 children components', async () => {
      const { testInstance } = setup();
      const headerElement = await testInstance.findByProps({ className: 'star-wars-movie-app__header' });
      expect(headerElement.children.length).toBe(2);
      expect(headerElement.children[0].type).toBe(SortOptions);
      expect(headerElement.children[1].type).toBe(SearchBar);
    });
    it('should render a main content with 2 children components', async () => {
      const { testInstance } = setup();
      const headerElement = await testInstance.findByProps({ className: 'star-wars-movie-app__main-content' });
      expect(headerElement.children.length).toBe(2);
      expect(headerElement.children[0].props.className).toBe('star-wars-movie-app__movie-list');
      expect(headerElement.children[0].children[0].type).toBe(MovieList);
      expect(headerElement.children[1].props.className).toBe('star-wars-movie-app__movie-preview');
      expect(headerElement.children[1].children[0].type).toBe(MoviePreview);
    });
  });
});
