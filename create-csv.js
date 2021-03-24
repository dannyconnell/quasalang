var fs = require('fs')

module.exports = function() { 
  this.createCSV = function() {
    fs.copyFile(`${__dirname}/sample-csv/translations.csv`, `translations.csv`, (err) => {
      if (err) throw err
      console.log(`/translations.csv was generated.`)
    })
  }
}