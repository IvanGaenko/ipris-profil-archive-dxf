// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const OptionsContentButtons = ({
  currentOptions,
  toggleAddOptionsContent,
  toggleEditOptionsContent,
  editContentId,
  addOptionsContent,
  cancelAddOptionsContent,
  applyAddOptionsContent,
  editOptionsContent,
  cancelEditOptionsContent,
  classes,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classes.bottomButtonContainer}>
      {toggleAddOptionsContent && (
        <>
          <Button
            className={classes.bottomButton}
            onClick={() => applyAddOptionsContent(currentOptions)}
          >
            {t('Ok')}
          </Button>
          <Button
            className={classes.bottomButton}
            onClick={cancelAddOptionsContent}
          >
            {t('Cancel')}
          </Button>
        </>
      )}
      {toggleEditOptionsContent && (
        <>
          <Button
            className={classes.bottomButton}
            onClick={cancelEditOptionsContent}
          >
            {t('Cancel')}
          </Button>
        </>
      )}
      {toggleAddOptionsContent !== true && toggleEditOptionsContent !== true && (
        <>
          <Button
            className={classes.bottomButton}
            disabled={editContentId !== null}
            onClick={addOptionsContent}
          >
            {t('Add')}
          </Button>
          <Button
            className={classes.bottomButton}
            disabled={editContentId !== null}
            onClick={editOptionsContent}
          >
            {t('Remove')}
          </Button>
        </>
      )}
    </div>
  );
};

// Component Properties
OptionsContentButtons.propTypes = {
  applyAddOptionsContent: PropTypes.func.isRequired,
  cancelAddOptionsContent: PropTypes.func.isRequired,
  toggleAddOptionsContent: PropTypes.bool,
  toggleEditOptionsContent: PropTypes.bool,
  currentOptions: PropTypes.shape().isRequired,
  addOptionsContent: PropTypes.func.isRequired,
  editContentId: PropTypes.number,
  editOptionsContent: PropTypes.func.isRequired,
  cancelEditOptionsContent: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsContentButtons.defaultProps = {
  toggleAddOptionsContent: false,
  toggleEditOptionsContent: false,
  editContentId: null,
};

export default withStyles(styles)(OptionsContentButtons);
