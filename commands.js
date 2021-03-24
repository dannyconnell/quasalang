#! /usr/bin/env node

const program = require('commander')
const {
  createCSV,
  generate
} = require('./index.js')

program
  .version('0.0.1')
  .description('Generate Quasar i18n language files from a CSV file')

program
  .command('generate')
  .alias('g')
  .option('-i, --input <mode>', 'Path to input CSV', 'translations.csv')
  .option('-o, --output <mode>', 'Path to i18n output folder', 'i18n')
  .description('Generate your i18n folder & all language files based on a CSV file')
  .action((options) => {
    generate(options.input, options.output)
  })

program
  .command('create-csv')
  .alias('c')
  .description('Create a sample CSV file')
  .action(() => {
    createCSV()
  })

program.parse(process.argv)