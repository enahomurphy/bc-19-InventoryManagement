var express = require('express');
var router = express.Router();
var category = require('../models/category');
var controller = require('../controllers/categoryController');
var categoryController  = new controller(category);



router.get('/category', function(req, res) {

    categoryController.getCategory(req, res);

});

router.get('/category/create', function (req, res) {

    res.render('category/create', {message : req.flash()})
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


router.get('/category/:slug/delete', function (req, res) {

    categoryController.deleteCategory(req, res)

});




module.exports = router;
