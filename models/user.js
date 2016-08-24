const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var schema =  mongoose.Schema;

var userSchema = new schema({

    fisrt_name : String,
    last_name : String,
    email : {
        type: String,
        lowercase : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        enum : [1, 2, 3],
        required : true,
        default : 3
    },

    created_at : {
        type : Date,
        default :  Date().now

    },

    updated_at : {
        type : Date,
        set : function () {
            this.updated_at = Date().now;
            return this;
        }
    }

});


userSchema.pre('save', function (next) {
        var $this = this;

        bcrypt.hashSync(this.password, salt);
        next()
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};


module.exports = mongoose.model('users', userSchema);
module.exports.userSchema = userSchema;