// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

// App Imports
import OptionsContentButtons from '../OptionsContentButtons';

import styles from './styles';

const OptionsInputContent = ({
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
  applyInput,
  deleteOptionsContent,
  editInputOption,
  classes,
}) => {
  return (
    <div className={classes.listContainer}>
      <List
        className={classes.listContent}
        component="div"
        dense
        disablePadding
      >
        {currentOptions.content.map((content) => (
          <ListItem
            key={content.contentId}
            className={classes.listItemContainer}
            divider
          >
            {/* Edit current input option */}
            {editContentId === content.contentId && (
              <>
                <TextField
                  InputProps={{
                    className: classes.textField,
                  }}
                  error={errorInput}
                  size="small"
                  value={inputOptionValue}
                  autoFocus
                  fullWidth
                  onChange={onChangeInput}
                />
                <IconButton
                  size="small"
                  onClick={() =>
                    applyInput({
                      optionType: currentOptions.header.type,
                      optionValue: currentOptions.header.value,
                      contentId: content.contentId,
                    })
                  }
                >
                  <DoneIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    editInputOption({
                      _id: content.contentId,
                      _value: content.contentValue,
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}

            {/* Edit Options List */}
            {toggleEditOptionsContent && (
              <>
                <ListItemText
                  className={classes.inputText}
                  secondary={content.contentValue}
                />
                {content.contentId !== 1 && (
                  <IconButton
                    size="small"
                    onClick={() =>
                      deleteOptionsContent({
                        headerValue: currentOptions.header.value,
                        contentId: content.contentId,
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </>
            )}

            {/* Default Input Options */}
            {toggleEditOptionsContent !== true &&
              editContentId !== content.contentId && (
                <>
                  <ListItemText
                    className={classes.inputText}
                    secondary={content.contentValue}
                  />
                  <IconButton
                    disabled={toggleAddOptionsContent}
                    size="small"
                    onClick={() =>
                      editInputOption({
                        _id: content.contentId,
                        _value: content.contentValue,
                      })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </>
              )}
          </ListItem>
        ))}

        {/* Add New Input Option */}
        {toggleAddOptionsContent && (
          <ListItem className={classes.listItemContainer} divider>
            <TextField
              InputProps={{
                className: classes.textField,
              }}
              error={errorInput}
              size="small"
              value={inputOptionValue}
              autoFocus
              fullWidth
              onChange={onChangeInput}
            />
          </ListItem>
        )}
      </List>

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
OptionsInputContent.propTypes = {
  addOptionsContent: PropTypes.func.isRequired,
  cancelAddOptionsContent: PropTypes.func.isRequired,
  toggleAddOptionsContent: PropTypes.bool,
  toggleEditOptionsContent: PropTypes.bool,
  errorInput: PropTypes.bool,
  currentOptions: PropTypes.shape().isRequired,
  applyAddOptionsContent: PropTypes.func.isRequired,
  editOptionsContent: PropTypes.func.isRequired,
  cancelEditOptionsContent: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  inputOptionValue: PropTypes.string,
  editContentId: PropTypes.number,
  applyInput: PropTypes.func.isRequired,
  deleteOptionsContent: PropTypes.func.isRequired,
  editInputOption: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsInputContent.defaultProps = {
  toggleAddOptionsContent: false,
  toggleEditOptionsContent: false,
  errorInput: false,
  inputOptionValue: '',
  editContentId: null,
};

export default withStyles(styles)(OptionsInputContent);
