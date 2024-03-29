const fs = require('fs')
const path = require('path')

const currentPath = process.argv[2]
const restorePath = process.argv[2] + '\\source'

if (!fs.existsSync(restorePath) || 
    !fs.statSync(restorePath).isDirectory()) 
{
    console.log('Not exist path', restorePath)
    return
}

const checkFile = (file) => {
    if (fs.statSync(file).isDirectory() ||
        path.extname(file) != '.png') {
        return false
    }
    return true
}

const restore = (file) => {
    try {
        fs.renameSync(restorePath + '\\' + file, currentPath + '\\' + file)
        console.log(            
            'Restore file',
            '\x1b[32m', 
            restorePath + '\\' + file,
            '\x1b[0m')
        console.log(
            'to ',
            '\x1b[32m', 
            currentPath + '\\' + file,
            '\x1b[0m')
    } catch (err) {
        console.log('Error move file ' + file, err)
    }
}

const restoringFiles = fs.readdirSync(restorePath)
    .filter(file => checkFile(restorePath + '\\' + file))

restoringFiles.forEach(file => {
    restore(file)
})