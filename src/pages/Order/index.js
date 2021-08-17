// Imports
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

// App Imports
import useStores from '../../mobx';

import Loading from '../../modules/Loading';
import EmptyContent from '../../modules/EmptyContent';
import Notification from '../../modules/Notification';

import OrderHeader from './OrderHeader';

import OrderOptions from './OrderOptions';

import OrderTabs from './Tabs';

import OrderList from './OrderList';

const Order = () => {
  const { orderStore, optionsStore, notificationStore } = useStores();
  const { currentOrder } = orderStore;

  useEffect(() => {
    if (optionsStore.optionsShouldUpdate) {
      window.api.send('queueInitialOptions');
    }

    window.api.receive('getInitialOptions', (data) => {
      optionsStore.getInitialOptions(data);
    });

    window.api.receive('openOptions', () => {
      optionsStore.openOptions();
    });

    window.api.receive('menu', (data) => {
      orderStore.menuCommands(data);
    });

    window.api.receive('getFilesFromUser', (data) => {
      if (data.data.length === 0) {
        orderStore.loadingCurrentOrder({ _id: currentOrder.id, value: false });

        return;
      }
      orderStore.addOrder({ value: data, _id: currentOrder.id });
      orderStore.loadingCurrentOrder({ _id: currentOrder.id, value: false });
    });

    window.api.receive('rescanedOrderToUser', (value) => {
      orderStore.updateCurrentOrder({ _id: currentOrder.id, value });
      orderStore.loadingCurrentOrder({ _id: currentOrder.id, value: false });
    });

    window.api.receive('startLoading', (data) => {
      orderStore.loadingCurrentOrder({ _id: currentOrder.id, value: data });
    });

    window.api.receive('saveFileToUser', () => {
      const filesToSave = orderStore.getFilesToSave();
      window.api.send('saveFileFromUser', filesToSave);
    });

    window.api.receive('sendNotificationToUser', (data) => {
      notificationStore.showNotification(data);
    });

    return () => {
      window.api.clearEvents('menu');
      window.api.clearEvents('getFilesFromUser');
      window.api.clearEvents('rescanedOrderToUser');
      window.api.clearEvents('startLoading');
      window.api.clearEvents('saveFileToUser');
      window.api.clearEvents('sendNotificationToUser');
      window.api.clearEvents('getInitialOptions');
      window.api.clearEvents('openOptions');
    };
  });

  const openFileFromUser = (args) => {
    window.api.send('openFileFromUser', args);
  };

  const openFolder = (args) => {
    window.api.send('openFolder', args);
  };

  const rescanFile = () => {
    const { shortName, fullName } = currentOrder.name;
    window.api.send('rescanOrder', {
      shortName,
      fullName,
    });
  };

  const openFile = (args) => {
    window.api.send('openFile', args);
  };

  const sendOptionsToStore = () => {
    optionsStore.submitOptions();
    const isChangedOptions = optionsStore.isChangedOptions();
    window.api.send('sendOptionsToStore', {
      isChangedOptions,
      optionsData: JSON.stringify(optionsStore.options),
    });
  };

  return (
    <>
      {/* Options */}
      {optionsStore.toggleOptions && (
        <OrderOptions
          addOptionsContent={optionsStore.addOptionsContent}
          applyAddOptionsContent={optionsStore.applyAddOptionsContent}
          applyInputOption={optionsStore.applyInputOption}
          cancelAddOptionsContent={optionsStore.cancelAddOptionsContent}
          cancelEditOptionsContent={optionsStore.cancelEditOptionsContent}
          cancelOptions={optionsStore.cancelOptions}
          currentOptions={optionsStore.currentOptions}
          darkMode={optionsStore.darkMode}
          deleteOptionsContent={optionsStore.deleteOptionsContent}
          editContentId={optionsStore.editContentId}
          editInputOption={optionsStore.editInputOption}
          editOptionsContent={optionsStore.editOptionsContent}
          errorInput={optionsStore.errorInput}
          inputOptionValue={optionsStore.inputOptionValue}
          open={optionsStore.toggleOptions}
          options={optionsStore.options}
          selectCurrentOptions={optionsStore.selectCurrentOptions}
          sendOptionsToStore={sendOptionsToStore}
          toggleAddOptionsContent={optionsStore.toggleAddOptionsContent}
          toggleEditInputOption={optionsStore.toggleEditInputOption}
          toggleEditOptionsContent={optionsStore.toggleEditOptionsContent}
          onChangeInputOption={optionsStore.onChangeInputOption}
        />
      )}

      {/* Header */}
      <OrderHeader
        createNewBlank={orderStore.createNewBlank}
        isEmptyFilteredData={orderStore.isEmptyFilteredData}
        isParsed={currentOrder.isParsed}
        list={orderStore.orders}
        nameOrder={currentOrder.name}
        openFileFromUser={openFileFromUser}
        openFolder={openFolder}
        rescanFile={rescanFile}
        searchValue={orderStore.searchValue}
        onChangeSearchValue={orderStore.onChangeSearchValue}
      />

      {/* Tabs */}
      {orderStore.orders.length > 1 && (
        <OrderTabs
          createNewBlank={orderStore.createNewBlank}
          currentOrderId={currentOrder.id}
          list={orderStore.orders}
          removeOrder={orderStore.removeOrder}
          selectCurrentOrder={orderStore.selectCurrentOrder}
        />
      )}

      {/* Order */}
      {currentOrder.isLoading === true ? (
        <Loading open={currentOrder.isLoading} />
      ) : (
        currentOrder.data.length > 0 && (
          <OrderList
            changeSortDirection={orderStore.changeSortDirection}
            currentOrderId={currentOrder.id}
            openFile={openFile}
            sortTableData={orderStore.sortTableData}
            tableSort={currentOrder.tableSort}
          />
        )
      )}

      {/* EmptyContent */}
      {currentOrder.data.length === 0 && (
        <EmptyContent
          openFileFromUser={openFileFromUser}
          showNotification={notificationStore.showNotification}
        />
      )}

      {/* Notification */}
      {notificationStore.notification.open && (
        <Notification
          closeNotification={notificationStore.closeNotification}
          data={notificationStore.notification}
        />
      )}
    </>
  );
};

export default observer(Order);
