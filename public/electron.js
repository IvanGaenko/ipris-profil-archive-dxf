// Imports
const path = require('path');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const i18nextBackend = require('i18next-electron-fs-backend');

// App Imports
const i18nextMainBackend = require('./localization/i18next.mainconfig');

const config = require('./config/params.json');

const store = require('./config/Store');

const saveXLSX = require('./utils/saveXLSX');
const compareName = require('./utils/compareName');

const createApplicationMenu = require('./menu');

const isDevelopment = false;

const iconPath = path.join(__dirname, '/ipris_logo.png');

if (isDevelopment) {
  require('electron-reload')(__dirname, {
    electron: require('../node_modules/electron'),
  });
}
// require('electron-reload')(__dirname, {
//   electron: require('../node_modules/electron'),
// });

let mainWindow;

function createWindow(args) {
  mainWindow = new BrowserWindow({
    width: args.width,
    height: args.height,
    minWidth: 600,
    icon: iconPath,
    title: config.title,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      show: false,
    },
  });

  mainWindow.loadURL(
    isDevelopment
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  i18nextBackend.mainBindings(ipcMain, mainWindow, fs);

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => (mainWindow = null));

  i18nextMainBackend.on('loaded', () => {
    i18nextMainBackend.changeLanguage('ru');
    i18nextMainBackend.off('loaded');
  });

  i18nextMainBackend.on('languageChanged', () => {
    createApplicationMenu(i18nextMainBackend);
  });
}

app.on('ready', () => {
  const { width, height } = store.get('windowBounds');
  createWindow({ width, height });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    i18nextBackend.clearMainBindings(ipcMain);
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('openFile', (event, args) => {
  try {
    shell.openPath(args);
  } catch (error) {}
});

ipcMain.on('openFolder', (event, args) => {
  try {
    shell.showItemInFolder(args);
  } catch (error) {}
});

// loads options from store
ipcMain.on('queueInitialOptions', () => {
  const headers = config.optionsHeader;
  const initialContent = store.get('content');
  mainWindow.webContents.send('getInitialOptions', { headers, initialContent });
});

// on open file shows dialog
const getOrderPathFromUser = async (data) => {
  const validExtensions = ['xls', 'xlsx', 'xlsm'];

  if (data.isDraged) {
    const parsedPath = path.parse(data.filePath);

    const checkedExtension = parsedPath.ext
      .split('')
      .filter((e) => e !== '.')
      .join('');
    const includedExtension = validExtensions.includes(checkedExtension);

    if (includedExtension) {
      return {
        status: 'OK',
        shortName: parsedPath.name,
        fullName: data.filePath,
      };
    }

    return {
      status: 'Error',
      shortName: '',
      fullName: '',
    };
  }

  const files = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'XLS Files', extensions: validExtensions }],
  });

  if (!files.canceled) {
    const shortName = path.parse(files.filePaths[0]).name;

    return { status: 'OK', shortName, fullName: files.filePaths[0] };
  }

  if (files.canceled) {
    return { status: 'Canceled', shortName: '', fullName: '' };
  }

  return { status: 'Error', shortName: '', fullName: '' };
};

const getOrderHeaders = (data) => {
  if (data && data.length !== 0) {
    const orderHeadersObject = {};

    for (const header of data) {
      orderHeadersObject[header.contentName] = header.contentValue;
    }

    return orderHeadersObject;
  }

  return {};
};

// get options value
const getOptionsForOrder = () => {
  const content = store.get('content');

  return {
    archivePath: content.archivePath
      ? content.archivePath.map((a) => a.contentValue)
      : [],
    extension: content.extensions
      ? content.extensions.map((a) => a.contentValue)
      : [],
    validOps: content.validOps
      ? content.validOps.map((a) => a.contentValue)
      : [],
    targetSheets: content.targetSheets
      ? content.targetSheets.map((a) => a.contentValue)
      : [],
    checkedBy: content.checkedBy ? content.checkedBy[0].contentValue : 'C',
    orderHeaders: content.orderHeaders
      ? getOrderHeaders(content.orderHeaders)
      : {},
  };
};

// send notification to user
const sendNotificationToUser = (data) => {
  const { status, value } = data;
  mainWindow.webContents.send('sendNotificationToUser', {
    status,
    value,
  });
};

