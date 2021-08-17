// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const BodyCell = ({ openFile, row, classes }) => {
  const {
    Num,
    Name,
    Definion,
    Count,
    data,
    archiveFileName,
    archiveFilePath,
    Prev,
    Operations,
    Next,
  } = row;
  const { t } = useTranslation();

  return (
    <>
      <TableCell
        align="right"
        className={classes.Num}
        component="th"
        scope="row"
      >
        {Num}
      </TableCell>

      <TableCell align="left" className={classes.Name}>
        {Name}
      </TableCell>

      <TableCell align="left" className={classes.Definion}>
        {Definion}
      </TableCell>

      <TableCell align="right" className={classes.Count}>
        {Count}
      </TableCell>

      <TableCell align="left" className={classes.data}>
        {data === 'Yes' ? t('Yes') : t('No')}
      </TableCell>

      {data === 'Yes' ? (
        <TableCell
          align="left"
          className={classes.dataWithTooltip}
          onClick={() => openFile(archiveFilePath)}
        >
          <>{t('Yes')}</>
        </TableCell>
      ) : (
        <TableCell align="left" className={classes.dataWithTooltipEmpty}>
          {t('No')}
        </TableCell>
      )}

      {archiveFileName === '-' ? (
        <TableCell align="left" className={classes.archiveFileNameEmpty}>
          {archiveFileName}
        </TableCell>
      ) : (
        <TableCell
          align="left"
          className={classes.archiveFileName}
          onClick={() => openFile(archiveFilePath)}
        >
          {archiveFileName}
        </TableCell>
      )}

      <TableCell align="left" className={classes.Prev}>
        {Prev}
      </TableCell>

      <TableCell align="left" className={classes.Operations}>
        {Operations}
      </TableCell>

      <TableCell align="left" className={classes.Next}>
        {Next}
      </TableCell>
    </>
  );
};

// Component Properties
BodyCell.propTypes = {
  openFile: PropTypes.func.isRequired,
  row: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(BodyCell);
