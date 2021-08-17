// Imports
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import GetAppIcon from '@material-ui/icons/GetApp';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const EmptyContent = ({ openFileFromUser, classes }) => {
  const [isHover, setIsHover] = useState(false);
  const { t } = useTranslation();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setIsHover(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsHover(false);
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    setIsHover(false);
    openFileFromUser({
      isDraged: true,
      filePath: files[0].path,
    });
  };

  return (
    <div className={classes.root}>
      <div
        className={isHover ? classes.isHover : classes.emptyContentContainer}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDragOver={dragOver}
        onDrop={fileDrop}
      />
      <GetAppIcon
        className={isHover ? classes.isHoverIcon : classes.emptyContentIcon}
      />
      <Typography
        className={isHover ? classes.isHoverText : classes.emptyContentText}
      >
        {t('Drag File To Open')}
      </Typography>
    </div>
  );
};

// Component Properties
EmptyContent.propTypes = {
  openFileFromUser: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(EmptyContent);
