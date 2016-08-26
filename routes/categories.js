var express = require('express');
var router = express.Router();
var category = require('../models/category');
var controller = require('../controllers/categoryController');
var categoryController  = new controller(category);



router.get('/category', function(req, res) {

    categoryController.postCategory(req, res);

});

router.get('/category/:slug', function (req, res) {

    categoryController.getCategoryBySlug(req, res);
    // return res.send(req.query.token)
});

router.get('/category/:slug/assets', function (req, res) {

    assetController.getAssetsInCategory(req, res);
    // return res.send(req.query.token)
});


router.post('/category', function (req, res) {

    // console.log(category);
    categoryController.postCategory(req, res);

});

router.put('/category/:slug/update', function (req, res) {

    categoryController.updateAsset(req, res)
});


router.delete('/assets/:slug/delete', function (req, res) {

    assetController.deleteCategory(req, res)

});




module.exports = router;
