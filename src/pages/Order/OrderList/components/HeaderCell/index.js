// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const HeaderCell = ({
  align,
  order,
  orderBy,
  name,
  onChangeSort,
  style,
  children,
  classes,
}) => {
  return (
    <TableCell align={align} className={classes[`${style}`]}>
      <TableSortLabel
        active={orderBy === name}
        direction={orderBy === name ? order : 'asc'}
        onClick={() => {
          onChangeSort(name);
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

// Component Properties
HeaderCell.propTypes = {
  align: PropTypes.string,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.string,
  onChangeSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
HeaderCell.defaultProps = {
  align: 'left',
  order: 'asc',
  orderBy: 'Num',
  name: 'Num',
  style: 'Num',
};

export default withStyles(styles)(HeaderCell);
