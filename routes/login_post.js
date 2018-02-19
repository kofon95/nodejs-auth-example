var router = require('express').Router()
var cipher = require('../helpers/cipher')
var User = require('../models/user')
var async = require('async')


router.post('/', (req, res) => {
  res.type('text')
  var auth = req.body
  if (!auth.login || !auth.password) {
    req.session.error = 'Login as well as password should be passed in'
    return res.redirect('login')
  }

  async.waterfall([
    function(cb) {
      User.findUserById(req, auth.login, foundUser => {
        if (!foundUser) {
          req.session.error = `User with login "${auth.login}" not found`
          return res.redirect("/login")
        }
        cb(null, foundUser)
      })
    },
    function(foundUser, cb) {
      cipher.compare(auth.password, foundUser.password, (err, correct) => {
        if (err) throw err
  
        if (!correct) {
          req.session.error = `Wrong password for user ${auth.login}`
          return res.redirect('/login')
        }
        cb(null)
      })
    },
    function(cb) {
      User.authUser(req, auth.login, (e) => {
        res.redirect('/')
      })
      cb(null)
    }
  ], function(err, ...a) {
    if (err) throw err
  })
})



module.exports = router
