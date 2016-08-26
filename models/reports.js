const moongoose  = require('mongoose');
const user = require('./user');

var schema = moongoose.Schema;

var reportSchema = new schema({

    title : String,

    message : String,

    report : {
        type_of : {
            type : String,
            enum : ["lost", "laf"],
            default : "lost"
        },
        to : user.userSchema,

        from : user.userSchema
    },

    date : {
        type : Date,
        default : Date.now
    }

});
reportSchema.pre('save', function (next) {
    var currentDate = Date();
    this.date = currentDate;

    next()
});


module.exports = moongoose.model("reports", reportSchema);