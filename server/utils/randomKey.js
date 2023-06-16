const crypto = require('node:crypto');

module.exports.randomKey = () => {return crypto.randomBytes(32).toString('hex')};