var express = require('express');
var router = express.Router();
var users = require('../models/user');
var auth = require('../middleware/auth');
var jwt = require('jsonwebtoken');
var secrete = "my_very_secrete_secrete";



router.post('/authenticate', function (req, res) {
    auth(req,res, users, jwt, secrete)
});


module.exports = router;



