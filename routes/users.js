var express = require('express');
var router = express.Router();
var User = require('../models/user');
var controller = require('../controllers/userController');
var userController  = new controller(User);



router.get('/me',  function (req, res) {

    return res.status(200).send(req.decoded);
});

router.get('/users', function(req, res) {

    userController.getUser(req, res);


    // return res.render('users/users', { users : user })

});


router.get('/users/create', function (req, res) {
    console.log(req.flash());
    return res.render('users/create', { message : req.flash()})

});




router.get('/users/:id', function (req, res) {

    userController.getUserById(req, res);

    // return res.send("djdjdj")
});

router.get('/users/:id/edit', function (req, res) {

    User.findById(req.params.id).select('first_name last_name phone email').exec(function (err, user) {
        if (err)
            res.redirect('/dashboard/users');
        else
            return res.render('users/edit', {data: user, message: req.flash()});
    })
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
