module.exports = function (assets, user) {


    this.getAssignments = function(req, res){

        var id = req.params.id;
        user.findOne( { _id : id}, function (err, foundUser) {
            if(err)
                return res.status(500).json({
                    message : 'server error'
                });
            else if(!foundUser)
                return res.status(404).json({
                    message : 'user not found'
                });
            else
                return res.status(200).json({
                    success : true,
                    date : foundUser.assets.borrowed
                })
        })
    };



    this.assignAssets = function (req, res) {
        var id = req.params.id;
        var asset_id = req.params.asset_id;
        console.log(asset_id);
        var options = {
            $addToSet: { "assets.borrowed" : asset_id}
        };
        var condition = { upsert : true};
        user.findOneAndUpdate( {_id : id }, options, condition, function (err, foundUser) {
            if (err)
                return res.status(500).json({
                    message: 'server error',
                    data : foundUser
                });
            else
                return res.status(200).json({
                    success: true,
                    data : foundUser

                })
        });
    };



    this.removeAssignAssets = function (req, res) {
        var id = req.params.id;
        var asset_id = req.params.asset_id;
        console.log(asset_id);
        var options = {
            $pullAll: { "assets.borrowed" : [asset_id]}
        };
        var condition = { upsert : true};
        user.findOneAndUpdate( {_id : id }, options, function (err, foundUser) {
            if (err)
                return res.status(500).json({
                    message: 'server error',
                    data : err
                });
            else
                return res.status(200).json({
                    success: true,
                    data : foundUser

                })
        });

        };



};