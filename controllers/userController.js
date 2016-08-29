module.exports = function (User) {


    /*
     *gets all users
     *
     * @params req : incoming request
     * @params res : response to user
     * @returns a json object off
     * all users
     */
    this.getUser = function (req, res) {

        var Query = User.find()
            .select('first_name last_name email pic phone assets role')
            .exec(function (err, users) {
            if(err)
                return res.status(400).json(err);
            else{
                 return  res.render('users/users', { data : users });
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

        req.checkBody('fname').isAlpha();
        var errors = req.validationErrors();
        if(errors){
            req.flash('error', req.flash())
        }

        var newUser = new User();
        newUser.first_name = req.body.fname;
        newUser.last_name = req.body.lname;
        newUser.email  = req.body.email;
        newUser.password = req.body.password;
        newUser.pic = req.body.pic;
        newUser.phone = req.body.phone;

        newUser.save(function (err) {
            if(err){
               if(err.code === 11000){
                   req.flash('error', 'email or phone number already exits');
                   return res.redirect('/dashboard/users/create')
               }else{
                   req.flash('error', 'please fill in all fields');
                   return res.redirect('/dashboard/users/create')
               }
            }else{

                req.flash('success', 'user created');
                return res.redirect('/dashboard/users/create')
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

        var id = req.params.id;

        User.findOne({ _id : id}, function (err, foundUser) {
            if(err){

                req.flash('error', 'unable to update user');
                res.redirect('/dashboard/users/'+id+'/edit')
            }
            if(!foundUser){
                req.flash('error', 'unable to update user');
                res.redirect('/dashboard/users/'+id+'/edit');
            }
            else{
                foundUser.first_name = req.body.fname  ? req.body.fname : foundUser.first_name;
                foundUser.last_name = req.body.lname ? req.body.lname : foundUser.last_name;
                foundUser.phone = req.body.phone ? req.body.phone : foundUser.phone;
                foundUser.pic = req.body.pic ? req.body.pic : foundUser.pic
                
                foundUser.save(function (err, updatedUser) {
                    if(err){

                        req.flash('error', 'unable to update user');
                        res.redirect('/dashboard/users/'+id+'/edit')
                    }
                    else{
                        req.flash('success', 'user updated');
                        res.redirect('/dashboard/users/'+id+'/edit')
                    }

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
        User.findOne({_id : id})
            .select('first_name last_name email pic phone assets role')
            .exec( function (err, users){
            if(err)
                return res.render('users/profile', {error : 'user not found'});
            if(!users)
                return res.render('users/profile', {error : 'user not found'});
            else
                console.log(users)
                return res.render('users/profile', {data : users});

        })

    };

    // this.filePaarser(file){
    //
    //
    // }

};