var express = require('express');
var router = express.Router();
var user = require('../models/user');
var controller = require('../controllers/userController');
var userController  = new controller(user);



router.get('/users', function(req, res) {

    userController.getUser(req, res);

});

router.get('/users/:id', function (req, res) {

    userController.getUserById(req, res);

});


router.post('/users', function (req, res) {

    userController.postUser(req, res)

});

router.put('/users/:id/update', function (req, res) {

    userController.updateUser(req, res);
});


router.delete('/users/:id/delete', function (req, res) {

    userController.deleteUser(req, res)

});


module.exports = router;
