// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const OptionsListContent = ({
  currentOptions,
  toggleAddOptionsContent,
  toggleEditOptionsContent,
  editContentId,
  errorInput,
  inputOptionValue,
  onChangeInput,
  applyInput,
  deleteOptionsContent,
  editInputOption,
  classes,
}) => {
  const { t } = useTranslation();

  const headersList = [
    {
      contentId: 1,
      contentValue: 'A',
    },
    {
      contentId: 2,
      contentValue: 'B',
    },
    {
      contentId: 3,
      contentValue: 'C',
    },
    {
      contentId: 4,
      contentValue: 'D',
    },
    {
      contentId: 5,
      contentValue: 'E',
    },
    {
      contentId: 6,
      contentValue: 'F',
    },
    {
      contentId: 7,
      contentValue: 'G',
    },
  ];

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
            className={classes.selectItemContainer}
            divider
          >
            {/* Edit current input option */}
            {editContentId === content.contentId && (
              <>
                <div className={classes.selectItemWrapper}>
                  <ListItemText
                    className={classes.contentName}
                    primary={content.contentName}
                  />
                  <Select value={inputOptionValue} onChange={onChangeInput}>
                    {headersList.map((list) => (
                      <MenuItem key={list.contentId} value={list.contentValue}>
                        {t(`${list.contentValue}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.selectEditButton}>
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
                </div>
              </>
            )}

            {/* Edit Options List */}
            {toggleEditOptionsContent && (
              <>
                <ListItemText
                  className={classes.inputText}
                  primary={content.contentName}
                />
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
                  <div className={classes.selectItemWrapper}>
                    <ListItemText
                      className={classes.contentName}
                      primary={t(`${content.contentName}`)}
                    />
                    <ListItemText
                      className={classes.contentValue}
                      secondary={t(`${content.contentValue}`)}
                    />
                  </div>
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
    </div>
  );
};

// Component Properties
OptionsListContent.propTypes = {
  applyInput: PropTypes.func.isRequired,
  toggleAddOptionsContent: PropTypes.bool,
  toggleEditOptionsContent: PropTypes.bool,
  errorInput: PropTypes.bool,
  currentOptions: PropTypes.shape().isRequired,
  onChangeInput: PropTypes.func.isRequired,
  inputOptionValue: PropTypes.string,
  editContentId: PropTypes.number,
  deleteOptionsContent: PropTypes.func.isRequired,
  editInputOption: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsListContent.defaultProps = {
  toggleAddOptionsContent: false,
  toggleEditOptionsContent: false,
  errorInput: false,
  inputOptionValue: '',
  editContentId: null,
};

export default withStyles(styles)(OptionsListContent);
