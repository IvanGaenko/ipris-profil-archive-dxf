// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Loading = ({ open, classes }) => {
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

// Component Properties
Loading.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
Loading.defaultProps = {
  open: true,
};

export default withStyles(styles)(Loading);
