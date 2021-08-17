// Contains a whitelist of languages for our app
const whitelistMap = {
  ru: 'Русский',
  en: 'English',
};

const Whitelist = (() => {
  const keys = Object.keys(whitelistMap);
  const clickFunction = (channel, lng, i18nextMainBackend) => {
    // return (menuItem, browserWindow, event) => {
    return (menuItem, browserWindow) => {
      // Solely within the top menu
      i18nextMainBackend.changeLanguage(lng);
      // Between renderer > main process
      browserWindow.webContents.send(channel, {
        lng,
      });
    };
  };

  return {
    langs: keys,
    buildSubmenu(channel, i18nextMainBackend) {
      const submenu = [];

      for (const key of keys) {
        submenu.push({
          label: whitelistMap[key],
          click: clickFunction(channel, key, i18nextMainBackend),
        });
      }

      return submenu;
    },
  };
})();

module.exports = Whitelist;
