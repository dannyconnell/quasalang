require('./create-csv.js')();
require('./generate.js')();
require('./langSwitcher.js')();

module.exports = {
  createCSV,
  generate,
  langSwitcher
}