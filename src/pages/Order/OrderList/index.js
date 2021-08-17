// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// App Imports
import HeaderCell from './components/HeaderCell';
import BodyCell from './components/BodyCell';

import styles from './styles';

const headerData = [
  {
    id: 1,
    name: 'Num',
    value: 'Num',
    align: 'right',
    style: 'Num',
  },
  {
    id: 2,
    name: 'Name',
    value: 'Name',
    align: 'left',
    style: 'Name',
  },
  {
    id: 3,
    name: 'Definion',
    value: 'Definion',
    align: 'left',
    style: 'Definion',
  },
  {
    id: 4,
    name: 'Count',
    value: 'Count',
    align: 'right',
    style: 'Count',
  },
  {
    id: 5,
    name: 'data',
    value: 'Data',
    align: 'left',
    style: 'data',
  },
  {
    id: 6,
    name: 'data',
    value: 'Data',
    align: 'left',
    style: 'dataWithTooltip',
  },
  {
    id: 7,
    name: 'archiveFileName',
    value: 'File',
    align: 'left',
    style: 'archiveFileName',
  },
  {
    id: 8,
    name: 'Prev',
    value: 'Prev',
    align: 'left',
    style: 'Prev',
  },
  {
    id: 9,
    name: 'Operations',
    value: 'Operations',
    align: 'left',
    style: 'Operations',
  },
  {
    id: 10,
    name: 'Next',
    value: 'Next',
    align: 'left',
    style: 'Next',
  },
];

const OrderList = ({
  tableSort,
  openFile,
  currentOrderId,
  sortTableData,
  changeSortDirection,
  classes,
}) => {
  const { order, orderBy } = tableSort;
  const { t } = useTranslation();

  const onChangeSort = (value) => {
    const isAsc = orderBy === value && order === 'asc';
    changeSortDirection({
      _id: currentOrderId,
      _order: isAsc ? 'desc' : 'asc',
      _orderBy: value,
    });
  };

  return (
    <TableContainer className={classes.root}>
      <Paper className={classes.paperContainer} variant="outlined">
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeaderRow} hover>
              {headerData.map((header) => (
                <HeaderCell
                  key={header.id}
                  align={header.align}
                  name={header.name}
                  order={order}
                  orderBy={orderBy}
                  style={header.style}
                  onChangeSort={onChangeSort}
                >
                  {t(`${header.value}`)}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortTableData.map((l) => (
              <TableRow key={l.Num} className={classes.tableBodyRow} hover>
                <BodyCell openFile={openFile} row={l} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
};

// Component Properties
OrderList.propTypes = {
  tableSort: PropTypes.shape().isRequired,
  openFile: PropTypes.func.isRequired,
  currentOrderId: PropTypes.number,
  sortTableData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  changeSortDirection: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OrderList.defaultProps = {
  currentOrderId: 1,
};

export default withStyles(styles)(React.memo(OrderList));
