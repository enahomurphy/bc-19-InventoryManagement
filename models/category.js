const moongoose = require('mongoose');

var schema = moongoose.Schema;

var categorySchema = new schema({

    title : {
        type : String,
        required : true,
        unique : true
    },
    description :String,

    slug :{
        type : String,
        unique : true
    },
    created_at :  Date,

    updated_at : Date


});
categorySchema.pre('save', function (next) {
    var currentDate = Date();
    var slug = this.title.replace(' ', '-');

    this.updated_at = currentDate;
    this.slug = slug;

    if(!this.created_at){
        this.created_at = currentDate;
    }
    next()
});

module.exports = moongoose.model("category", categorySchema);
module.exports.categorySchema = categorySchema;