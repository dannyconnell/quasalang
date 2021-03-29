const colors = require('colors')
let figlet = require('figlet')
const { prompt } = require('inquirer')

module.exports = function() { 
  this.listCodes = function(options) {

    // get raw locale codes object
    let localeCodes = require('../locale-codes')

    // convert object into workable array
    let localeCodesArray = []
    Object.keys(localeCodes).forEach(code => {
      // console.log(`key=${code}  value=${localeCodes[code]}`)
      let localeCodeObj = {
        language: localeCodes[code],
        code: code,
      }
      localeCodesArray.push(localeCodeObj)
    })

    // prompt for search string
    console.log('')
    prompt([
      {
        type: 'input',
        name: 'search',
        message: `Enter a search query (e.g. "russian") or hit Enter to list all codes:`
      }
    ]).then(answers => {
      if (answers.search) {
        filterCodesBySearch(answers.search)
      }
      else {
        listCodes(localeCodesArray)
      }
    })


    function filterCodesBySearch(search) {
      let localeCodesFilteredBySearch = localeCodesArray.filter(obj => {
        return (obj.language.toLowerCase().includes(search.toLowerCase()));
      })
      if (localeCodesFilteredBySearch.length) {
        listCodes(localeCodesFilteredBySearch)
      }
      else {
        noResults()
      }
    }

    function listCodes(codes) {
      // loop through alphabet
      let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  
      alphabet.forEach(letter => {
        let localeCodesByLetter = codes.filter(obj => {
          return (obj.language.startsWith(letter));
        });
  
        if (localeCodesByLetter.length) {
  
          // print letter header
          console.log('\n')
          console.log(colors.green(figlet.textSync(letter, {
            font: 'big',
            width: 80,
            whitespaceBreak: false
          })));
    
          // print letter results
          localeCodesByLetter.forEach(item => {
            console.log(`${colors.cyan.bold(item.language)}, ${colors.yellow(item.code)}`)
          })
  
        }
  
      });
  
      console.log('\n\n')
    }

    function noResults() {
      console.log(colors.yellow(figlet.textSync('No results found.', {
        font: 'big',
        width: 80,
        whitespaceBreak: true
      })));
    }


  }
}