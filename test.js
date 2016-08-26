var user = require('./models/user');
var controller = require('./controllers/userController');
var userController  = new controller(user);
var mongoose = require('mongoose');
var db = require('./models/db_connect');
db(mongoose, 'andela-inventory');

user.findOne(function (err, users) {
    if(err)
         console.log(err);
    else{
         console.log(users.created_at.getFullYear());
    }
});