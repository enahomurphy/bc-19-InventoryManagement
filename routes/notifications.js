var express = require('express');
var router = express.Router();
var category = require('../models/category');
var controller = require('../controllers/categoryController');
var categoryController  = new controller(category);



router.get('/users/:id/notification', function(req, res) {

    notificationRoute.getNotifications(req, res);

});



module.exports = router;
