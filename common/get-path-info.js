const getPathInfo = () => {
    let arg = process.argv[2].split('\\');
    this.po = arg[arg.length - 2];
    this.pn = arg[arg.length - 1];
    // console.log('Set sign info:');
    // console.log('PO: ' + this.po);
    // console.log('PN: ' + this.pn);
    return {po: this.po, pn: this.pn};
 }

module.exports = getPathInfo