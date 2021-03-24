// TODO: put createCSV & generate in own files

require('./create-csv.js')();
require('./generate.js')();

module.exports = {
  createCSV,
  generate
}