// const jwt = require('jsonwebtoken');
// var router = new express().Router();
//
//
// router.use(function () {
//
//
//
//
//
//
// })

module.exports = function (req, res, User, jwt, secrete) {

    email = req.body.email;
    password = req.body.password;

    User.findOne({ email : email})
        .select('first_name last_name role password')
        .exec(function (err, user) {

        if(err)
            return res.status(500).json({
                success : false,
                message : 'Authentication failed an error occur',
                error : err
            });
        if(!user)
            return res.status(404).json({
                success : false,
                message : 'Authentication failed user not found'

            });
        else if(user){
            validPass = user.comparePassword(password);
            if(!validPass){
                return res.status(404).json({
                    success : false,
                    message : 'Authentication invalid password',
                    pass : password
                });
            }
            else{

                 var  token = jwt.sign({
                        email  : user.email,
                        name : user.fullName()
                        id : user._id

                    }, secrete, {
                     expiresIn : '24h'
                 });

                return res.status(200).json({
                    success : true,
                    message : 'enjoy you token',
                    token : token
                })
            }
        }
    })




};