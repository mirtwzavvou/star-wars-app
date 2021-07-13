import { getFilteredMovies, getSortedFilteredMovies } from './index';

jest.mock('../constants/FilterTypes', () => ({
  SHOW_ALL: 'SHOW_ALL',
  SHOW_BY_KEYWORD: 'SHOW_BY_KEYWORD',
}));
jest.mock('../constants/SortTypes', () => ({
  NO_SORT: 'NO_SORT',
  SORT_BY_EPISODE: 'SORT_BY_EPISODE',
  SORT_BY_YEAR: 'SORT_BY_YEAR',
}));

describe('selectors', () => {
  describe('getFilteredMovies', () => {
    it('should return all movie items from state, if SHOW_ALL selected', () => {
      const filteredMovies = getFilteredMovies({ filter: { type: 'SHOW_ALL' }, movies: { items: ['a', 'b'] } });
      expect(filteredMovies).toEqual(['a', 'b']);
    });
    it('should return empty array from state, if no state', () => {
      const filteredMovies = getFilteredMovies({});
      expect(filteredMovies).toEqual([]);
    });
    it('should return filtered movie items by keyword, if SHOW_BY_KEYWORD selected', () => {
      const filteredMovies = getFilteredMovies({
        filter: { type: 'SHOW_BY_KEYWORD', keyword: 'abc' },
        movies: { items: [{ title: 'abcde' }, { title: 'efg' }] },
      });
      expect(filteredMovies).toEqual([{ title: 'abcde' }]);
    });
    it('should return empty array, if SHOW_BY_KEYWORD selected and title not included', () => {
      const filteredMovies = getFilteredMovies({
        filter: { type: 'SHOW_BY_KEYWORD', keyword: 'abc' },
        movies: { items: ['abcde', 'efg'] },
      });
      expect(filteredMovies).toEqual([]);
    });
    it('should return empty array, if SHOW_BY_KEYWORD selected and no matches by keyword', () => {
      const filteredMovies = getFilteredMovies({
        filter: { type: 'SHOW_BY_KEYWORD', keyword: 'abc' },
        movies: { items: ['bcd', 'efg'] },
      });
      expect(filteredMovies).toEqual([]);
    });
    it('should throw an error, if filtered not found', () => {
      const filteredMovies = () => {
        getFilteredMovies({
          filter: { type: 'TEST_FILTER', keyword: 'abc' },
          movies: { items: ['bcd', 'efg'] },
        });
      };
      expect(filteredMovies).toThrow('Unknown filter: TEST_FILTER');
    });
  });
  describe('getSortedFilteredMovies', () => {
    it('should return unsorted filtered movies, if NO_SORT selected', () => {
      const sortedMovies = getSortedFilteredMovies({
        filter: { type: 'SHOW_ALL' },
        movies: { items: ['a', 'b'] },
        sortOption: 'NO_SORT',
      });
      expect(sortedMovies).toEqual(['a', 'b']);
    });
    it('should return unsorted filtered movies, if no sortOption in state', () => {
      const sortedMovies = getSortedFilteredMovies({
        filter: { type: 'SHOW_ALL' },
        movies: { items: ['a', 'b'] },
        sortOption: undefined,
      });
      expect(sortedMovies).toEqual(['a', 'b']);
    });
    it('should return sorted movie items by year, if SORT_BY_YEAR selected', () => {
      // TODO: mock getReleaseDate utility
      const sortedMovies = getSortedFilteredMovies({
        filter: { type: 'SHOW_ALL' },
        movies: { items: [{ releaseDate: '2000-12-3' }, { releaseDate: '1990-4-5' }] },
        sortOption: 'SORT_BY_YEAR',
      });
      expect(sortedMovies).toEqual([{ releaseDate: '1990-4-5' }, { releaseDate: '2000-12-3' }]);
    });
    it('should return sorted movie items by episodeId, if SORT_BY_EPISODE selected', () => {
      const sortedMovies = getSortedFilteredMovies({
        filter: { type: 'SHOW_ALL' },
        movies: { items: [{ episodeId: 5 }, { episodeId: 3 }] },
        sortOption: 'SORT_BY_EPISODE',
      });
      expect(sortedMovies).toEqual([{ episodeId: 3 }, { episodeId: 5 }]);
    });
    it('should throw an error, if sortOption not found', () => {
      const sortedMovies = () => {
        getSortedFilteredMovies({
          filter: { type: 'SHOW_ALL' },
          movies: { items: ['a', 'b'] },
          sortOption: 'TEST_SORT_OPTION',
        });
      };
      expect(sortedMovies).toThrow('Unknown filter: TEST_SORT_OPTION');
    });
  });
});
