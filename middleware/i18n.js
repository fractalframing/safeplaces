// i18n.js
const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')
const i18next = require('i18next');
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require('i18next-fs-backend');

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    debug: process.env.NODE_ENV == 'development' || false,
    initImmediate: false,
    fallbackLng: 'en',
    lng: 'es-MX',
    preload: readdirSync(join(__dirname, '../locales')).filter((fileName) => {
      const joinedPath = join(join(__dirname, '../locales'), fileName)
      const isDirectory = lstatSync(joinedPath).isDirectory()
      return isDirectory
    }),
    ns: 'translation',
    defaultNS: 'translation',
    backend: {
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    }
  });

module.exports = {
  i18nextMiddleware,
  i18next
};
