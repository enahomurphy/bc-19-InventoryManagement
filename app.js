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
var auth = require('./routes/auth');
var db = require('./models/db_connect');
var jwt = require('jsonwebtoken');
// instantiate the express middleware
var app = express();

// creates a new express route
var apiRouter = express.Router();

//connects to mongo db server
db(mongoose, 'andela-inventory');

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



app.use('/api', auth);

var secrete = "my_very_secrete_secrete";
/*
*
*
*
*
 */
app.use(function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){

        jwt.verify(token, secrete, function (err, decoded) {
            if(err)
                return res.status(403).json({
                    success : false,
                    message : 'failed to Authenticate token'
                });
            else{
                req.decoded = decoded;
                next();
            }
        })
    }else
        return res.status(403).json({
            success  : false,
            message : 'failed to Authenticate no token provided'
        });
});
app.use('/me', function (req, res) {
    return res.status(200).send(req.decoded)
})
app.use('/api', assetsAssignment);
app.use('/api', assetRoute);
app.use('/api', categoryRoute);
app.use('/api', userRoute);


app.listen(8000);