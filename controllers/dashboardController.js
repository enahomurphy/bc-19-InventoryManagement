
module.exports = function (user) {

    /*
    *
    *
    *
    *
    */
    this.getLoginDashboard = function (res, req) {
        var email = res.param.email;
        var password = res.param.password;

        user.findOne({ email : res.param.email}, function (err, user) {
            if(err) {
                return res.json({
                    error : 'user with that email not found'
                })
            }else{


            }
        })

    }




};