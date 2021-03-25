#! /usr/bin/env node

let pjson = require('./package.json')

const program = require('commander')
const {
  createCSV,
  generate,
  langSwitcherOptions
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
  .version(pjson.version)
  .description('Generate Quasar i18n language files from a CSV file. Run it from the root of a Quasar project.')
  .addHelpText('after', helpText)

program
  .command('generate')
  .alias('g')
  .option('-i, --input <mode>', 'Path to input CSV', 'translations.csv')
  .option('-o, --output <mode>', 'Path to i18n output folder', 'src/i18n')
  .option('-f, --force', 'Force write files (without prompt)', false)
  .option('-nw, --nowatermark', 'Disable the watermark ("This file was auto-generated..") ', false)
  .description('Generate your i18n folder & all language files based on a CSV file')
  .action((options) => {
    generate(options)
  })

program
  .command('create-csv')
  .alias('c')
  .option('-f, --force', 'Force overwrite translations file (without prompt)', false)
  .description('Create a sample CSV file')
  .action((options) => {
    createCSV(options)
  })

program
  .command('lang-switcher')
  .alias('ls')
  .option('-i, --input <mode>', 'Path to input CSV', 'translations.csv')
  .description(`Generate language switcher options array i.e. [{ label: 'English', value: 'en-US'}, ..]`)
  .action((options) => {
    langSwitcher(options)
  })

program.parse(process.argv)