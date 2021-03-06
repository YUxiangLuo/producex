const util = require("util");
const fs = require("fs");
const pReadFile = util.promisify(fs.readFile);
const readFile = async (filePath) => {
    return (await pReadFile(filePath)).toString();
}

const writeFile = util.promisify(fs.writeFile);


const fileExist = (filePath) => {
    return new Promise((resolve) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            // console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
            if(err) resolve(false);
            else resolve(true);
          });
    })
}

const unlink = util.promisify(fs.unlink);
const rename = util.promisify(fs.rename);

module.exports = {
    readFile,
    fileExist,
    writeFile,
    unlink,
    rename
}