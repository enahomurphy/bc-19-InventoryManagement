var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');
var jade = require('jade');
var passport = require('passport');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('req-flash');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');

var userRoute = require('./routes/users');
var assetRoute = require('./routes/assets');
var categoryRoute = require('./routes/categories');
var assetsAssignment = require('./routes/assetsAssignment');
var loginRoute = require('./routes/login');
var auth = require('./routes/auth');
var db = require('./models/db_connect');
var isLoggedIn = require('./middleware/passportAuth').isLoggedIn;


var loginAuth  = require('./middleware/passportAuth');
// instantiate the express middleware
var app = express();

var sessionStore = new session.MemoryStore;

//connects to mongo db server
db(mongoose, 'andela-inventory');


app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'kjsrjgasdjfgjabjabsdfjbdskajjf' , resave : true
, saveUninitialized : true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(methodOverride('_method'));


loginAuth.loginAuth();




app.use('/dashboard' , function (req, res, next) {
    isLoggedIn(req, res, next)
});

app.use('/', loginRoute);
app.use('/dashboard', assetsAssignment);
app.use('/dashboard', assetRoute);
app.use('/dashboard', categoryRoute);
app.use('/dashboard', userRoute);



var secrete = "my_very_secrete_secrete";



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
