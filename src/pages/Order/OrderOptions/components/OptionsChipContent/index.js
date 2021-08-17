// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

// App Imports
import OptionsContentButtons from '../OptionsContentButtons';

import styles from './styles';

const OptionsChipContent = ({
  currentOptions,
  toggleAddOptionsContent,
  toggleEditOptionsContent,
  editContentId,
  errorInput,
  addOptionsContent,
  cancelAddOptionsContent,
  applyAddOptionsContent,
  editOptionsContent,
  cancelEditOptionsContent,
  inputOptionValue,
  onChangeInput,
  deleteOptionsContent,
  classes,
}) => {
  return (
    <div className={classes.optionsChipContainer}>
      <div className={classes.optionsChipRow}>
        {currentOptions.content.map((content) => (
          <div key={content.contentId} className={classes.optionsChip}>
            {/* Default Chip Options */}
            {toggleEditOptionsContent !== true &&
              editContentId !== content.contentId && (
                <Chip label={content.contentValue} />
              )}

            {/* Edit Options List */}
            {toggleEditOptionsContent && (
              <Chip
                label={content.contentValue}
                onDelete={() =>
                  deleteOptionsContent({
                    headerValue: currentOptions.header.value,
                    contentId: content.contentId,
                  })
                }
              />
            )}
          </div>
        ))}
        {/* Add New Chip Option */}
        {toggleAddOptionsContent && (
          <div className={classes.optionsChip}>
            <Chip
              label={
                <TextField
                  InputProps={{
                    className: classes.textField,
                  }}
                  error={errorInput}
                  size="small"
                  style={{ width: '3rem' }}
                  value={inputOptionValue}
                  autoFocus
                  onChange={onChangeInput}
                />
              }
            />
          </div>
        )}
      </div>

      {/* Button */}
      <OptionsContentButtons
        addOptionsContent={addOptionsContent}
        applyAddOptionsContent={applyAddOptionsContent}
        cancelAddOptionsContent={cancelAddOptionsContent}
        cancelEditOptionsContent={cancelEditOptionsContent}
        currentOptions={currentOptions}
        editContentId={editContentId}
        editOptionsContent={editOptionsContent}
        toggleAddOptionsContent={toggleAddOptionsContent}
        toggleEditOptionsContent={toggleEditOptionsContent}
      />
    </div>
  );
};

// Component Properties
OptionsChipContent.propTypes = {
  editOptionsContent: PropTypes.func.isRequired,
  cancelEditOptionsContent: PropTypes.func.isRequired,
  toggleAddOptionsContent: PropTypes.bool,
  toggleEditOptionsContent: PropTypes.bool,
  errorInput: PropTypes.bool,
  currentOptions: PropTypes.shape().isRequired,
  addOptionsContent: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  deleteOptionsContent: PropTypes.func.isRequired,
  inputOptionValue: PropTypes.string,
  editContentId: PropTypes.number,
  cancelAddOptionsContent: PropTypes.func.isRequired,
  applyAddOptionsContent: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsChipContent.defaultProps = {
  toggleAddOptionsContent: false,
  toggleEditOptionsContent: false,
  errorInput: false,
  inputOptionValue: '',
  editContentId: null,
};

export default withStyles(styles)(OptionsChipContent);
