// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const OptionsList = ({
  listData,
  currentOptionsId,
  selectCurrentOptions,
  classes,
}) => {
  const { t } = useTranslation();

  return (
    <List className={classes.root} component="div" dense disablePadding>
      {listData &&
        listData.header.map((list) => (
          <ListItem
            key={list.id}
            selected={list.id === currentOptionsId}
            button
            divider
            onClick={() => selectCurrentOptions(list.id)}
          >
            <ListItemText primary={t(`${list.label}`)} />
          </ListItem>
        ))}
    </List>
  );
};

// Component Properties
OptionsList.propTypes = {
  listData: PropTypes.shape().isRequired,
  currentOptionsId: PropTypes.number,
  selectCurrentOptions: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OptionsList.defaultProps = {
  currentOptionsId: 1,
};

export default withStyles(styles)(OptionsList);
