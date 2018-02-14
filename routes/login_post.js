var router = require('express').Router()
var cipher = require('../helpers/cipher')
var User = require('../models/user')


router.post('/', (req, res) => {
  res.type('text')
  var auth = req.body
  if (!auth.login || !auth.password) {
    req.session.error = 'Login as well as password should be passed in'
    return res.redirect('login')
  }
  User.findUserById(req, auth.login, foundUser => {
    if (!foundUser) {
      req.session.error = `User with login "${auth.login}" not found`
      return res.redirect("/login")
    }
    cipher.compare(auth.password, foundUser.password, (err, correct) => {
      if (err) throw err

      if (!correct) {
        req.session.error = `Wrong password for user ${auth.login}`
        return res.redirect('/login')
      }
      User.authUser(req, auth.login, (e) => {
        res.redirect('/')
      })
    })
  })
})



module.exports = router
