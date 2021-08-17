// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

// App Imports
import OptionsList from './components/OptionsList';
import OptionsContent from './components/OptionsContent';

import styles from './styles';

const OrderOptions = ({
  open,
  options,
  sendOptionsToStore,
  toggleEditOptionsContent,
  cancelOptions,
  currentOptions,
  editOptionsContent,
  toggleAddOptionsContent,
  addOptionsContent,
  selectCurrentOptions,
  toggleEditInputOption,
  inputOptionValue,
  onChangeInputOption,
  errorInput,
  editContentId,
  darkMode,
  editInputOption,
  applyInputOption,
  applyAddOptionsContent,
  cancelAddOptionsContent,
  cancelEditOptionsContent,
  deleteOptionsContent,
  classes,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={cancelOptions}>
      <div className={classes.root}>
        {/* Header */}
        <div className={classes.optionsHeaderContainer}>
          <div className={classes.optionsHeaderLeftContainer} />
          <Typography>{t('Options')}</Typography>
          <div className={classes.optionsHeaderCloseContainer}>
            <IconButton
              className={classes.closeSearchIcon}
              size="small"
              onClick={cancelOptions}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        {/* Body */}
        <div className={classes.optionsBodyContainer}>
          <div className={classes.leftColumnContainer}>
            <OptionsList
              currentOptionsId={currentOptions.header.id}
              listData={options}
              selectCurrentOptions={selectCurrentOptions}
            />
          </div>
          <Divider
            className={classes.optionsDivider}
            orientation="vertical"
            flexItem
          />
          <div className={classes.rightColumnContainer}>
            <OptionsContent
              addOptionsContent={addOptionsContent}
              applyAddOptionsContent={applyAddOptionsContent}
              applyInputOption={applyInputOption}
              cancelAddOptionsContent={cancelAddOptionsContent}
              cancelEditOptionsContent={cancelEditOptionsContent}
              currentOptions={currentOptions}
              darkMode={darkMode}
              deleteOptionsContent={deleteOptionsContent}
              editContentId={editContentId}
              editInputOption={editInputOption}
              editOptionsContent={editOptionsContent}
              errorInput={errorInput}
              inputOptionValue={inputOptionValue}
              toggleAddOptionsContent={toggleAddOptionsContent}
              toggleEditInputOption={toggleEditInputOption}
              toggleEditOptionsContent={toggleEditOptionsContent}
              onChangeInputOption={onChangeInputOption}
            />
          </div>
        </div>
        <div className={classes.optionsButtonContainer}>
          <Button
            disabled={editContentId !== null}
            onClick={sendOptionsToStore}
          >
            {t('Ok')}
          </Button>
          <Button disabled={editContentId !== null} onClick={cancelOptions}>
            {t('Cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Component Properties
OrderOptions.propTypes = {
  open: PropTypes.bool,
  options: PropTypes.shape().isRequired,
  currentOptions: PropTypes.shape().isRequired,
  sendOptionsToStore: PropTypes.func.isRequired,
  toggleEditOptionsContent: PropTypes.bool,
  toggleAddOptionsContent: PropTypes.bool,
  toggleEditInputOption: PropTypes.bool,
  errorInput: PropTypes.bool,
  darkMode: PropTypes.bool,
  cancelOptions: PropTypes.func.isRequired,
  editOptionsContent: PropTypes.func.isRequired,
  addOptionsContent: PropTypes.func.isRequired,
  selectCurrentOptions: PropTypes.func.isRequired,
  onChangeInputOption: PropTypes.func.isRequired,
  editInputOption: PropTypes.func.isRequired,
  applyInputOption: PropTypes.func.isRequired,
  applyAddOptionsContent: PropTypes.func.isRequired,
  cancelAddOptionsContent: PropTypes.func.isRequired,
  cancelEditOptionsContent: PropTypes.func.isRequired,
  deleteOptionsContent: PropTypes.func.isRequired,
  inputOptionValue: PropTypes.string,
  editContentId: PropTypes.number,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OrderOptions.defaultProps = {
  open: false,
  toggleEditOptionsContent: false,
  toggleAddOptionsContent: false,
  toggleEditInputOption: false,
  darkMode: false,
  errorInput: false,
  inputOptionValue: '',
  editContentId: null,
};

export default withStyles(styles)(OrderOptions);
