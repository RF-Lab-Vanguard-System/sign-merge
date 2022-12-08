const fs = require('fs')

const getFilesList = (path) => {
    var allFiles = fs.readdirSync(path);
    for (var i =0; i<allFiles.length; i++){
        var name = path + '/' + allFiles[i];
        if (!fs.statSync(name).isDirectory()){
            files.push(name);
        }
    }
    return files;
}

module.exports = getFilesList;