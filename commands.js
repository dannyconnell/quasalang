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
  .command('create-csv')
  .alias('c')
  .description('Create a sample CSV file')
  .action(() => {
    createCSV()
  })

program
  .command('generate <csvpath> <outputpath>')
  .alias('g')
  .description('Generate your i18n folder & all language files based on a CSV file')
  .action((csvpath, outputpath) => {
    generate(csvpath, outputpath)
  })

program.parse(process.argv)