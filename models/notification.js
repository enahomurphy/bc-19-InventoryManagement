const moongoose = require('mongoose');
const user = require('./user');
var schema = moongoose.Schema;

var notificationSchema = new schema({
    message : String,
    date : {
        type : Date,
        default : Date.now
    },
    read : {
        type : Boolean,
        default : false
    },
    user : user.userSchema

});


module.exports = moongoose.model("notification", notificationSchema);
