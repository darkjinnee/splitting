const {program} = require('commander');
const storage = require('./storage');
const chalk = require('chalk');
const path = require('path');

module.exports = () => {
    program
        .option('-f, --file <path>', 'input file')
        .option('-d, --dir <path>', 'directory for output file\'s')
        .option('-q, --qty <number>', 'quantity lines in the file')
        .parse(process.argv);

    const opts = program.opts();

    if (!opts.file || !opts.qty) {
        throw {message: `No options specified`};
    }

    let inputFileParse = path.parse(opts.file);
    let qty = parseInt(opts.qty);
    let outputPath = opts.dir;

    if (!outputPath) {
        outputPath = inputFileParse.dir;
    }

    let arrayLines = storage.read(opts.file);

    try {
        for (let i = 0; i < arrayLines.length; i += qty) {
            let arraySliced = arrayLines.slice(i, i + qty);
            let x = i === 0 ? 1 : i;
            let y = i + arraySliced.length;

            let filePath = path.format({
                root: '/',
                dir: outputPath,
                name: `${inputFileParse.name}(${x}-${y})`,
                ext: inputFileParse.ext
            });

            storage.write(filePath, arraySliced.join("\n"));
            console.log(`${filePath} ${chalk.bgBlue('done...')}`);
        }
    } catch {
        throw new Error(`failed to swap output file`);
    }
}