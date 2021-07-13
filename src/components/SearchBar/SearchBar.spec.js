import React from 'react';
import TestRenderer from 'react-test-renderer';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar';

jest.mock('@material-ui/core', () => ({
  InputBase: () => {
    return <div className="mock-input-base"></div>;
  },
}));
jest.mock('@material-ui/icons/Search', () => {
  return () => {
    return <div className="mock-search-icon"></div>;
  };
});
jest.mock('@material-ui/core/styles', () => ({
  makeStyles: () =>
    jest.fn().mockReturnValue({
      input: 'TEST_INPUT_CLASS',
      icon: 'TEST_ICON_CLASS',
    }),
}));
jest.mock('../../constants/FilterTypes', () => ({
  SHOW_BY_KEYWORD: 'SHOW_BY_KEYWORD',
}));

const setup = () => {
  const props = {
    filter: {
      type: 'TEST_FILTER_TYPE',
      keyword: 'TEST_KEYWORD',
    },
    setFilter: jest.fn(),
  };
  const testRenderer = TestRenderer.create(<SearchBar {...props} />);
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('SearchBar', () => {
    it('should render container', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      expect(containerElement.type).toBe('div');
      expect(containerElement.props.className).toBe('search-bar');
    });
    it('should render a Search Icon', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      const searchIconElement = containerElement.children[0];
      expect(searchIconElement.type).toBe(SearchIcon);
      expect(searchIconElement.props.className).toBe('TEST_ICON_CLASS');
    });
    it('should render an Input Base element', () => {
      const { testInstance } = setup();
      const containerElement = testInstance.children[0];
      const inputBaseElement = containerElement.children[1];
      expect(inputBaseElement.type).toBe(InputBase);
      expect(inputBaseElement.props.id).toBe('search-bar-input');
      expect(inputBaseElement.props.name).toBe('searchBarInput');
      expect(inputBaseElement.props.placeholder).toBe('Type to search');
      expect(inputBaseElement.props.className).toBe('TEST_INPUT_CLASS');
      expect(inputBaseElement.props.value).toBe('TEST_KEYWORD');
    });
    it('should call setFilter on input change', () => {
      const { testInstance, props } = setup();
      const containerElement = testInstance.children[0];
      const inputBaseElement = containerElement.children[1];
      inputBaseElement.props.onChange({ target: { value: 'TEST_VALUE' } });
      expect(props.setFilter).toHaveBeenCalledWith({ type: 'SHOW_BY_KEYWORD', keyword: 'TEST_VALUE' });
    });
  });
});
