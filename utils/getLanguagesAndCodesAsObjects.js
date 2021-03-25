module.exports = function() { 
  this.getLanguagesAndCodesAsObjects = function(results) {
    // get first row that has data
    let firstRowWithData = {}
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      if (result.Key && !result.Key.startsWith('#')) {
        firstRowWithData = result
        break;
      }
    }

    // get languages and codes
    let languagesAndCodes = Object.assign({}, firstRowWithData)
    delete languagesAndCodes['Key']
    languagesAndCodes = Object.keys(languagesAndCodes)
    
    // generate array of lang, code & codeAsVariable as objects
    let languagesAndCodesAsObjects = []
    
    languagesAndCodes.forEach(languageAndCode => {
      let langAndCode = languageAndCode
      let lang = languageAndCode.split(',')[0]
      let code = languageAndCode.split(',')[1].trim()
      let codeAsVariable = code.split('-').join('')
      let languagesAndCodesObject = {
        langAndCode,
        lang,
        code,
        codeAsVariable
      }
      languagesAndCodesAsObjects.push(languagesAndCodesObject)
      
    });

    return languagesAndCodesAsObjects
  }
}