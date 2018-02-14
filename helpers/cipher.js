const bcrypt = require('bcrypt')
const crypto = require('crypto')
const DEFAULT_LENGTH_OF_RANDOM_STRING = 32
const DEFAULT_SALT_ROUND = 10


function cipher(password, cb) {
  bcrypt.genSalt(DEFAULT_SALT_ROUND, (err, salt) => {
    if (err) return cb(err)
    console.log('salt:', salt)
    bcrypt.hash(password, salt, (err, encrypted) => {
      if (err) return cb(err)
      cb(null, encrypted)
    })
  })
}

function randomString(len) {
  if (!(len >= 0))
    len = DEFAULT_LENGTH_OF_RANDOM_STRING
  return crypto.randomBytes(Math.ceil(len >> 1)).toString()
}

exports.cipher = cipher
exports.compare = bcrypt.compare
exports.randomString = randomString
