// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Notification = ({ data, closeNotification, classes }) => {
  const { open, status, value } = data;

  return (
    <Snackbar
      ContentProps={{
        className:
          status === 'OK' ? classes.snackbarSuccess : classes.snackbarError,
      }}
      action={
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeNotification}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
      message={value}
      open={open}
      onClose={closeNotification}
    />
  );
};

// Component Properties
Notification.propTypes = {
  closeNotification: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Notification);