// on open xls file
ipcMain.on('openFileFromUser', async (event, data) => {
  const orderPath = await getOrderPathFromUser(data);
  const options = getOptionsForOrder();

  if (orderPath.status === 'Error') {
    sendNotificationToUser({
      status: 'Error', // OK, Cancel, Error
      value: 'Ошибка в формате файла',
    });
  }

  if (orderPath.status === 'OK' && orderPath.shortName && orderPath.fullName) {
    const args = {
      options,
      shortName: orderPath.shortName, // {shortName, fullName}
      fullName: orderPath.fullName,
    };

    mainWindow.webContents.send('startLoading', true);
    const comparedName = await compareName(args); // name: {fullName, shortName},data: [{Num,Name,Definion,Count,Prev,Operations,Next,data,archiveFileName,archiveFilePath}]
    // comparedName = { status: 'OK' or 'Error', value: result={name, data} or {name: '', data: []}}

    if (comparedName.status === 'OK') {
      mainWindow.webContents.send('getFilesFromUser', comparedName.value);
    } else {
      mainWindow.webContents.send('getFilesFromUser', comparedName.value);
      sendNotificationToUser({
        status: 'Error', // OK, Error
        value: comparedName.errorMessage,
      });
    }
  }
});

// save options to store
ipcMain.on('sendOptionsToStore', (event, data) => {
  const { isChangedOptions, optionsData } = data;
  const options = JSON.parse(optionsData);

  try {
    if (options !== undefined) {
      store.set('content', options.content);

      if (isChangedOptions) {
        sendNotificationToUser({
          status: 'OK', // OK, Error
          value: 'Настройки успешно сохранены',
        });
      }
    }
  } catch (error) {
    sendNotificationToUser({
      status: 'Error', // OK, Error
      value: 'Ошибка применения настроек',
    });
  }
});

// refresh order
ipcMain.on('rescanOrder', async (event, data) => {
  const options = getOptionsForOrder();

  const args = {
    options,
    shortName: data.shortName, // {shortName, fullName}
    fullName: data.fullName,
  };

  mainWindow.webContents.send('startLoading', true);
  const comparedName = await compareName(args);
  // comparedName = { status: 'OK' or 'Error, value: result={name, data} or []}

  if (comparedName.status === 'OK') {
    mainWindow.webContents.send('rescanedOrderToUser', comparedName.value);
  } else {
    mainWindow.webContents.send('rescanedOrderToUser', comparedName.value);
    sendNotificationToUser({
      status: 'Error', // OK, Error
      value: 'Ошибка',
    });
  }
});

// on save xls file from user
ipcMain.on('saveFileFromUser', async (event, data) => {
  const defaultOrderPath = data.name;
  const orderDataToSave = JSON.parse(data.data);

  if (orderDataToSave.length === 0) {
    sendNotificationToUser({
      status: 'Error', // OK, Error
      value: 'Заказ пустой',
    });

    return;
  }

  const getDir = path.parse(defaultOrderPath);
  const newOrderPath = path.format({
    dir: getDir.dir || app.getPath('documents'),
    name: getDir.name.includes('archive')
      ? getDir.name
      : `${getDir.name}-archive`,
    ext: getDir.ext || '.xls',
  });

  const saveFileDialog = await dialog.showSaveDialog({
    defaultPath: newOrderPath,
  });

  if (saveFileDialog.filePath !== '') {
    const savedFile = await saveXLSX({
      orderDataToSave,
      filePath: saveFileDialog.filePath,
    }); // orderPath

    if (savedFile.status === 'OK') {
      sendNotificationToUser({
        status: 'OK', // OK, Error
        value: savedFile.message,
      });
    } else {
      sendNotificationToUser({
        status: 'Error', // OK, Error
        value: savedFile.message,
      });
    }
  }
});

// menu
const menuCommand = (data) => {
  mainWindow.webContents.send('menu', data);
};

const toggleOptions = () => {
  mainWindow.webContents.send('openOptions');
};

const saveXLSFile = () => {
  mainWindow.webContents.send('saveFileToUser');
};

module.exports.menuCommand = menuCommand;
module.exports.saveXLSFile = saveXLSFile;
module.exports.toggleOptions = toggleOptions;
