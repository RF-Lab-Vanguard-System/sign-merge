const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const {createCanvas, loadImage} = require('canvas')

const pathInfo = require('./common/get-path-info')
const source = 'source'
const po = pathInfo().po
const pn = pathInfo().pn

/**
 * Return false for directories and no-png files.
 * @param {string} file 
 * @returns 
 */
const checkFile = (file) => {
    if (fs.statSync(file).isDirectory() ||
        path.extname(file) != '.png') {
        return false
    }
    return true
}

const currentPath = process.argv[2]
const currentFiles = fs.readdirSync(currentPath)
    .filter(file => checkFile(file))

/**
 * Create source directory
 */
 try {
    fs.accessSync(source)
} catch (err) {
    fs.mkdirSync(source)
}


/**
 * Create backup and sign for selected file 
 * @param {string} file 
 */
const createSign = function (file) {
    const serial = file.replace(/sn-/i, 'S/N:').replace(path.extname(file), '')
    const dimensions = sizeOf(file);
    const width = dimensions.width
    const height = dimensions.height + 50

    const canvas = createCanvas(width, height + 50)
    const context = canvas.getContext('2d')

    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    context.font = 'bold 30px Courier'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#fff'

    const text = po + ' PN:' + pn + ' ' + serial

    const textWidth = context.measureText(text).width
    context.fillStyle = '#000'
    context.fillText(text, width / 2, 20)

    loadImage(file).then(image => {
        fs.copyFile(file, './' + source + '/' + file, (err) => {
            if (err) {
                console.log(
                    '\x1b[31m', 
                    'Error Found:', err,
                    '\x1b[0m',
                    'With copy ' + file + ' to <source> folder'
                )
            }
            else {
                context.drawImage(image, 0, 50, width, height)
                const buffer = canvas.toBuffer('image/png')
                fs.writeFileSync(file, buffer)
                console.log(
                    'Signing file',
                    '\x1b[32m', 
                    file,
                    '\x1b[0m',
                    'saved.'
                )
            }
          })
        
    })    
}
  
currentFiles.forEach(file => {
    createSign(file)
})
