var express = require('express');
var router = express.Router();
var assets = require('../models/assets');
var users = require('../models/user');
var controller = require('../controllers/assetsAssignment');
var assignAssetController  = new controller(assets, users);




router.get('/users/:id/assets/', function (req, res) {

    assignAssetController.getAssignments(req, res)
});



router.post('/users/:id/assets/:asset_id', function(req, res) {

    assignAssetController.assignAssets(req, res);

});

router.delete('/users/:id/assets/:asset_id', function (req, res) {

    assignAssetController.removeAssignAssets(req, res);
    // return res.send(req.query.token)(

});




module.exports = router;



