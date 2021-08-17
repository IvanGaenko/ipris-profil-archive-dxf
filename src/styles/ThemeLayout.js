// Imports
import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

// UI Imports
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// App Imports
import useStores from '../mobx';

import getTheme from './theme';

const ThemeLayout = ({ children }) => {
  const { optionsStore } = useStores();
  const { darkMode } = optionsStore;

  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// Component Properties
ThemeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(ThemeLayout);
