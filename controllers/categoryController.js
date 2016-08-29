
module.exports = function (category) {

    /*
     *gets all categories
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object off
     * all categories
     */
    this.getCategory = function (req, res) {

        category.find(function (err, categories) {
            if(err){
                req.flash('error');
                redirect('/dashboard/category');
            }
            else{
                res.render('category/all', {data : categories, message:req.flash()})
            }
        });

    };


    /*
     * parses the header body for
     * form data and persists  data
     * into data base
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object base on
     * ths outcome the request
     */
    this.postCategory = function (req, res) {

        var newCategory = new category();
        newCategory.title = req.body.title;
        newCategory.description = req.body.description;

        newCategory.save(function (err, m) {
            if(err){
                if(err.code === 11000){
                    req.flash('error');
                    res.redirect('/dashboard/category/create');
                }else{
                    req.flash('error' , 'error creating category, please fill in in require fields ')
                    res.redirect('/dashboard/category/create')
                }
            }else{
                req.flash('success', 'category created');
                res.redirect('/dashboard/category/create')
            }
        })
    };



    /*
     * parses the header body for
     * form data and persists  data
     * into data base
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object base on
     * ths outcome the request
     */
    this.updateCategory = function (req, res) {

        var _slug = req.params.slug;

        category.findOne({ slug : _slug }, function (err, foundCategory) {
            if(err)
                return res.status(500).send("server error");
            if(!foundCategory)
                return res.status(404).send("category not found");
            else{
                foundCategory.title = req.body.title  ? req.body.title : foundCategory.title;
                foundCategory.description = req.body.description ? req.body.description : foundCategory.description;
                foundCategory.save(function (err, updatedCategory) {
                    if(err)
                        return res.status(500).send();
                    else
                        return res.status(200).json(updatedCategory)
                })
            }
        })

    };



    /*
     * gets user base on their id
     *
     * @params id : user id
     * @returns a json object
     * of the the user details
     */
    this.deleteCategory = function (req, res) {
            console.log(req.query.slug);
        category.findOne({ slug : req.params.slug}, function (err, adCategory) {
            if (err){

                req.flash('error', "unable to delete");
                res.redirect('/dashboard/category');
            }

            else {
                if(!adCategory){
                    req.flash('error', "category not found");
                    res.redirect('/dashboard/category');
                }
                else {
                    adCategory.remove(function (err) {
                        if(err)
                            return res.status(400).json(err);
                        else{
                            req.flash('success', "category deleted");
                            res.redirect('/dashboard/category');
                        }

                    })

                }

            }
        })
    };


    /*
     * gets user base on their id
     *
     * @params id : user id
     * @returns a json object
     * of the the user details
     */
    this.getCategoryBySlug = function (req, res) {

        category.findOne({ slug : req.params.slug}, function (err, categories) {
            if(err)
                return res.status(400).json(err);
            else
                return res.status(200).json({
                    data : categories
                });
        })

    };




    this.getAssetsInCategory = function (req, res) {

        var _slug = req.params.slug
        asset.find({ category : _slug }, function (err, assets) {
            if(err)
                return res.status(500).send("500 server error")
            else
                return res.json({
                    successful :  true,
                    data : assets
                })

        })

    }
};