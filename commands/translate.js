const fs = require('fs');
const csv = require('csv-parser');
const translatte = require('translatte');

const inputFile = 'translations.csv';
const backupFile = 'translations.csv.bak';

const translations = [];

// Function to add a delay of 1 second
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to create a backup of the input file
function createBackup() {
  fs.copyFileSync(inputFile, backupFile);
  console.log("Backup created:", backupFile);
}

function changeLineInFile(lineNumber, row) {
    return new Promise((resolve, reject) => {
        // Read the contents of the file
        fs.readFile(inputFile, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            // Split the contents into an array of lines
            let lines = data.split('\n');

            // Check if the line number is valid
            if (lineNumber < 0 || lineNumber >= lines.length) {
                reject(new Error('Invalid line number.'));
                return;
            }

            // Modify the content of the specified line
            lines[lineNumber] = Object.values(row)
                .map((value) => `"${value.replace(/"/g, '""')}"`)
                .join(',');

            // Join the lines back into a single string
            const modifiedContent = lines.join('\n');

            // Write the modified contents back to the file
            fs.writeFile(inputFile, modifiedContent, 'utf8', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('File updated successfully.');
            });
        });
    });
}

module.exports = function () {
    this.translate = function (options) {
        createBackup();

        // Parse the CSV file
        fs.createReadStream(inputFile)
            .pipe(csv())
            .on('data', (row) => {
                translations.push(row);
            })
            .on('end', async () => {
                for (let index = 0; index < translations.length; index++) {
                    const row = translations[index];
                    const newRow = { ...row };
                    for (let i = 2; i < Object.keys(row).length; i++) {
                        const language = Object.keys(row)[i];
                        if (newRow[language] === '' || options.force) {
                            const englishText = row['English, en-US'];
                            const locale = language
                                .split(',')[1]
                                .trim()
                                .slice(0, 2);
                            await translatte(englishText, { to: locale })
                                .then((res) => {
                                    newRow[language] = res.text;
                                    console.log(`locale=${locale}, key=${row.Key}, trans=${res.text}`);
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                            // await delay(100); // Add 1-second delay
                        }
                    }
                    await changeLineInFile(index+1, newRow)
                }
                console.log('Translation done.');
            });
    };
};
