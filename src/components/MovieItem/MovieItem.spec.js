import React from 'react';
import 'regenerator-runtime/runtime';
import TestRenderer from 'react-test-renderer';
import MovieItem from './MovieItem';

const setup = (active = false) => {
  const props = {
    movie: {
      episodeId: 1,
      title: 'TEST_TITLE',
      releaseDate: 'TEST_DATE',
    },
    active,
    selectMovieItem: jest.fn(),
  };
  const testRenderer = TestRenderer.create(<MovieItem {...props} />);
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('MovieItem', () => {
    it('should render container', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('li');
      expect(containerElement.props.className).toBe('movie-item');
    });
    it('should render container as active, if active prop is true', () => {
      const { testInstance } = setup(true);
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('li');
      expect(containerElement.props.className).toBe('movie-item movie-item--active');
    });
    it('should render a button inside li containing movie details', async () => {
      const { testInstance } = setup();
      const buttonElement = await testInstance.findByType('button');
      expect(buttonElement.props.className).toBe('movie-item__button');
      expect(buttonElement.children.length).toBe(3);
    });
    it('should render movie episode id as first element inside button', async () => {
      const { testInstance } = setup();
      const buttonElement = await testInstance.findByType('button');
      const firstSpanElement = buttonElement.children[0];
      expect(firstSpanElement.props.className).toBe('movie-item__detail movie-item__detail--episode-id');
      expect(firstSpanElement.props.children).toEqual(expect.arrayContaining(['EPISODE ', 1]));
    });
    it('should render movie title as second element inside button', async () => {
      const { testInstance } = setup();
      const buttonElement = await testInstance.findByType('button');
      const secondSpanElement = buttonElement.children[1];
      expect(secondSpanElement.props.className).toBe('movie-item__detail movie-item__detail--title');
      expect(secondSpanElement.props.children).toBe('TEST_TITLE');
    });
    it('should render movie title as third element inside button', async () => {
      const { testInstance } = setup();
      const buttonElement = await testInstance.findByType('button');
      const thirdSpanElement = buttonElement.children[2];
      expect(thirdSpanElement.props.className).toBe('movie-item__detail movie-item__detail--release-date');
      expect(thirdSpanElement.props.children).toBe('TEST_DATE');
    });
    it('should call selectMovieItem upon button click', async () => {
      const { testInstance, props } = setup();
      const buttonElement = await testInstance.findByProps({ className: 'movie-item__button' });
      buttonElement.props.onClick();
      expect(props.selectMovieItem).toHaveBeenCalled();
    });
  });
});
