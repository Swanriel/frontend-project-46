#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(`Comparing files:
    File 1: ${filepath1}
    File 2: ${filepath2}
    Format: ${program.opts().format}`)
  })

program.parse(process.argv)