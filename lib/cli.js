const options = require('yargs'),
    info = require('../package.json'),
    fs = require('fs'),
    argv = options.argv,
    files = argv._,
    Includer = require('./main').Includer;

options.usage(
    `=============    coffee-includer help    =============
    
  ${info.description}
    
======================================================
`
)
    .describe('h', 'display this help').alias('h', 'help')
    .example(' ', 'coffee-includer [main.coffee] [combined.coffee]');
if (files.length < 2) {
    options.showHelp();
}
else {
    const input = fs.createReadStream(files[0], {
            'bufferSize': 4 * 1024
        }), // read file
        output = fs.createWriteStream(files[1]); // write file
    input // take input
        .pipe(Includer()) // pipe through coffee-includer.js
        .pipe(output); // save to file
}