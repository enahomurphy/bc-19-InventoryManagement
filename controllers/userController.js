
module.exports = function (user) {

    this.user = user;


    /*
     *gets all users
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object off
     * all users
     */
    this.getUser = function (req, res) {

        var Query = user.find()
            .select('first_name last_name email pic phone, assets')
            .exec(function (err, users) {
            if(err)
                return res.status(400).json(err);
            else{
                 return  res.status(200).json({
                      success : true,
                      data  : users
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
    this.postUser = function (req, res) {

        var newUser = new user();
        newUser.first_name = req.body.fname;
        newUser.last_name = req.body.lname;
        newUser.email  = req.body.email;
        newUser.password = req.body.password;
        newUser.pic = req.body.pic;
        newUser.phone = req.body.phone;

        newUser.save(function (err) {
            if(err){
               if(err.code === 11000){
                   return res.json({
                       message : 'user with that email already exists'
                   })
               }else{
                   return  res.json({
                       message : 'error creating user, please fill in in require fields'
                   })
               }
            }else{
                return  res.status(201).json({
                    success : true,
                    message : 'user created'

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
    this.updateUser = function (req, res) {

        var id = req.params.id

        user.findOne({ _id : id}, function (err, foundUser) {
            if(err)
                return res.status(500).send();
            if(!foundUser)
                return res.status(404).send();
            else{
                foundUser.first_name = req.body.fname  ? req.body.fname : foundUser.first_name;
                foundUser.last_name = req.body.lname ? req.body.lname : foundUser.last_name;
                foundUser.phone = req.body.phone ? req.body.phone : foundUser.phone;
                foundUser.pic = req.body.pic ? req.body.pic : foundUser.pic
                
                foundUser.save(function (err, updatedUser) {
                    if(err)
                        return res.status(500).send();
                    else
                        return res.status(200).json(updatedUser)
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
    this.deleteUser = function (req, res, id) {

        user.remove({ _id : req.params.id}, function (err, dbuser) {
            if (err)
                return res.status(400).json(err);
            else {
                return res.status(201).json({
                    success: true,
                    message: 'user deleted'

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
    this.getUserById = function (req, res) {
        id = req.params.id;
        user.findOne({_id : id}, function (err, users) {
            if(err)
                return res.status(400).json(err);
            else
                return res.status(200).json({
                    data : users
                });
        })

    }

};