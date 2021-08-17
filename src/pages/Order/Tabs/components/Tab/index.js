// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const Tab = ({
  l,
  removeOrder,
  selectCurrentOrder,
  currentOrderId,
  children,
  classes,
}) => {
  return (
    <Button
      className={currentOrderId === l.id ? classes.tabSelected : classes.tab}
      color="secondary"
      variant="outlined"
    >
      <div className={classes.buttonContainer}>
        <div
          aria-hidden="true"
          className={classes.closeButtonContainer}
          onClick={() => removeOrder(l.id)}
        >
          <CloseIcon />
        </div>
        <div
          aria-hidden="true"
          className={classes.tabNameContainer}
          onClick={() => selectCurrentOrder(l.id)}
        >
          <Typography noWrap>{children}</Typography>
        </div>
      </div>
    </Button>
  );
};

// Component Properties
Tab.propTypes = {
  l: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  currentOrderId: PropTypes.number,
  removeOrder: PropTypes.func.isRequired,
  selectCurrentOrder: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
Tab.defaultProps = {
  currentOrderId: 1,
};

export default withStyles(styles)(Tab);
