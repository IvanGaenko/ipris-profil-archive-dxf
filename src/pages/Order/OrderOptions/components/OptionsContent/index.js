// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

// App Imports
import OptionsInputContent from '../OptionsInputContent';
import OptionsChipContent from '../OptionsChipContent';
import OptionsListContent from '../OptionsListContent';
import OptionsSelectContent from '../OptionsSelectContent';

import styles from './styles';

const OptionsContent = ({
  currentOptions,
  darkMode,
  toggleAddOptionsContent,
  deleteOptionsContent,
  addOptionsContent,
  errorInput,
  editOptionsContent,
  inputOptionValue,
  editInputOption,
  applyInputOption,
  onChangeInputOption,
  toggleEditOptionsContent,
  applyAddOptionsContent,
  cancelAddOptionsContent,
  cancelEditOptionsContent,
  editContentId,
  classes,
}) => {
  const { t } = useTranslation();

  const onChangeInput = (e) => {
    e.preventDefault();
    onChangeInputOption(e.target.value);
  };

  const applyInput = (args) => {
    applyInputOption(args);
  };

  return (
    <div className={classes.optionsContentContainer}>
      {/* Switch */}
      {currentOptions.header.type === 'switch' && (
        <div className={classes.switchContainer}>
          <Typography>
            {darkMode === true ? t('Темная тема') : t('Светлая тема')}
          </Typography>
          <Switch
            checked={darkMode}
            color="primary"
            onChange={() =>
              applyInput({
                optionType: currentOptions.header.type,
                optionValue: currentOptions.header.value,
                contentId: currentOptions.content[0].contentId,
              })
            }
          />
        </div>
      )}

      {/* Input */}
      {currentOptions.header.type === 'input' && (
        <OptionsInputContent
          addOptionsContent={addOptionsContent}
          applyAddOptionsContent={applyAddOptionsContent}
          applyInput={applyInput}
          cancelAddOptionsContent={cancelAddOptionsContent}
          cancelEditOptionsContent={cancelEditOptionsContent}
          currentOptions={currentOptions}
          deleteOptionsContent={deleteOptionsContent}
          editContentId={editContentId}
          editInputOption={editInputOption}
          editOptionsContent={editOptionsContent}
          errorInput={errorInput}
          inputOptionValue={inputOptionValue}
          toggleAddOptionsContent={toggleAddOptionsContent}
          toggleEditOptionsContent={toggleEditOptionsContent}
          onChangeInput={onChangeInput}
        />
      )}

      {/* Chip */}
      {currentOptions.header.type === 'chip' && (
        <OptionsChipContent
          addOptionsContent={addOptionsContent}
          applyAddOptionsContent={applyAddOptionsContent}
          cancelAddOptionsContent={cancelAddOptionsContent}
          cancelEditOptionsContent={cancelEditOptionsContent}
          currentOptions={currentOptions}
          deleteOptionsContent={deleteOptionsContent}
          editContentId={editContentId}
          editOptionsContent={editOptionsContent}
          errorInput={errorInput}
          inputOptionValue={inputOptionValue}
          toggleAddOptionsContent={toggleAddOptionsContent}
          toggleEditOptionsContent={toggleEditOptionsContent}
          onChangeInput={onChangeInput}
        />
      )}

      {/* List */}
      {currentOptions.header.type === 'list' && (
        <OptionsListContent
          applyInput={applyInput}
          currentOptions={currentOptions}
          deleteOptionsContent={deleteOptionsContent}
          editContentId={editContentId}
          editInputOption={editInputOption}
          errorInput={errorInput}
          inputOptionValue={inputOptionValue}
          toggleAddOptionsContent={toggleAddOptionsContent}
          toggleEditOptionsContent={toggleEditOptionsContent}
          onChangeInput={onChangeInput}
        />
      )}

      {/* Select */}
      {currentOptions.header.type === 'select' && (
        <OptionsSelectContent
          applyInput={applyInput}
          currentOptions={currentOptions}
          deleteOptionsContent={deleteOptionsContent}
          editContentId={editContentId}
          editInputOption={editInputOption}
          errorInput={errorInput}
          inputOptionValue={inputOptionValue}
          toggleAddOptionsContent={toggleAddOptionsContent}
          toggleEditOptionsContent={toggleEditOptionsContent}
          onChangeInput={onChangeInput}
        />
      )}
    </div>
  );
};

// Component Properties
OptionsContent.propTypes = {
  darkMode: PropTypes.bool,
  toggleAddOptionsContent: PropTypes.bool,
  errorInput: PropTypes.bool,
  toggleEditOptionsContent: PropTypes.bool,
  currentOptions: PropTypes.shape().isRequired,
  deleteOptionsContent: PropTypes.func.isRequired,
  addOptionsContent: PropTypes.func.isRequired,
  editOptionsContent: PropTypes.func.isRequired,
  editInputOption: PropTypes.func.isRequired,
  applyInputOption: PropTypes.func.isRequired,
  onChangeInputOption: PropTypes.func.isRequired,
  applyAddOptionsContent: PropTypes.func.isRequired,
  cancelAddOptionsContent: PropTypes.func.isRequired,
  cancelEditOptionsContent: PropTypes.func.isRequired,
  inputOptionValue: PropTypes.string,
  editContentId: PropTypes.number,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsContent.defaultProps = {
  darkMode: false,
  errorInput: false,
  toggleAddOptionsContent: false,
  toggleEditOptionsContent: false,
  editContentId: null,
  inputOptionValue: '',
};

export default withStyles(styles)(OptionsContent);
