var router = require('express').Router()

router.get('/', (req, res) => {
  var err = req.session.error
  req.session.error = undefined
  res.render('register', {error: err})
})

module.exports = router
