var express = require('express');
var router = express.Router();
var assets = require('../models/assets');
var Users = require('../models/user');
var controller = require('../controllers/assetsAssignment');
var assignAssetController  = new controller(assets, Users);


router.get('/users/assign', function () {
    var Query = Users.find().select('_id title');
    assets.find().select('_id title');
    Query.exec(function (err, data1) {

        assets.exec(function (err, data2) {
            conaole.log(data1, data2)
        });

    })
});

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



