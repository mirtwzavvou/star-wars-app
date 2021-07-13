import { combineReducers } from 'redux';
import movies from './movies';
import filter from './filter';
import sortOption from './sortOption';

const rootReducer = combineReducers({
  movies,
  filter,
  sortOption,
});

export default rootReducer;
