import { SET_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/FilterTypes';

const initialState = {
  type: SHOW_ALL,
  keyword: '',
};

const filterReducer = (state = initialState, { type = '', filter = initialState } = {}) => {
  switch (type) {
    case SET_FILTER:
      return filter;
    default:
      return state;
  }
};

export default filterReducer;
