var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.getUserList(req, users => {
    var id = req.session.login || null
    var currentUser = req.currentUser // id && users.find(u => u._id === id)
    res.render('index', { title: 'Main page', user: currentUser, users: users, session: req.session });
  })
});

module.exports = router;
