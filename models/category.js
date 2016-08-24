const moongoose = require('mongoose');

var schema = moongoose.Schema;

var categorySchema = new schema({

    title : {
        type : String,
        required : true,
        unique : true
    },
    description :String,

    created_at : {
        type : Date,
        default : Date().now

    },

    updated_at : {
        type : Date,
        set : function () {
            this.updated_at = Date().now;
            return this
        }
    }

});

module.exports = moongoose.model("category", categorySchema);
module.exports.categorySchema = categorySchema;