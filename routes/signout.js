const router = require('express').Router()
const { signOut } = require('../models/user')


router.get('/', (req, res) => {
  signOut(req, () => res.redirect('/'))
})

module.exports = router
