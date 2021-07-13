import React from 'react';
import PropTypes from 'prop-types';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { SHOW_BY_KEYWORD } from '../../constants/FilterTypes';
import './searchBar.scss';

const useStyle = makeStyles({
  input: {
    flex: 1,
    paddingLeft: '5px',
  },
  icon: {
    height: '100%',
    color: 'gray',
  },
});

const SearchBar = ({ filter, setFilter }) => {
  const classes = useStyle();

  const handleChange = (e) => {
    setFilter({ type: SHOW_BY_KEYWORD, keyword: e.target.value });
  };
  return (
    <div className="search-bar">
      <SearchIcon className={classes.icon} />
      <InputBase
        id="search-bar-input"
        name="searchBarInput"
        placeholder="Type to search"
        className={classes.input}
        value={filter.keyword}
        onChange={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default SearchBar;
