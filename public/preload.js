const { contextBridge, ipcRenderer } = require('electron');
const backend = require('i18next-electron-fs-backend');

contextBridge.exposeInMainWorld('api', {
  i18nextElectronBackend: backend.preloadBindings(ipcRenderer),
  send: (channel, data) => {
    // whitelist channels
    const validChannels = [
      'toMain',
      'openFile',
      'openFileFromUser',
      'rescanOrder',
      'saveFileFromUser',
      'openFolder',
      'queueInitialOptions',
      'changeLanguage',
      'sendOptionsToStore',
    ];

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = [
      'menu',
      'getFilesFromUser',
      'rescanedOrderToUser',
      'startLoading',
      'saveFileToUser',
      'sendNotificationToUser',
      'getInitialOptions',
      'openOptions',
      'updateTabsLang',
    ];

    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  clearEvents: (channel) => {
    const validChannels = [
      'menu',
      'getFilesFromUser',
      'rescanedOrderToUser',
      'startLoading',
      'saveFileToUser',
      'sendNotificationToUser',
      'getInitialOptions',
      'openOptions',
      'updateTabsLang',
    ];

    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    }
  },
});
