var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports ={



    isLoggedIn : function (req, res, next){

        //checks if user is authenticated
        if(req.isAuthenticated())
            return next();

        res.redirect('/login')
    },


    loginAuth : function () {
        //used to serialize the users session
        var message = {};
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        //used to deserializer users session
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user)
            })
        });

        passport.use('local-login', new LocalStrategy(
            {
                passReqToCallback : true,
                usernameField  : 'email',
                passwordField  : 'password'
            },
            function(req, username, password, done) {
                User.findOne({ email : username }, function(err, user) {
                    if (err) { console.log(err); return done(err); }
                    if (!user) {
                        console.log('user');
                        return done(null, false, req.flash(  'error', 'invalid email' ));
                    }
                    if (!user.comparePassword(password)) {
                        console.log('pass');
                        return done(null, false, req.flash('error', 'invalid email or password' ));
                    }
                    req.flash('success', 'login successful');
                    return done(null, user);
                });
            }
        ));
    }

};
