import { createContext, useContext } from 'react';

import OrderStore from './orderStore';
import OptionsStore from './optionsStore';
import NotificationStore from './notificationStore';

export const CombineStore = {
  orderStore: new OrderStore(),
  optionsStore: new OptionsStore(),
  notificationStore: new NotificationStore(),
};

const StoresContext = createContext(CombineStore);

const useStores = () => useContext(StoresContext);

export default useStores;
