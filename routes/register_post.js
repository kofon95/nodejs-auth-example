var crypto = require('crypto')
var User = require('../models/user')
var cipher = require('../helpers/cipher')
var router = require('express').Router()


router.post('/', (req, res) => {
  var auth = req.body
  if (!auth.login) {
    req.session.error = 'Login should be passed in'
    res.redirect('/register')
  }
  else if (!auth.password) {
    req.session.error = 'Password should be passed in'
    res.redirect('/register')
  }
  else {
    cipher.cipher(auth.password, (err, encryptedPassword) => {
      if (err) throw err
      var newUser = {_id: auth.login, password: encryptedPassword}
      User.saveUser(req, newUser, user => {
        if (user) {
          res.redirect('/')
        } else {
          req.session.error = 'Sorry, such user already exists'
          res.redirect('/register')
        }
      })
    })
  }
})


module.exports = router
