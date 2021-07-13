import { SET_SORT_OPTION } from '../constants/ActionTypes';
import { NO_SORT } from '../constants/SortTypes';

const sortReducer = (state = NO_SORT, { type = '', sortOption = NO_SORT } = {}) => {
  switch (type) {
    case SET_SORT_OPTION:
      return sortOption;
    default:
      return state;
  }
};

export default sortReducer;
