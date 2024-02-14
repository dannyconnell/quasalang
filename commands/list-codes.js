const colors = require('colors');
const figlet = require('figlet');
const { prompt } = require('inquirer');
const addLang = require('./lang-add');

module.exports = function () {
    this.listCodes = function (options) {
        // get raw locale codes object
        let localeCodes = require('../locale-codes');

        // convert object into workable array
        let localeCodesArray = [];
        Object.keys(localeCodes).forEach((code) => {
            // console.log(`key=${code}  value=${localeCodes[code]}`)
            let localeCodeObj = {
                language: localeCodes[code],
                code: code,
            };
            localeCodesArray.push(localeCodeObj);
        });

        // prompt for search string
        console.log('');
        prompt([
            {
                type: 'input',
                name: 'search',
                message: `Enter a search query (e.g. "russian") or hit Enter to list all codes:`,
            },
        ]).then((answers) => {
            if (answers.search) {
                filterCodesBySearch(answers.search);
            } else {
                listCodes(localeCodesArray);
            }
        });

        function filterCodesBySearch(search) {
            let localeCodesFilteredBySearch = localeCodesArray.filter((obj) => {
                return obj.language
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            if (localeCodesFilteredBySearch.length) {
                listCodes(localeCodesFilteredBySearch, options);
            } else {
                noResults();
            }
        }

        async function listCodes(codes, options) {
            let choices = codes.map((item) => ({
                name: `${item.language}, ${item.code}`,
                value: `${item.language}, ${item.code}`,
            }));

            if (options.add) {
                const { selectedLangs } = await prompt([
                    {
                        type: 'checkbox',
                        name: 'selectedLangs',
                        message: 'Select languages to add:',
                        choices: choices,
                    },
                ]);
                await addLang(selectedLangs);
            } else {
                console.log('Available languages:');
                choices.forEach((choice) => console.log(choice.name));
            }
        }

        function noResults() {
            console.log(
                colors.yellow(
                    figlet.textSync('No results found.', {
                        font: 'big',
                        width: 80,
                        whitespaceBreak: true,
                    })
                )
            );
        }
    };
};
