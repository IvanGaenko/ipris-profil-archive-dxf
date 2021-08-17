// Imports
const path = require('path');
const fs = require('fs');

const { app } = require('electron');

const defaultStore = require('./defaultStore.json');
const config = require('./params.json');

function parseDataFile(filePath, defaults) {
  try {
    const optionsHeaderValue = config.optionsHeader.map(
      (option) => option.value,
    );
    const dataFromFile = JSON.parse(fs.readFileSync(filePath)); // content object
    const { content } = dataFromFile;

    for (const option of optionsHeaderValue) {
      if (content[option] === undefined) {
        content[option] = defaults.content[option];
      }

      if (
        option === 'orderHeaders' &&
        content[option].length !== defaults.content[option].length
      ) {
        content[option] = defaults.content[option];
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(dataFromFile));

    return dataFromFile;
  } catch (error) {
    fs.writeFileSync(filePath, JSON.stringify(defaults));

    return defaults;
  }
}

class Store {
  constructor(args) {
    const userDataPath = app.getPath('userData');
    this.path = path.join(userDataPath, `${args.configName}.json`);

    this.data = parseDataFile(this.path, args.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = Store;

const store = new Store({
  configName: config.configFileName,
  defaults: defaultStore.data,
});

module.exports = store;
