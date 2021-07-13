import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { SORT_BY_EPISODE, SORT_BY_YEAR } from '../../constants/SortTypes';
import './sortOptions.scss';

const useStyle = makeStyles({
  button: {
    background: 'white',
    textTransform: 'none',
  },
});

const SortOptions = ({ setSortOption }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSortOption = (sortOption) => {
    setSortOption(sortOption);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'sort-popover' : undefined;
  return (
    <>
      <Button className={classes.button} variant="outlined" onClick={handleClick}>
        Sort By...
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <div className="sort-popover">
          <div className="sort-popover__header">
            <span className="sort-popover__title">Sort by</span>
            <IconButton type="button" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="sort-popover__body">
            <Button type="button" onClick={() => handleSortOption(SORT_BY_YEAR)}>
              Year
            </Button>
            <Button type="button" onClick={() => handleSortOption(SORT_BY_EPISODE)}>
              Episode
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

SortOptions.propTypes = {
  setSortOption: PropTypes.func.isRequired,
};

export default SortOptions;
