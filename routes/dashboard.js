var express = require('express');
var router = express.Router();
var user = require('../models/user');
var controller = require('../controllers/dashboardController');




router.get('/dashboard', function(req, res, next) {

    res.send('welcome to my dashboard');

});


router.get('/dashboard/login', function(req, res, next) {

    res.send('welcome to my login page');

});
module.exports = router;
