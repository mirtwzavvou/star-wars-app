import React from 'react';
import 'regenerator-runtime/runtime';
import TestRenderer, { act } from 'react-test-renderer';
import { Popover, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SortOptions from './SortOptions';

jest.mock('@material-ui/core', () => ({
  Popover: (props) => <div className="mock-popover">{props.children}</div>,
  Button: (props) => props.children,
  IconButton: (props) => props.children,
}));
jest.mock('@material-ui/icons/Close', () => {
  return () => {
    return <div className="mock-close-icon"></div>;
  };
});
jest.mock('@material-ui/core/styles', () => ({
  makeStyles: () =>
    jest.fn().mockReturnValue({
      button: 'TEST_BUTTON_CLASS',
    }),
}));
jest.mock('../../constants/SortTypes', () => ({
  SORT_BY_EPISODE: 'SORT_BY_EPISODE',
  SORT_BY_YEAR: 'SORT_BY_YEAR',
}));

const setup = () => {
  const props = {
    setSortOption: jest.fn(),
  };
  const testRenderer = TestRenderer.create(<SortOptions {...props} />);
  const testInstance = testRenderer.root;
  return {
    props,
    testInstance,
  };
};

describe('components', () => {
  describe('SortOptions', () => {
    it('should render a sort button', () => {
      const { testInstance } = setup();
      const sortButtonElement = testInstance.children[0];
      expect(sortButtonElement.type).toBe(Button);
    });
    it('should render a sort popover', () => {
      const { testInstance } = setup();
      const popoverElement = testInstance.children[1];
      expect(popoverElement.type).toBe(Popover);
      expect(popoverElement.props.id).toBe(undefined);
      expect(popoverElement.props.open).toBe(false);
      expect(popoverElement.props.anchorOrigin).toEqual({
        vertical: 'bottom',
        horizontal: 'left',
      });
      expect(popoverElement.props.transformOrigin).toEqual({
        vertical: 'top',
        horizontal: 'left',
      });
    });
    it('should render sort popover header title', async () => {
      const { testInstance } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__header' });
      const popoverHeaderTitleElement = popoverHeaderElement.children[0];
      expect(popoverHeaderTitleElement.children[0]).toBe('Sort by');
    });
    it('should render sort popover close button', async () => {
      const { testInstance } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__header' });
      const popoverCloseButtonElement = popoverHeaderElement.children[1];
      expect(popoverCloseButtonElement.type).toBe(IconButton);
      expect(popoverCloseButtonElement.children[0].type).toBe(CloseIcon);
    });
    it('should open popover upon button click', async () => {
      const { testInstance } = setup();
      const sortButtonElement = await testInstance.children[0];
      act(() => {
        sortButtonElement.props.onClick({ currentTarget: 'TEST_CURRENT_TARGET' });
      });
      const popoverElement = testInstance.children[1];
      expect(popoverElement.props.id).toBe('sort-popover');
      expect(popoverElement.props.open).toBe(true);
      expect(popoverElement.props.anchorEl).toBe('TEST_CURRENT_TARGET');
    });
    it('should close popover upon close button click', async () => {
      const { testInstance } = setup();
      const sortButtonElement = testInstance.children[0];
      act(() => {
        sortButtonElement.props.onClick({ currentTarget: 'TEST_CURRENT_TARGET' });
      });
      const popoverElement = testInstance.children[1];
      expect(popoverElement.props.open).toBe(true);
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__header' });
      const popoverCloseButtonElement = popoverHeaderElement.children[1];
      act(() => {
        popoverCloseButtonElement.props.onClick();
      });
      expect(popoverElement.props.id).toBe(undefined);
      expect(popoverElement.props.open).toBe(false);
      expect(popoverElement.props.anchorEl).toBe(null);
    });
    it('should render sort by year button', async () => {
      const { testInstance } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__body' });
      const popoverCloseButtonElement = popoverHeaderElement.children[0];
      expect(popoverCloseButtonElement.type).toBe(Button);
      expect(popoverCloseButtonElement.children[0]).toBe('Year');
    });
    it('should call setSortOption SORT_BY_YEAR after clicking on button', async () => {
      const { testInstance, props } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__body' });
      const popoverCloseButtonElement = popoverHeaderElement.children[0];
      popoverCloseButtonElement.props.onClick();
      expect(props.setSortOption).toHaveBeenCalledWith('SORT_BY_YEAR');
    });
    it('should render sort by episode button', async () => {
      const { testInstance } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__body' });
      const popoverCloseButtonElement = popoverHeaderElement.children[1];
      expect(popoverCloseButtonElement.type).toBe(Button);
      expect(popoverCloseButtonElement.children[0]).toBe('Episode');
    });
    it('should call setSortOption SORT_BY_EPISODE after clicking on button', async () => {
      const { testInstance, props } = setup();
      const popoverHeaderElement = await testInstance.findByProps({ className: 'sort-popover__body' });
      const popoverCloseButtonElement = popoverHeaderElement.children[1];
      popoverCloseButtonElement.props.onClick();
      expect(props.setSortOption).toHaveBeenCalledWith('SORT_BY_EPISODE');
    });
  });
});
