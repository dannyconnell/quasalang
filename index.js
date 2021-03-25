require('./commands/create-csv.js')();
require('./commands/generate.js')();
require('./commands/lang-switcher.js')();

module.exports = {
  createCSV,
  generate,
  langSwitcher
}