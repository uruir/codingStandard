var crypto = require('crypto');

var secret = 'uRuierSecret'
var hash = crypto.createHmac('sha256', secret).update('I love Node.js').digest('hex')

console.log(crypto.getHashes())

console.log(hash)