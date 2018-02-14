var router = require('express').Router()

router.get('/', (req, res) => {
  var err = req.session.error
  req.session.error = undefined
  res.render('login', {error: err})
})

module.exports = router
