const getPathInfo = () => {
    //console.log(process.argv)
    let arg, len;
    if (process.argv[2] == '-serial') {
        arg = process.argv[3].split('\\')
        len = 3;
    } else {
        arg = process.argv[2].split('\\')
        len = 2
    }
    this.po = arg[arg.length - len--];
    this.pn = arg[arg.length - len];
    // console.log('Set sign info:');
    // console.log('PO: ' + this.po);
    // console.log('PN: ' + this.pn);
    return {po: this.po, pn: this.pn};
 }

module.exports = getPathInfo