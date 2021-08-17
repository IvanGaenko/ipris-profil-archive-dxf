// Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// UI Imports
import { withStyles } from '@material-ui/core/styles';

// App Imports
import AddTab from './components/AddTab';
import Tab from './components/Tab';

import styles from './styles';

const OrderTabs = ({
  list,
  removeOrder,
  selectCurrentOrder,
  createNewBlank,
  currentOrderId,
  classes,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      {list.map((l) => (
        <Tab
          key={l.id}
          currentOrderId={currentOrderId}
          l={l}
          removeOrder={removeOrder}
          selectCurrentOrder={selectCurrentOrder}
        >
          {l.isParsed === true ? (
            <>{l.name.shortName}</>
          ) : (
            <>
              {t('New Document')} {l.name.shortName}
            </>
          )}
        </Tab>
      ))}
      {list.length > 1 && (
        <AddTab
          color="secondary"
          createNewBlank={createNewBlank}
          variant="outlined"
        />
      )}
    </div>
  );
};

// Component Properties
OrderTabs.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  createNewBlank: PropTypes.func.isRequired,
  removeOrder: PropTypes.func.isRequired,
  currentOrderId: PropTypes.number,
  selectCurrentOrder: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

// Component Default Properties
OrderTabs.defaultProps = {
  currentOrderId: 1,
};

export default withStyles(styles)(OrderTabs);
