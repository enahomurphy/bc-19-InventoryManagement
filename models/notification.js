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
notificationSchema.pre('save', function (next) {
    var currentDate = Date();
    this.date = currentDate;

    next()
});

module.exports = moongoose.model("notification", notificationSchema);
