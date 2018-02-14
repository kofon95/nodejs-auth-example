const router = require('express').Router()
const { deleteUser } = require('../models/user')


router.post('/', (req, res) => {
  var id = req.session.login
  if (!id) return res.redirect('/')
  deleteUser(req, id, () => res.redirect('/'))
})

module.exports = router
