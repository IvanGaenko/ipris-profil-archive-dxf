// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Search = ({
  isParsed,
  placeholder,
  onChange,
  value,
  clearSearch,
  classes,
}) => {
  return (
    <>
      <div className={classes.searchIcon}>
        <SearchIcon color="inherit" />
      </div>
      <InputBase
        className={classes.searchContent}
        color="secondary"
        disabled={!isParsed}
        placeholder={placeholder}
        value={isParsed ? value : placeholder}
        onChange={onChange}
      />
      {value !== '' && isParsed && (
        <IconButton
          className={classes.closeSearchIcon}
          color="inherit"
          disabled={!isParsed}
          disableRipple
          onClick={clearSearch}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
};

// Component Properties
Search.propTypes = {
  isParsed: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
Search.defaultProps = {
  isParsed: false,
  placeholder: '',
  value: '',
};

export default withStyles(styles)(Search);
