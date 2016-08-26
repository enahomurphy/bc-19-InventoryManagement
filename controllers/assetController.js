
module.exports = function (asset) {

    this.asset = asset;


    /*
     *gets all users
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object off
     * all assets
     */
    this.getAsset = function (req, res) {

        asset.find(function (err, assets) {
            if(err)
                return res.status(400).json(err);
            else{
                return  res.status(200).json({
                    success : true,
                    data  : assets
                });
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
    this.postAsset = function (req, res, category) {

        var newAsset = new asset();
        newAsset.name = req.body.name;
        newAsset.description = req.body.description;
        newAsset.serial_no = req.body.serial_no;
        newAsset.price = req.body.price;
        newAsset.andela_serial_no = req.body.andela_serial;
        newAsset.category = this.getCategory(category, req.body.catId);
        newAsset.date_bought = req.body.date_bought;

        newAsset.save(function (err, createdAsset) {
            if(err){
                if(err.code === 11000){
                    return res.json({
                        error : "duplicate value",
                        message : "product with the inserted serial already exits"
                    })
                }else{
                    return  res.json({
                        message : 'error creating assets, please fill in in require fields'
                    })
                }
            }else{
                return  res.status(201).json({
                    success : true,
                    message : 'assets  created',
                    dat : createdAsset

                })
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
    this.updateAsset = function (req, res) {

        var id = req.params.id;

        asset.findOne({ _id : id}, function (err, foundAsset) {
            if(err)
                return res.status(500).send();
            if(!foundAsset)
                return res.status(404).send();
            else{
                foundAsset.name = req.body.fname  ? req.body.name : foundAsset.name;
                foundAsset.description = req.body.description ? req.body.description : foundAsset.description;
                foundAsset.serial_no = req.body.serial_no ? req.body.serial_no : foundAsset.serial_no;
                foundAsset.price = req.body.price ? req.body.price : foundAsset.price;
                foundAsset.andela_serial_no = req.body.andela_serai ? req.body.andela_serai : foundAsset.andela_serial_no;


                foundAsset.save(function (err, updatedAsset) {
                if(err)
                    return res.status(500).send();
                else
                    return res.status(200).json(updatedAsset)
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
    this.deleteAsset = function (req, res) {

        asset.findOne({ _id : req.params.id}, function (err, adAsset) {
            if (err)
                return res.status(400).json(err);
            else {
                if(!adAsset){
                    return res.status(404).json({message : "asset with tha id not found"})
                }
                else {
                    adAsset.remove(function (err) {
                        if(err)
                            return res.status(400).json(err);
                        else
                            return res.status(201).json({
                                success: true,
                                message: 'assets deleted',
                            })
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
    this.getAssetById = function (req, res, id) {

        asset.findOne({_id : req.params.id}, function (err, assets) {
            if(err)
                return res.status(400).json(err);
            else
                return res.status(200).json({
                    data : assets
                });
        })
    };


    this.getCategory = function (category, id){

        category.find({ _id : id }, function (err, foundCategory) {
            if(!foundCategory)
                return "Uncatalogued";
            else{
                return foundCategory;
            }
        })
    };
};