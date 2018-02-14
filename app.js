if (process.env.MONGODB_URI)
  console.log('MONGODB_URI was passed in')

global.util = require('util')

var logger = require('morgan')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var app = express()


app.set('mongodb_uri', process.env.MONGODB_URI || 'mongodb://localhost/jssample')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('cookie-secret'))

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'session-secret',
  store: new MongoStore({url: app.get('mongodb_uri')})
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('express-mongo-db')(app.get('mongodb_uri')))

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/login_post', require('./routes/login_post'))
app.use('/register', require('./routes/register'))
app.use('/register_post', require('./routes/register_post'))
app.use('/signout', require('./routes/signout'))
app.use('/delete', require('./routes/delete'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
