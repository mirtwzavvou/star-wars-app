import sortOption from './sortOption';

jest.mock('../constants/ActionTypes', () => ({
  SET_SORT_OPTION: 'SET_SORT_OPTION',
}));
jest.mock('../constants/FilterTypes', () => ({
  NO_SORT: 'NO_SORT',
}));

describe('sortOption reducer', () => {
  it('should handle initial state', () => {
    expect(sortOption(undefined, {})).toBe('NO_SORT');
  });
  it('should handle SET_SORT_OPTION', () => {
    expect(sortOption('', { type: 'SET_SORT_OPTION', sortOption: 'TEST_SORT_OPTION' })).toBe('TEST_SORT_OPTION');
    expect(
      sortOption('INITIAL_SORT_OPTION', {
        type: 'SET_SORT_OPTION',
        sortOption: 'TEST_SORT_OPTION',
      })
    ).toBe('TEST_SORT_OPTION');
    expect(
      sortOption('INITIAL_SORT_OPTION', {
        type: 'SET_SORT_OPTION',
      })
    ).toBe('NO_SORT');
  });
});
