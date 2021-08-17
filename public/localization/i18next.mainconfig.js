const i18n = require('i18next');
const backend = require('i18next-fs-backend');

i18n.use(backend).init({
  backend: {
    loadPath: 'public/localization/locales/{{lng}}/{{ns}}.json',
    addPath: 'public/localization/locales/{{lng}}/{{ns}}.missing.json',
  },
  debug: false,
  namespace: 'translation',
  saveMissing: true,
  saveMissingTo: 'current',
  lng: 'ru',
  fallbackLng: false,
});

module.exports = i18n;
