var express = require('express');
var router = express.Router();
var assets = require('../models/assets');
var category = require('../models/category');
var controller = require('../controllers/assetController');
var assetController  = new controller(assets);



router.get('/assets', function(req, res) {


    assetController.getAsset(req, res, category);

});

router.get('/assets/:id', function (req, res) {

    assetController.getAssetById(req, res);
    // return res.send(req.query.token)

});


router.post('/assets', function (req, res) {

    // console.log(category);
    assetController.postAsset(req, res, category);

});

router.put('/assets/:id/update', function (req, res) {

    assetController.updateAsset(req, res)
});


router.delete('/assets/:id/delete', function (req, res) {

    assetController.deleteAsset(req, res)

});


module.exports = router;
