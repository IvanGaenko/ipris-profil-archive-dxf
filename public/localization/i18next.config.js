const i18n = require('i18next').default;
const { initReactI18next } = require('react-i18next');
const i18nBackend = require('i18next-electron-fs-backend').default;

// const whitelist = require('./whitelist');

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'public/localization/locales/{{lng}}/{{ns}}.json',
      addPath: 'public/localization/locales/{{lng}}/{{ns}}.missing.json',
      ipcRenderer: window.api.i18nextElectronBackend,
    },
    debug: false,
    saveMissing: true,
    saveMissingTo: 'current',
    lng: 'ru',
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
    // whitelist: whitelist.langs,
    whitelist: ['ru', 'en'],
  });

window.api.i18nextElectronBackend.onLanguageChange((args) => {
  // i18n.changeLanguage(args.lng, (error, t) => {
  i18n.changeLanguage(args.lng, (error) => {
    // console.log('t', args);

    if (error) {
      console.error(error);
    }
  });
});

module.exports = i18n;
