#! /usr/bin/env node

const program = require('commander')
const {
  createCSV,
  generate
} = require('./index.js')

const helpText = `

Getting Started
===============

Step 1. Create a sample CSV file (/translations.csv):
  $ quasalang create-csv

Step 2. Add your own languages & phrases to /translations.csv

Step 3. Generate your language files:
  $ quasalang generate
`

program
  .version('0.0.1')
  .description('Generate Quasar i18n language files from a CSV file. Run it from the root of a Quasar project.')
  .addHelpText('after', helpText)

program
  .command('generate')
  .alias('g')
  .option('-i, --input <mode>', 'Path to input CSV', 'translations.csv')
  .option('-o, --output <mode>', 'Path to i18n output folder', 'src/i18n')
  .option('-f, --force', 'Force write files (without prompt)', false)
  .description('Generate your i18n folder & all language files based on a CSV file')
  .action((options) => {
    generate(options)
  })

program
  .command('create-csv')
  .alias('c')
  .description('Create a sample CSV file')
  .action(() => {
    createCSV()
  })

program.parse(process.argv)