// TODO: add overwriting warnings
// TODO: improve the help info

require('./create-csv.js')();
require('./generate.js')();

module.exports = {
  createCSV,
  generate
}