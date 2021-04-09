#!/usr/bin/env node

const chalk = require('chalk');
const program = require('./program');

async function main() {
    console.log(chalk.greenBright(`*** SPLITTING: START ***`));
    program();
}

main()
    .then(() => console.log(chalk.gray(`*** SPLITTING: END ***`)))
    .catch(e => {console.error(chalk.bgRed(`ERROR: ${e.message}`))});
