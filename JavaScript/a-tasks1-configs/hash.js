'use strict';

const crypto = require('node:crypto');
const settings = require('./config.js').HASHING;

const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(settings.saltLength).toString('base64');
  crypto.scrypt(password, salt, settings.keyLength, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString('base64'));
  });
});

module.exports = hash;
