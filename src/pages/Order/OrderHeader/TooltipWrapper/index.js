// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const TooltipWrapper = ({ children, openFolder, fullName, classes }) => {
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={
        <div className={classes.titleTooltipContainer}>
          <Typography
            className={classes.titleTooltip}
            color="inherit"
            variant="body2"
            noWrap
            onClick={() => {
              openFolder(fullName);
            }}
          >
            {fullName}
          </Typography>
          <OpenInNewIcon />
        </div>
      }
      arrow
      interactive
    >
      {children}
    </Tooltip>
  );
};

// Component Properties
TooltipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  openFolder: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(TooltipWrapper);
