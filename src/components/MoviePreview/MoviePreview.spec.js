import React from 'react';
import 'regenerator-runtime/runtime';
import TestRenderer from 'react-test-renderer';
import MoviePreview from './MoviePreview';

const setup = (selectedMovie = null) => {
  const props = {
    selectedMovie,
  };
  const testRenderer = TestRenderer.create(<MoviePreview {...props} />);
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('MoviePreview', () => {
    it('should render container', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('div');
      expect(containerElement.props.className).toBe('movie-preview');
    });
    describe('if no selected movie', () => {
      it('should render a fallback text inside the container', () => {
        const { testInstance } = setup();
        const containerElement = testInstance.children[0];
        expect(containerElement.children[0]).toBe('No movie selected');
      });
    });
    describe('if movie selected', () => {
      it('should render the movie title of the selected movie', async () => {
        const selectedMovie = {
          title: 'TEST_TITLE',
          description: 'TEST_DESCRIPTION',
          director: 'TEST_DIRECTOR',
        };
        const { testInstance } = setup(selectedMovie);
        const containerElement = testInstance.children[0];
        const headingElement = await containerElement.findByType('h2');
        expect(headingElement.children[0]).toBe('TEST_TITLE');
      });
      it('should render the movie description of the selected movie', async () => {
        const selectedMovie = {
          title: 'TEST_TITLE',
          description: 'TEST_DESCRIPTION',
          director: 'TEST_DIRECTOR',
        };
        const { testInstance } = setup(selectedMovie);
        const containerElement = testInstance.children[0];
        const descriptionElement = await containerElement.findByProps({ className: 'movie-preview__description' });
        expect(descriptionElement.children[0]).toBe('TEST_DESCRIPTION');
      });
      it('should render the movie director of the selected movie', () => {
        const selectedMovie = {
          title: 'TEST_TITLE',
          description: 'TEST_DESCRIPTION',
          director: 'TEST_DIRECTOR',
        };
        const { testInstance } = setup(selectedMovie);
        const containerElement = testInstance.children[0];
        expect(containerElement.children[2].children).toEqual(
          expect.arrayContaining(['Directed By: ', 'TEST_DIRECTOR'])
        );
      });
    });
  });
});
