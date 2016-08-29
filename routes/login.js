var express = require('express');
var router = express.Router();
var passport = require('passport');



router.get('/', function (req, res) {
    return res.send("hello world")
});

router.get('/dashboard' , function (req, res) {
    return res.render('dashboard');
});

router.get('/login' ,  function (req, res) {

    return res.render('login',  { message : req.flash()});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    return res.send("hello world")
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    flash : true
}));

module.exports = router;
