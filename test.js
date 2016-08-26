var user = require('./models/user');
var controller = require('./controllers/userController');
var userController  = new controller(user);
var mongoose = require('mongoose');
var db = require('./models/db_connect');
var bcrypt = require('bcryptjs');
db(mongoose, 'andela-inventory');
var jwt = require('jsonwebtoken');
// user.findOne(function (err, users) {
//     if(err)
//          console.log(err);
//     else{
//          console.log(users.comparePassword("federals"));
//     }
// });

var  token = jwt.sign({
    email  : "erwesfse",
    name : "dsdfsfsd"

}, "jbnjdakfgkdfjfaxg.djkfbgkdjbg.kjsabdfjgbdjsf", {
    expiresIn : '24h'
});

console.log(token);