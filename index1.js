const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const {createCanvas, loadImage} = require('canvas')

const pathInfo = require('./common/get-path-info')
const directory = 'merged'
const po = pathInfo().po
const pn = pathInfo().pn

const currentPath = process.argv[2]
const currentFiles = fs.readdirSync(currentPath)
// console.log(currentPath, currentFiles)
const ch1Files = currentFiles.filter(file => file.indexOf('-ch1') != -1)
const ch2Files = currentFiles.filter(file => file.indexOf('-ch2') != -1)
// console.log(ch1Files, ch2Files)
const filesTwisted = []
for (let file1 of ch1Files) {
    for (let file2 of ch2Files) {
        if (file1.replace(/-ch1/i, '-ch2') == file2) {
            filesTwisted.push([file1, file2])
        }
    }
}
console.log(filesTwisted.length + ' pair selected: ', filesTwisted)

/**
 * Create out directory
 */
try {
    fs.accessSync(directory)
} catch (err) {
    fs.mkdirSync(directory)
}

const mergeImages = function(pair) {
    const serial = pair[0].replace(/sn-/i, 'S/N:').replace(path.extname(pair[0]), '').replace(/-ch1/i, '')
    const dimensions1 = sizeOf(pair[0]);
    const dimensions2 = sizeOf(pair[1]);
    
    let dimensions = {}
    if(dimensions1.height >= dimensions2.height) {
        dimensions.height = dimensions1.height
        if(dimensions1.width >= dimensions2.width) {
            dimensions.width = dimensions1.width
        } else {
            dimensions.width = dimensions2.width
        }
    } else {
        dimensions.height = dimensions2.height
        if(dimensions2.width >= dimensions1.width) {
            dimensions.width = dimensions2.width
        } else {
            dimensions.width = dimensions1.width
        }
    }
    const offset = Math.ceil(dimensions.width/6)
    const width = dimensions.width + offset + 20
    const height = dimensions.height + 50

    const canvas = createCanvas(width, height + 50)
    const context = canvas.getContext('2d')
    
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width,  height + 50)
    
    loadImage(pair[1]).then(image1 => {
        context.drawImage(image1, offset, 50, width - offset + 2, height)
        loadImage(pair[0]).then(image => {
            context.drawImage(image, 0, 50, width - offset - 5, height)

            context.font = 'bold 30px Courier'
            context.textAlign = 'center'
            context.textBaseline = 'top'
            context.fillStyle = '#fff'

            const text = po + ' PN:' + pn + ' ' + serial
            // console.log('Sign: "' + text + '"')

            const textWidth = context.measureText(text).width
            context.fillStyle = '#000'
            context.fillText(text, width / 2, 20)

            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./' + directory + '/' + pair[0].replace(/-ch1/i, ''), buffer)
            console.log(
                'Combined file',
                '\x1b[32m', 
                pair[0].replace(/-ch1/i, ''),
                '\x1b[0m',
                'saved.'
            )
        })
    })
}

filesTwisted.forEach(pair => {
    mergeImages(pair)
})
