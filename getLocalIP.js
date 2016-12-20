var os = require('os')

function getLocalIP() {
    var localIP = ''
    var ifaces = os.networkInterfaces()
    console.log(JSON.stringify(ifaces))
    for (key in ifaces) {
        if (key.indexOf('以太') !== -1) {
            ifaces[key].forEach(function (item) {
                if (item.address.indexOf('.') !== -1) {
                   localIP = item.address
                }
            })
        }
    }
    return localIP
}

console.log(getLocalIP())