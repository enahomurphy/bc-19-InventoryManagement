var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userRoute = require('./routes/users');
var assetRoute = require('./routes/assets');
var categoryRoute = require('./routes/categories');
var assetsAssignment = require('./routes/assetsAssignment');

var db = require('./models/db_connect');
db(mongoose, 'andela-inventory');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/dashboard', assetsAssignment);
app.use('/dashboard', assetRoute);
app.use('/dashboard', categoryRoute);
app.use('/dashboard', userRoute);


app.listen(8000);