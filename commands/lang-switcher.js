const fs = require('fs')
const csv = require('csv-parser')

require('../utils/getLanguagesAndCodesAsObjects.js')();

module.exports = function() { 
  this.langSwitcher = function(options) {
    
    let csvPath = options.input

    let results = []

    // sanitize csvPath & outputPath
    if (csvPath.startsWith('/')) csvPath = csvPath.substring(1)
    
    // read the csv file
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        let languagesAndCodesAsObjects = getLanguagesAndCodesAsObjects(results)

        let languageSwitcherOptions = []

        languagesAndCodesAsObjects.forEach(langObj => {
          let optionObj = {
            label: langObj.lang,
            value: langObj.code
          }
          languageSwitcherOptions.push(optionObj)
        });

        console.log('Your language switcher options array:')
        console.log('')
        console.log(languageSwitcherOptions)
        console.log('')
      })
  }
}