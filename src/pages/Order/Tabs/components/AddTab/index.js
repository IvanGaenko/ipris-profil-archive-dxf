// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import UIButton from '../../../components/UIButton';

import styles from './styles';

const AddTab = ({ createNewBlank, color, variant, classes }) => {
  return (
    <UIButton
      className={classes.headerAddButton}
      color={color}
      variant={variant}
      onClick={createNewBlank}
    >
      <AddIcon />
    </UIButton>
  );
};

// Component Properties
AddTab.propTypes = {
  createNewBlank: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
AddTab.defaultProps = {
  color: 'primary',
  variant: 'outlined',
};

export default withStyles(styles)(AddTab);
