const User = require('../models/user')

module.exports = (req, res, next) => {
  User.getCurrentUser(req, (err, foundUser) => {
    if (err) return next(err)
    req.currentUser = foundUser
    next()
  })
}