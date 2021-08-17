// Imports
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto';
import { I18nextProvider } from 'react-i18next';

// App Imports
import i18n from './localization/i18next.config';

import { CombineStore } from './mobx';
import ThemeLayout from './styles/ThemeLayout';
import RouterConfig from './navigation/RouterConfig';

const StoreContext = createContext();

// Render App
ReactDOM.render(
  <StoreContext.Provider value={CombineStore}>
    <I18nextProvider i18n={i18n}>
      <ThemeLayout>
        <RouterConfig />
      </ThemeLayout>
    </I18nextProvider>
  </StoreContext.Provider>,
  document.getElementById('root'),
);
