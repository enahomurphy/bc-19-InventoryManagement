
module.exports = function (user) {


    this.getNotificationByUser = function (req, res) {

        id = req.params.id;

        user.findOne({ _id : id}, function (err, foundUser) {
            if(err)
                return res.status(500).json({
                    message : "server error"
                });
            else {
                if (!foundUser)
                    return res.status(404).json({
                        message: "user not found"
                    });
                else
                    return res.json({
                        data : foundUser.assets.borrowed
                    })
            }
        });

    };

};