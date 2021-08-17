// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const UIButton = (props) => {
  const {
    color,
    variant,
    children,
    component,
    onClick,
    className,
    classes,
    ...rest
  } = props;

  return (
    <Button
      className={className}
      color={color}
      component={component}
      disableRipple={rest.disableRipple || true}
      variant={variant}
      onClick={onClick}
    >
      <Typography className={classes.content}>{children}</Typography>
    </Button>
  );
};

// Component Properties
UIButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  component: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
UIButton.defaultProps = {
  color: 'primary',
  variant: 'outlined',
  component: 'h1',
  className: '',
};

export default withStyles(styles)(UIButton);
