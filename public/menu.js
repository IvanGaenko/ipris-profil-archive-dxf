// Imports
const { app, Menu } = require('electron');
const i18nBackend = require('i18next-electron-fs-backend');

// App Imports
const whitelist = require('./localization/whitelist');

const mainProcess = require('./electron');

const createApplicationMenu = (i18nextMainBackend) => {
  const template = [
    {
      label: i18nextMainBackend.t('Menu'),
      submenu: [
        {
          label: i18nextMainBackend.t('Create order'),
          click: () => {
            mainProcess.menuCommand('createOrder');
          },
        },
        { type: 'separator' },
        {
          label: i18nextMainBackend.t('Close order'),
          click: () => {
            mainProcess.menuCommand('closeOrder');
          },
        },
        {
          label: i18nextMainBackend.t('Close all orders'),
          click: () => {
            mainProcess.menuCommand('closeAllOrders');
          },
        },
        { type: 'separator' },
        {
          label: i18nextMainBackend.t('Export'),
          submenu: [
            {
              label: i18nextMainBackend.t('Export file to XLS'),
              click: () => {
                mainProcess.saveXLSFile();
              },
            },
          ],
        },
        { type: 'separator' },
        {
          label: i18nextMainBackend.t('Options'),
          click: () => {
            mainProcess.toggleOptions();
          },
        },
        { type: 'separator' },
        {
          label: i18nextMainBackend.t('Language'),
          submenu: whitelist.buildSubmenu(
            i18nBackend.changeLanguageRequest,
            i18nextMainBackend,
          ),
        },
        { type: 'separator' },
        {
          label: i18nextMainBackend.t('Exit'),
          role: 'quit',
          accelerator: 'Ctrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];

  return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

module.exports = createApplicationMenu;
