import filter from './filter';

jest.mock('../constants/ActionTypes', () => ({
  SET_FILTER: 'SET_FILTER',
}));
jest.mock('../constants/FilterTypes', () => ({
  SHOW_ALL: 'SHOW_ALL',
}));

describe('filter reducer', () => {
  it('should handle initial state', () => {
    expect(filter(undefined, {})).toEqual({
      type: 'SHOW_ALL',
      keyword: '',
    });
  });
  it('should handle SET_FILTER', () => {
    expect(filter({}, { type: 'SET_FILTER', filter: 'TEST_FILTER' })).toBe('TEST_FILTER');
    expect(
      filter(
        {
          type: 'SHOW_ALL',
          keyword: '',
        },
        { type: 'SET_FILTER', filter: 'TEST_FILTER' }
      )
    ).toBe('TEST_FILTER');
    expect(
      filter(
        {
          type: 'SHOW_ALL',
          keyword: '',
        },
        { type: 'SET_FILTER' }
      )
    ).toEqual({
      type: 'SHOW_ALL',
      keyword: '',
    });
  });
});
