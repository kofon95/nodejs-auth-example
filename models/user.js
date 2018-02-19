var cipher = require('../helpers/cipher')


function getCurrentUser(req, cb) {
  var id = req.session.login
  var digest = req.session.digest
  if (!id || !digest)
    return cb(null)
  req.db.collection('users').findOne({_id: id, digest: digest}, cb)
}

function findUserById(req, id, cb) {
  req.db.collection('users').findOne({_id: id}, (err, user) => {
    if (err) throw err
    cb(user)
  })
}

function getUserList(req, cb) {
  var db = require('mongodb').Db
  req.db.collection('users').find().toArray((err, users) => {
    if (err) throw err
    cb(users)
  })
}


function authUser(req, id, cb) {
  var digest = cipher.randomString()
  req.db.collection('users').update({_id: id}, {$set: {digest: digest}}, (err, user) => {
    if (err) throw err
    req.session.login = id
    req.session.digest = digest
    console.log('updated:', user)
    cb(user)
  })
}

function saveUser(req, user, cb) {
  req.db.collection('users').insert(user, (err, insertResult) => {
    if (err) {
      cb(null)
    } else {
      authUser(req, user._id, cb)
    }
  })
}

function signOut(req, cb) {
  var id = req.session.login
  if (!id) return cb(null)
  req.db.collection('users').update({_id: id}, {$unset: {digest: 1}}, (err, user) => {
    if (err) throw err
    req.session.login = undefined
    req.session.digest = undefined
    console.log(user)
    cb(user)
  })
}

function deleteUser(req, userId, cb) {
  req.db.collection('users').remove({_id: userId}, (err, remInfo) => {
    if (err) throw err
    console.log(remInfo)
    cb(remInfo)
  })
}


exports.getCurrentUser = getCurrentUser
exports.authUser = authUser
exports.findUserById = findUserById
exports.getUserList = getUserList
exports.saveUser = saveUser
exports.signOut = signOut
exports.deleteUser = deleteUser
