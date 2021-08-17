// Imports
import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// App Imports
import UIButton from '../components/UIButton';
import Search from '../components/Search';

import AddTab from '../Tabs/components/AddTab';

import TooltipWrapper from './TooltipWrapper';

import styles from './styles';

const OrderHeader = ({
  list,
  isParsed,
  createNewBlank,
  openFileFromUser,
  rescanFile,
  isEmptyFilteredData,
  nameOrder,
  onChangeSearchValue,
  searchValue,
  openFolder,
  classes,
}) => {
  const { t } = useTranslation();

  const onChangeSearch = (e) => {
    e.preventDefault();
    onChangeSearchValue(e.target.value);
  };

  const clearSearch = () => {
    onChangeSearchValue('');
  };

  return (
    <>
      <AppBar className={classes.root} position="fixed">
        <Toolbar className={classes.regular}>
          {isParsed === true ? (
            <>
              <div className={classes.addFileContainer}>
                <UIButton
                  className={classes.addFile}
                  color="inherit"
                  variant="outlined"
                  disableRipple
                  onClick={rescanFile}
                >
                  {t('Rescan File')}
                </UIButton>
              </div>

              <div className={classes.titleContainer}>
                <TooltipWrapper
                  fullName={nameOrder.fullName}
                  openFolder={openFolder}
                  titleTooltip={classes.titleTooltip}
                >
                  <Typography
                    color="inherit"
                    component="h1"
                    variant="h6"
                    noWrap
                  >
                    {nameOrder.shortName}
                  </Typography>
                </TooltipWrapper>
              </div>
            </>
          ) : (
            <>
              <div className={classes.addFileContainer}>
                <UIButton
                  className={classes.addFile}
                  color="inherit"
                  variant="outlined"
                  disableRipple
                  onClick={() =>
                    openFileFromUser({
                      isDraged: false,
                      filePath: '',
                    })
                  }
                >
                  {t('Open File')}
                </UIButton>
              </div>

              <div className={classes.titleContainer}>
                <Typography color="inherit" component="h1" variant="h6">
                  {t('New Document')} {nameOrder.shortName}
                </Typography>
              </div>
            </>
          )}

          {/* Add Container */}
          <div className={classes.headerAddContainer}>
            {/* Search */}
            <div
              className={
                isEmptyFilteredData && isParsed
                  ? classes.errorSearchContainer
                  : classes.searchContainer
              }
            >
              <Search
                clearSearch={clearSearch}
                isParsed={isParsed}
                placeholder={t('Search…')}
                value={searchValue}
                onChange={onChangeSearch}
              />
            </div>
            <div className={classes.addButtonContainer}>
              {/* Add Button */}
              {list.length < 2 && (
                <AddTab
                  color="inherit"
                  createNewBlank={createNewBlank}
                  variant="outlined"
                />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

// Component Properties
OrderHeader.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isParsed: PropTypes.bool,
  createNewBlank: PropTypes.func.isRequired,
  openFileFromUser: PropTypes.func.isRequired,
  isEmptyFilteredData: PropTypes.bool,
  nameOrder: PropTypes.shape().isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  openFolder: PropTypes.func.isRequired,
  rescanFile: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OrderHeader.defaultProps = {
  isParsed: false,
  isEmptyFilteredData: false,
  searchValue: '',
};

export default observer(withStyles(styles)(OrderHeader));
