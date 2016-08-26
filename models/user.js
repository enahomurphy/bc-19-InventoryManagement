const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const assets = require('./assets');
var salt = bcrypt.genSaltSync(10);

var schema =  mongoose.Schema;

var userSchema = new schema({

    first_name : String,
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

    phone : {
        type : Number,
        unique : true
    },
    role : {
        type : Number,
        enum : [1, 2, 3],
        required : true,
        default : 3
    },

    pic : String,

    assets :{
        borrowed :[{type:String, unique : true}],
        missing : []
    },

    created_at : {
        type : Date,
        default :  Date().now
    },

    updated_at : Date
});


userSchema.pre('save', function (next) {
    var $this = this;

    $this.password = bcrypt.hashSync(this.password, salt);

    var currentDate = Date();

    this.updated_at = currentDate;

    if(!$this.created_at){   $this.created_at = currentDate;

    }
    next()
});

userSchema.methods.comparePassword = function (password) {
    $this = this;
    return bcrypt.compareSync(password, $this.password)
};
userSchema.methods.getPass = function () {
    return this.password
};
userSchema.methods.fullName = function(){
    return this.first_name + " " + this.last_name;
};

userSchema.methods.testHash = function () {
    return bcrypt.hashSync(this.password, salt);
};
module.exports = mongoose.model('users', userSchema);
module.exports.userSchema = userSchema;